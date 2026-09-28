import {DurableObject} from 'cloudflare:workers';
import {createRoom,updateRoom,snapshot} from './room.js';
export class Room extends DurableObject {
 constructor(ctx,env){super(ctx,env);this.ctx=ctx;ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS room (id INTEGER PRIMARY KEY, data TEXT NOT NULL)');}
 async handle(id,event){const now=Date.now();let r=this.ctx.storage.sql.exec('SELECT data FROM room WHERE id=1').toArray()[0];r=r?JSON.parse(r.data):null;
 try{if(event.type==='create'){if(r)throw Error('Raum existiert bereits.');r=createRoom(id,event.name,now);}else {if(!r||r.expires<=now)throw Error('Raum nicht gefunden oder abgelaufen.');updateRoom(r,id,event,now);}
 if(r.closed){this.ctx.storage.sql.exec('DELETE FROM room');return {closed:true};}
 this.ctx.storage.sql.exec('INSERT OR REPLACE INTO room (id,data) VALUES (1,?)',JSON.stringify(r));if(event.type==='create')await this.ctx.storage.setAlarm(r.expires);return snapshot(r,id,now);
 }catch(e){return {error:e.message};}}
 async alarm(){await this.ctx.storage.deleteAll();}
}
const origins=new Set(['https://patrickfischerksa.github.io','http://127.0.0.1:5173','http://localhost:5173','http://127.0.0.1:4173']);
const random=()=>Array.from(crypto.getRandomValues(new Uint8Array(24)),b=>b.toString(16).padStart(2,'0')).join('');
async function hash(s){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))),b=>b.toString(16).padStart(2,'0')).join('');}
export default {async fetch(request,env){const origin=request.headers.get('Origin');const headers={'Content-Type':'application/json','Cache-Control':'no-store','Vary':'Origin'};if(origins.has(origin)){headers['Access-Control-Allow-Origin']=origin;headers['Access-Control-Allow-Headers']='Content-Type, Authorization';headers['Access-Control-Allow-Methods']='POST, GET, OPTIONS';}const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});
 if(origin&&!origins.has(origin))return json({error:'Origin nicht erlaubt.'},403);if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 const path=new URL(request.url).pathname;if(path==='/health')return json({ok:true});
 try{const match=path.match(/^\/rooms\/([A-F0-9]{12})\/(join|state|action)$/);const creating=path==='/rooms'&&request.method==='POST';if(!creating&&!match)return json({error:'Nicht gefunden.'},404);
 const joining=match?.[2]==='join';if((creating||joining)&&env.ROOM_LIMIT){const limited=await env.ROOM_LIMIT.limit({key:request.headers.get('CF-Connecting-IP')||'local'});if(!limited.success)return json({error:'Zu viele Raum-Anfragen. Bitte warte eine Minute.'},429);}
 let body={};if(request.method==='POST'){const reader=request.body?.getReader();let size=0,parts=[];if(reader){while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>18000){await reader.cancel();return json({error:'Anfrage zu gross.'},413);}parts.push(value);}}const bytes=new Uint8Array(size);let offset=0;for(const p of parts){bytes.set(p,offset);offset+=p.length;}body=JSON.parse(new TextDecoder().decode(bytes)||'{}');}
 if(!body||typeof body!=='object'||Array.isArray(body))return json({error:'Ungültige Anfrage.'},400);
 const code=creating?random().slice(0,12).toUpperCase():match[1];let token=creating||joining?random():request.headers.get('Authorization')?.replace(/^Bearer /,'');if(!token||!/^[a-f0-9]{48}$/.test(token))return json({error:'Zugang fehlt. Tritt dem Raum zuerst bei.'},401);
 let event;if(creating)event={type:'create',name:body.name};else if(joining&&request.method==='POST')event={type:'join',name:body.name};else if(match[2]==='state'&&request.method==='GET')event={type:'poll'};else if(match[2]==='action'&&request.method==='POST'&&!['create','join','poll'].includes(body.type))event=body;else return json({error:'Methode nicht erlaubt.'},405);
 const result=await env.ROOMS.getByName(code).handle(await hash(token),event);if(result.error)return json(result,409);return json({...result,code,...(creating||joining?{token}:{})});
 }catch{return json({error:'Anfrage konnte nicht verarbeitet werden. Bitte erneut versuchen.'},400);}
}};
