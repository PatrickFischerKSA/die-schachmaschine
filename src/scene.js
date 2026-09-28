import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {squarePosition} from './logic.js';
export function createScene(container,onSquare){
 const scene=new THREE.Scene(); scene.fog=new THREE.FogExp2(0x151713,.027);
 const camera=new THREE.PerspectiveCamera(37,1,.1,100); camera.position.set(10,12,14);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true}); renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.setClearColor(0x151713,0); container.append(renderer.domElement);
 const controls=new OrbitControls(camera,renderer.domElement); controls.enableDamping=true; controls.minDistance=10;controls.maxDistance=28;controls.maxPolarAngle=Math.PI*.47;controls.target.set(0,0,0);controls.enablePan=false;
 scene.add(new THREE.HemisphereLight(0xffeed2,0x18212a,2.2)); const key=new THREE.DirectionalLight(0xffdeab,3.3);key.position.set(-4,12,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-9;key.shadow.camera.right=9;key.shadow.camera.top=9;key.shadow.camera.bottom=-9;scene.add(key);
 const rim=new THREE.PointLight(0xc0cddd,35);rim.position.set(5,4,-6);scene.add(rim);
 const board=new THREE.Group();scene.add(board);const tiles=[],pieces=new THREE.Group(),under=new THREE.Group(),layers=new THREE.Group();scene.add(pieces,under,layers);
 const materials={light:new THREE.MeshStandardMaterial({color:0xb8a27d,roughness:.72}),dark:new THREE.MeshStandardMaterial({color:0x36362b,roughness:.67}),brass:new THREE.MeshStandardMaterial({color:0xa18248,metalness:.78,roughness:.3}),black:new THREE.MeshStandardMaterial({color:0x242721,metalness:.28,roughness:.4}),white:new THREE.MeshStandardMaterial({color:0xe7d7b7,roughness:.37})};
 function box(w,h,d,mat,x=0,y=0,z=0,parent=board){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
 const base=box(8.65,.65,8.65,materials.black,0,-.55);box(8.78,.07,8.78,materials.brass,0,-.2);
 for(let rank=1;rank<=8;rank++)for(let f=0;f<8;f++){const square=String.fromCharCode(97+f)+rank;const p=squarePosition(square);const t=box(.99,.16,.99,(rank+f)%2?materials.dark:materials.light,p.x,0,p.z);t.userData.square=square;tiles.push(t);}
 function label(text,size=1,color='#d7c4a2'){const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle=color;ctx.font='42px Georgia';ctx.textAlign='center';ctx.fillText(text,256,78);const texture=new THREE.CanvasTexture(c);const m=new THREE.SpriteMaterial({map:texture,transparent:true,depthTest:false});const s=new THREE.Sprite(m);s.scale.set(size,size/4,1);return s;}
 for(let i=0;i<8;i++){const a=label('abcdefgh'[i],.45);a.position.set(i-3.5,.12,4.3);board.add(a);const b=label(String(i+1),.45);b.position.set(-4.3,.12,3.5-i);board.add(b);}
 const ring=new THREE.Mesh(new THREE.RingGeometry(.32,.43,48),new THREE.MeshBasicMaterial({color:0xf0cb7c,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.y=.1;ring.visible=false;scene.add(ring);
 function clear(group){while(group.children.length){const child=group.children[0];group.remove(child);child.traverse(o=>{o.geometry?.dispose();if(o.material&&!Object.values(materials).includes(o.material)){o.material.map?.dispose();o.material.dispose();}});}}
 function piece(type,color,square,title){const g=new THREE.Group();const mat=color==='w'?materials.white:materials.black;
 const profile=[new THREE.Vector2(0,0),new THREE.Vector2(.27,0),new THREE.Vector2(.29,.08),new THREE.Vector2(.23,.15),new THREE.Vector2(.14,.2),new THREE.Vector2(.10,.43),new THREE.Vector2(.19,.48),new THREE.Vector2(.14,.54)];
 const body=new THREE.Mesh(new THREE.LatheGeometry(profile,28),mat);g.add(body);const head=new THREE.Mesh(type==='r'?new THREE.BoxGeometry(.34,.24,.34):type==='n'?new THREE.ConeGeometry(.2,.43,4):new THREE.SphereGeometry(type==='p'?.16:.2,20,16),mat);head.position.y=type==='n'?.72:.66;g.add(head);
 if(type==='k'){box(.09,.3,.09,mat,0,.97,0,g);box(.28,.08,.09,mat,0,1.02,0,g);}if(type==='q'){const crown=new THREE.Mesh(new THREE.TorusGeometry(.15,.035,8,20),materials.brass);crown.rotation.x=Math.PI/2;crown.position.y=.85;g.add(crown);}
 g.traverse(o=>{o.castShadow=true;o.userData.square=square;});const p=squarePosition(square);g.position.set(p.x,.09,p.z);g.userData.square=square;if(title){const t=label(title,1.5);t.position.y=1.25;g.add(t);}pieces.add(g);return g;}
 function setPieces(items){clear(pieces);for(const p of items)piece(p.type||'p',p.color||'w',p.square,p.label);}
 const props=new THREE.Group();scene.add(props);
 const automaton=new THREE.Group();props.add(automaton);automaton.position.set(0,0,-5.5);
 box(1.1,1.7,.7,materials.dark,0,.4,0,automaton);box(1.6,.2,1,materials.black,0,-.55,0,automaton);
 const face=new THREE.Mesh(new THREE.SphereGeometry(.37,24,20),materials.white);face.position.y=1.55;automaton.add(face);
 const turban=new THREE.Mesh(new THREE.SphereGeometry(.46,24,16),materials.brass);turban.scale.y=.62;turban.position.y=1.85;automaton.add(turban);
 for(const x of [-.72,.72]){box(.23,.23,1.5,materials.dark,x,.8,.55,automaton);box(.25,.14,.3,materials.white,x,.8,1.35,automaton);}
 const room=new THREE.Group();props.add(room);room.position.set(.5,.1,-3.5);box(1.6,2,1.5,materials.black,0,1,0,room);box(.9,.04,.04,materials.brass,0,.7,.76,room);room.visible=false;
 function setTheme(i){automaton.visible=i===0;room.visible=i===2||i===3;room.scale.setScalar(i===2?1:.7);const palettes=[[0xb8a27d,0x36362b],[0xae9280,0x4a282b],[0xb6c9bc,0x354644],[0x718899,0x192c39]];materials.light.color.setHex(palettes[i][0]);materials.dark.color.setHex(palettes[i][1]);}
 // Schematic cutaway: a hidden operator, gears and shafts beneath the board.
 for(let i=0;i<7;i++){const gear=new THREE.Mesh(new THREE.TorusGeometry(.38+(i%2)*.14,.09,8,16),materials.brass);gear.rotation.x=Math.PI/2;gear.position.set((i%4)*1.5-2.3,-1,(Math.floor(i/4))*2-1);under.add(gear);for(let j=0;j<12;j++)box(.13,.16,.13,materials.brass,gear.position.x+Math.cos(j*Math.PI/6)*.47,-1,gear.position.z+Math.sin(j*Math.PI/6)*.47,under);}
 box(.5,.6,.5,materials.black,0,-1.35,1,under);const head=new THREE.Mesh(new THREE.SphereGeometry(.23),materials.white);head.position.set(0,-.83,1);under.add(head);for(const x of [-.4,.4])box(.13,.13,.9,materials.brass,x,-1.1,.7,under);
 under.visible=false;let opened=false,era=0;
 function open(value,index=era){opened=value;era=index;under.visible=value&&index===0;}
 function showLayers(enabled){clear(layers);enabled.forEach((yes,i)=>{if(!yes)return;const mat=new THREE.MeshBasicMaterial({color:[0xc6a778,0xba6d78,0x9dc9b4,0x7bb7ec][i],transparent:true,opacity:.12,side:THREE.DoubleSide,depthWrite:false});const plane=new THREE.Mesh(new THREE.PlaneGeometry(8,8),mat);plane.rotation.x=-Math.PI/2;plane.position.y=.7+i*.8;layers.add(plane);const grid=new THREE.GridHelper(8,8,[0xc6a778,0xba6d78,0x9dc9b4,0x7bb7ec][i],0x637373);grid.position.y=plane.position.y;layers.add(grid);const text=label(['1770 · MECHANIK','1798 · FIGUR','1980 · ZEICHEN','2026 · TOKEN'][i],3);text.position.set(0,plane.position.y+.15,-4);layers.add(text);});}
 function mark(square){ring.visible=!!square;if(square){const p=squarePosition(square);ring.position.set(p.x,.13,p.z);}}
 const ray=new THREE.Raycaster();let down;
 renderer.domElement.addEventListener('pointerdown',e=>down={x:e.clientX,y:e.clientY});renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>6)return;const r=renderer.domElement.getBoundingClientRect();ray.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hits=ray.intersectObjects([...tiles,...pieces.children],true);const hit=hits.find(h=>h.object.userData.square);if(hit)onSquare(hit.object.userData.square);});
 const resize=new ResizeObserver(()=>{const {width,height}=container.getBoundingClientRect();camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);});resize.observe(container);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;renderer.setAnimationLoop(()=>{const factor=reduced?1:.08;tiles.forEach((t,i)=>{const lift=opened&&i>=32?2.6:0;t.position.y+=(lift-t.position.y)*factor;});base.position.y+=((opened?-1.8:-.55)-base.position.y)*factor;controls.update();renderer.render(scene,camera);});
 return {setPieces,setTheme,open,showLayers,mark,view(mode){camera.position.set(...(mode==='top'?[0,20,.01]:mode==='inside'?[0,2.5,13]:mode==='opponent'?[0,10,-16]:[10,12,14]));controls.target.set(0,0,0);controls.update();},dispose(){renderer.setAnimationLoop(null);resize.disconnect();controls.dispose();renderer.dispose();}};
}
