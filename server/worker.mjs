import defaults from './defaults.mjs';
import assets from './assets.mjs';
const encoder=new TextEncoder();
const cookieName='__Host-sip-editor';
const json=(body,status=200,headers={})=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const hex=b=>[...new Uint8Array(b)].map(n=>n.toString(16).padStart(2,'0')).join('');
async function digest(value){return hex(await crypto.subtle.digest('SHA-256',encoder.encode(value)));}
async function key(secret){return crypto.subtle.importKey('raw',encoder.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
async function signed(payload,secret){return hex(await crypto.subtle.sign('HMAC',await key(secret),encoder.encode(payload)));}
async function equal(a,b){const [aHash,bHash]=await Promise.all([digest(a),digest(b)]);let difference=0;for(let i=0;i<aHash.length;i++)difference|=aHash.charCodeAt(i)^bHash.charCodeAt(i);return difference===0;}
async function authenticated(request,env){if(!env.EDITOR_SESSION_SECRET)return false;const token=(request.headers.get('Cookie')||'').split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='))?.slice(cookieName.length+1);if(!token)return false;const [expiry,nonce,sig,...extra]=token.split('.');if(extra.length||!/^\d+$/.test(expiry)||!/^[-a-zA-Z0-9]+$/.test(nonce||'')||!/^[a-f0-9]{64}$/.test(sig||'')||Number(expiry)<Date.now()||Number(expiry)>Date.now()+43201000)return false;const bytes=new Uint8Array(sig.match(/../g).map(x=>parseInt(x,16)));return crypto.subtle.verify('HMAC',await key(env.EDITOR_SESSION_SECRET),bytes,encoder.encode(expiry+'.'+nonce));}
function imagePath(value){return typeof value==='string'&&((Object.hasOwn(assets,value)&&assets[value].type.startsWith('image/'))||/^\/media\/[a-f0-9-]{36}$/.test(value));}
function voicePath(value){return typeof value==='string'&&/^\/voice\/[a-f0-9-]{36}$/.test(value);}
function sceneOrder(content){const keys=[...Object.keys(content.nodes).filter(id=>id!=='ending').map(id=>'nodes:'+id),...Object.keys(content.endings).map(id=>'endings:'+id)];return [...new Set([...(Array.isArray(content.sceneOrder)?content.sceneOrder:[]),...keys])].filter(key=>keys.includes(key));}
// Compatibility for saved stories from the retired energy/recovery edition.
function migrateLegacyStory(content){content=structuredClone(content);delete content.nodes.recovery;for(const group of ['nodes','endings'])for(const scene of Object.values(content[group]))for(const choice of scene.choices||[])delete choice.energy;content.sceneOrder=sceneOrder(content);return content;}
function validateStory(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Invalid story.');
 if(!imagePath(input.image))throw new Error('Choose a valid uploaded image.');
 const result={cast:structuredClone(defaults.cast),chapters:[...defaults.chapters],items:structuredClone(defaults.items),image:input.image,sceneImages:structuredClone(defaults.sceneImages),nodes:{},endings:{}};
 const text=(value,max,required=false,label='Text')=>{if(typeof value!=='string'||value.length>max||(required&&!value.trim()))throw new Error(label+' is empty or too long.');return value;};
 const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
 if(!object(input.nodes)||!object(input.endings))throw new Error('The story needs scenes and endings.');
 input=migrateLegacyStory(input);
 const keys=Object.keys(input.nodes);if(keys.length<2||keys.length>120)throw new Error('Use between 2 and 120 scenes.');
 const idOK=id=>/^[A-Za-z][A-Za-z0-9_-]{0,79}$/.test(id)&&!['__proto__','prototype','constructor'].includes(id);
 function scene(edit,id,isEnding=false){
  if(!object(edit))throw new Error('Invalid scene: '+id);
  const label=edit.title||id;const imageOnly=edit.type==='image';if(imageOnly&&(isEnding||edit.end))throw new Error('This scene cannot use the image-only type.');
  const ch=edit.ch??null;if(ch!==null&&(!Number.isInteger(ch)||ch<0||ch>=result.chapters.length))throw new Error('Choose a chapter for '+label+'.');
  if(!imageOnly&&!Object.hasOwn(result.cast,edit.speaker))throw new Error('Choose a character for '+label+'.');
  const value={ch,speaker:imageOnly?'Yiwen':edit.speaker,title:text(edit.title,300,true,'Title for '+id),loc:text(edit.loc??'',300),narration:text(edit.narration??'',1500),line:text(edit.line??'',5000,!imageOnly,'Dialogue for '+label)};
  if(edit.image){if(!imagePath(edit.image))throw new Error('Invalid image in '+label+'.');value.image=edit.image;}
  if(edit.imageAlt)value.imageAlt=text(edit.imageAlt,300);
  if(edit.voice){if(!voicePath(edit.voice))throw new Error('Invalid voice clip in '+label+'.');value.voice=edit.voice;}
  if(imageOnly){value.type='image';if(!Array.isArray(edit.choices)||edit.choices.length!==1)throw new Error('Image scenes need one Next destination.');value.choices=[{text:'Next',next:text(edit.choices[0].next,100,true,'Next scene')}];return value;}
  if(isEnding||edit.end===true){value.end=true;return value;}
  if(!Array.isArray(edit.choices)||edit.choices.length<1||edit.choices.length>3)throw new Error(label+' needs 1–3 choices, or must be an ending.');
  value.choices=edit.choices.map((choice,i)=>{
   if(!object(choice))throw new Error('Invalid choice in '+label+'.');
   const clean={text:text(choice.text,500,true,'Choice '+(i+1)+' in '+label),next:text(choice.next,100,true,'Destination in '+label),feedback:text(choice.feedback??'',800)};
   if(choice.item){if(!result.items.some(x=>x[0]===choice.item))throw new Error('Invalid reward in '+label+'.');clean.item=choice.item;}
   return clean;
  });return value;
 }
 for(const id of keys){if(!idOK(id))throw new Error('Invalid scene identifier.');if(id==='ending'){result.nodes.ending=structuredClone(defaults.nodes.ending);continue;}result.nodes[id]=scene(input.nodes[id],id);}
 if(!Object.hasOwn(result.nodes,'start')||result.nodes.start.end)throw new Error('The homesick scene must remain the opening scene with at least one choice.');
 result.nodes.ending=structuredClone(defaults.nodes.ending);
 for(const id of Object.keys(defaults.endings))result.endings[id]=scene(input.endings[id],id,true);
 const validTarget=target=>(target!=='recovery'&&Object.hasOwn(result.nodes,target))||(target.startsWith('ending:')&&Object.hasOwn(result.endings,target.slice(7)));
 for(const node of Object.values(result.nodes))for(const choice of node.choices||[])if(!validTarget(choice.next))throw new Error('Choose an existing destination for “'+choice.text+'” in '+node.title+'.');
 const reachable=new Set(),pending=['start'];while(pending.length){const id=pending.pop();if(reachable.has(id))continue;reachable.add(id);for(const choice of result.nodes[id]?.choices||[])pending.push(choice.next);}
 const finishable=new Set([...reachable].filter(id=>id==='ending'||id.startsWith('ending:')||result.nodes[id]?.end));
 let changed=true;while(changed){changed=false;for(const id of reachable)if(!finishable.has(id)&&(result.nodes[id]?.choices||[]).some(c=>finishable.has(c.next))){finishable.add(id);changed=true;}}
 const trapped=[...reachable].find(id=>!finishable.has(id));if(trapped)throw new Error('“'+result.nodes[trapped].title+'” has no route to an ending. Connect a choice to an ending or another scene with an exit.');
 result.sceneOrder=sceneOrder({...result,sceneOrder:input.sceneOrder});
 return result;
}
async function readBody(request,limit){if(Number(request.headers.get('Content-Length'))>limit)throw new Error('Request is too large.');const reader=request.body?.getReader();if(!reader)return new Uint8Array();const chunks=[];let size=0;while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>limit){await reader.cancel();throw new Error('Request is too large.');}chunks.push(value);}const result=new Uint8Array(size);let offset=0;for(const part of chunks){result.set(part,offset);offset+=part.length;}return result;}
async function parseBody(request,limit){return JSON.parse(new TextDecoder().decode(await readBody(request,limit)));}
async function story(env){const saved=await env.DB.prepare('SELECT revision, content, updated_at FROM story WHERE id = 1').first();return saved?{revision:saved.revision,content:migrateLegacyStory(JSON.parse(saved.content)),updatedAt:saved.updated_at}:{revision:0,content:defaults,updatedAt:null};}
function mediaType(bytes){if(bytes.length<12)return null;if(bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71&&bytes[4]===13&&bytes[5]===10&&bytes[6]===26&&bytes[7]===10)return 'image/png';if(bytes[0]===255&&bytes[1]===216&&bytes[2]===255)return 'image/jpeg';if(new TextDecoder().decode(bytes.slice(0,4))==='RIFF'&&new TextDecoder().decode(bytes.slice(8,12))==='WEBP')return 'image/webp';return null;}
function audioType(bytes){if(bytes.length<12)return null;const ascii=(start,end)=>new TextDecoder().decode(bytes.slice(start,end));if(ascii(0,3)==='ID3'||(bytes[0]===255&&(bytes[1]&224)===224))return 'audio/mpeg';if(ascii(0,4)==='RIFF'&&ascii(8,12)==='WAVE')return 'audio/wav';if(ascii(4,8)==='ftyp')return 'audio/mp4';if(ascii(0,4)==='OggS')return 'audio/ogg';if(bytes[0]===26&&bytes[1]===69&&bytes[2]===223&&bytes[3]===163)return 'audio/webm';return null;}
async function handle(request,env){const url=new URL(request.url),path=url.pathname;
if(path.startsWith('/api/')&&!['GET','HEAD'].includes(request.method)){if(request.headers.get('Origin')!==url.origin||request.headers.get('X-Editor-Request')!=='1')return json({error:'This request must come from the editor.'},403);}
if(path==='/api/story'&&request.method==='GET')return json(await story(env));
if(path==='/api/story/original'&&request.method==='GET')return json({content:defaults});
if(path==='/api/editor/session'&&request.method==='GET')return json({authenticated:await authenticated(request,env)});
if(path==='/api/editor/login'&&request.method==='POST'){
 if(!env.EDITOR_PASSWORD||!env.EDITOR_SESSION_SECRET)return json({error:'The editor is not configured yet.'},503);
 const ip=request.headers.get('CF-Connecting-IP')||'unknown';const ipKey=await digest(ip+env.EDITOR_SESSION_SECRET);const window=Math.floor(Date.now()/900000);const attempts=await env.DB.prepare('INSERT INTO login_attempts (key, attempts, window) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET attempts = CASE WHEN window = excluded.window THEN attempts + 1 ELSE 1 END, window = excluded.window RETURNING attempts').bind(ipKey,window).first();if(attempts.attempts>10)return json({error:'Too many attempts. Please try again in 15 minutes.'},429);
 let data;try{data=await parseBody(request,2048);}catch{return json({error:'Enter a valid password.'},400);}if(typeof data.password!=='string'||!await equal(data.password,env.EDITOR_PASSWORD))return json({error:'That password is not correct.'},401);
 const payload=(Date.now()+43200000)+'.'+crypto.randomUUID();const token=payload+'.'+await signed(payload,env.EDITOR_SESSION_SECRET);return json({ok:true},200,{'Set-Cookie':`${cookieName}=${token}; Path=/; Max-Age=43200; HttpOnly; Secure; SameSite=Strict`});
}
if(path==='/api/editor/logout'&&request.method==='POST')return json({ok:true},200,{'Set-Cookie':`${cookieName}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`});
if(path.startsWith('/api/editor/')){
 if(!await authenticated(request,env))return json({error:'Unlock the editor to continue.'},401);
 if(path==='/api/editor/story'&&request.method==='PUT'){
  let data,content;try{data=await parseBody(request,900000);if(!Number.isInteger(data.revision)||data.revision<0)throw new Error('Invalid revision.');content=validateStory(data.content);}catch(e){return json({error:e.message||'Invalid story.'},400);}
  const updatedAt=new Date().toISOString();const saved=await env.DB.prepare('INSERT INTO story (id, revision, content, updated_at) SELECT 1, 1, ?, ? WHERE ? = 0 ON CONFLICT(id) DO NOTHING RETURNING revision').bind(JSON.stringify(content),updatedAt,data.revision).first();let result=saved;if(!result&&data.revision>0)result=await env.DB.prepare('UPDATE story SET revision = revision + 1, content = ?, updated_at = ? WHERE id = 1 AND revision = ? RETURNING revision').bind(JSON.stringify(content),updatedAt,data.revision).first();if(!result)return json({error:'Someone else saved changes. Your draft is still here. Reload the latest version before saving again.',conflict:true},409);return json({revision:result.revision,updatedAt});
 }
 if(path==='/api/editor/upload'&&request.method==='POST'){
  let bytes;try{bytes=await readBody(request,10*1024*1024);}catch{return json({error:'Choose a file smaller than 10 MB.'},413);}const image=mediaType(bytes),sound=image?null:audioType(bytes);if(!image&&!sound)return json({error:'Choose a PNG, JPEG, or WebP image, or an MP3, WAV, M4A, OGG, or WebM voice clip.'},415);if(image&&bytes.length>5*1024*1024)return json({error:'Choose an image smaller than 5 MB.'},413);const id=crypto.randomUUID();await env.BUCKET.put((image?'images/':'audio/')+id,bytes,{httpMetadata:{contentType:image||sound}});return json({url:(image?'/media/':'/voice/')+id,kind:image?'image':'voice'});
 }
 return json({error:'Not found.'},404);
}
if(path.startsWith('/voice/')&&request.method==='GET'){
 if(!voicePath(path))return new Response('Not found',{status:404});const clip=await env.BUCKET.get('audio/'+path.slice(7));if(!clip)return new Response('Not found',{status:404});return new Response(clip.body,{headers:{'Content-Type':clip.httpMetadata?.contentType||'audio/mpeg','Cache-Control':'public, max-age=31536000, immutable','X-Content-Type-Options':'nosniff'}});
}
if(path.startsWith('/media/')&&request.method==='GET'){
 if(!imagePath(path))return new Response('Not found',{status:404});const image=await env.BUCKET.get('images/'+path.slice(7));if(!image){const original=await fetch('https://a-sip-of-home-story.mchopaa.chatgpt.site'+path);return new Response(original.body,{status:original.status,headers:{'Content-Type':original.headers.get('Content-Type')||'image/png','Cache-Control':'public, max-age=86400'}});}return new Response(image.body,{headers:{'Content-Type':image.httpMetadata?.contentType||'application/octet-stream','Cache-Control':'public, max-age=31536000, immutable','X-Content-Type-Options':'nosniff'}});
}
if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});const asset=assets[path==='/'?'/index.html':path==='/edit'||path==='/edit/'?'/editor.html':path];if(!asset)return new Response('Not found',{status:404});const body=asset.base64?Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)):asset.body;return new Response(request.method==='HEAD'?null:body,{headers:{'Content-Type':asset.type,'Cache-Control':path==='/scene.png'?'public, max-age=86400':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','X-Frame-Options':'SAMEORIGIN'}});
}
export default {async fetch(request,env){try{return await handle(request,env);}catch(error){console.error('Site request failed',error?.message);return json({error:'The service is temporarily unavailable. Your draft has not been discarded. Please try again.'},503);}}};
export {validateStory,mediaType,audioType};
