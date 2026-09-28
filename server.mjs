import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist');
const live=Boolean(process.env.LLM_API_URL&&process.env.LLM_API_KEY&&process.env.LLM_MODEL);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png'};
const json=(res,code,value)=>{res.writeHead(code,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
let pending=0;
http.createServer(async(req,res)=>{try{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/api/status')return json(res,200,{live});
 if(url.pathname==='/api/chat'){
  if(req.method!=='POST')return json(res,405,{error:'POST required'});
  if(req.headers.origin&&!['http://127.0.0.1:5173','http://localhost:5173',`http://127.0.0.1:${process.env.PORT||8787}`,`http://localhost:${process.env.PORT||8787}`].includes(req.headers.origin))return json(res,403,{error:'Origin not allowed'});
  if(!live)return json(res,503,{error:'Model is not configured'});
  if(pending>=3)return json(res,429,{error:'Please retry later'});
  let body='';for await(const chunk of req){body+=chunk;if(body.length>8192)return json(res,413,{error:'Request too large'});}
  let input;try{input=JSON.parse(body);}catch{return json(res,400,{error:'Invalid JSON'});}
  if(typeof input.prompt!=='string'||!input.prompt.trim()||input.prompt.length>1000)return json(res,400,{error:'Invalid prompt'});
  pending++;
  try{const upstream=await fetch(process.env.LLM_API_URL,{method:'POST',headers:{Authorization:`Bearer ${process.env.LLM_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:process.env.LLM_MODEL,messages:[{role:'system',content:'Du bist Teil einer deutschsprachigen Kunstinstallation über Mensch, Maschine und Verstehen. Antworte in höchstens 100 Wörtern. Behaupte weder Bewusstsein noch dessen abschliessende Widerlegung. Kennzeichne Unsicherheit.'},{role:'user',content:input.prompt}],max_tokens:300}),signal:AbortSignal.timeout(30000)});if(!upstream.ok)return json(res,502,{error:'Model service unavailable'});const data=await upstream.json();const text=data.choices?.[0]?.message?.content;if(typeof text!=='string')return json(res,502,{error:'Unexpected model response'});return json(res,200,{text});}finally{pending--;}
 }
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end();}
 const file=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 try{const data=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:data);}catch{res.writeHead(404);res.end('Not found');}
 }catch{if(!res.headersSent)json(res,500,{error:'Request failed'});else res.end();}
}).listen(Number(process.env.PORT)||8787,'127.0.0.1',()=>console.log('Die Schachmaschine: http://127.0.0.1:'+(process.env.PORT||8787)));
