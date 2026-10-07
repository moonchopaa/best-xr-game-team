let cast,chapters,items,nodes,endings,defaultImage;
let ready=false;
let started=false;
let pastStates=[];
const failedArtwork=new Set(),warmedArtwork=new Set();
let state={node:'start',bag:[],log:[]};
const $=id=>document.getElementById(id);
function current(){if(state.node.startsWith('ending:'))return {...endings[state.node.slice(7)]};if(state.node==='ending'&&!state.bag.includes('boba')&&['tea','milk','maple'].every(item=>state.bag.includes(item))&&nodes.scene_9634fffd222c4e74958ef0732ebb5450?.end)return {...nodes.scene_9634fffd222c4e74958ef0732ebb5450};if(state.node==='ending')return {...endings[['boba','tea','milk'].every(item=>state.bag.includes(item))?(state.bag.includes('maple')?'classic':'maple'):'clear']};return {...nodes[state.node]};}
let itemNoticeTimer=null;
function clearItemNotice(){if(itemNoticeTimer!==null)clearTimeout(itemNoticeTimer);itemNoticeTimer=null;$('itemNotice').hidden=true;}
function showItemNotice(id){const item=items.find(item=>item[0]===id);if(!item)return;const label=document.createElement('span');label.className='item-notice-label';label.textContent='ITEM ACQUIRED';const name=document.createElement('strong');name.textContent=item[2];const detail=document.createElement('span');detail.textContent='Added to your bag';$('itemNotice').replaceChildren(label,name,detail);$('itemNotice').hidden=false;itemNoticeTimer=setTimeout(clearItemNotice,5000);}
function choose(index){
 if(!ready)throw new Error("The story is still loading.");
 const n=current(),choices=n.choices||[];
 if(!Number.isInteger(index)||index<0||index>=choices.length)throw new Error("That choice is not available on the current screen.");
 pastStates.push(structuredClone(state));
 const choice=choices[index];state.log.push({speaker:n.type==='image'?n.title:n.speaker,line:n.type==='image'?'':n.line,choice:choice.text,ch:n.ch});
 const acquired=choice.item&&!state.bag.includes(choice.item)?choice.item:null;
 clearItemNotice();if(acquired)state.bag.push(acquired);
 state.node=choice.next;
 render();if(acquired)showItemNotice(acquired);return snapshot();
}
function snapshot(){if(!ready)throw new Error("The story is still loading.");const n=current();return {node:state.node,canGoBack:pastStates.length>0,type:n.type||'dialogue',speaker:n.type==='image'?null:n.speaker,dialogue:n.type==='image'?'':n.line,narration:n.narration||'',ingredients:[...state.bag],ending:!!n.end,choices:(n.choices||[]).map((x,i)=>({index:i,text:x.text}))};}
function render(){$('previous').disabled=pastStates.length===0;const n=current(),person=cast[n.speaker]||cast.Yiwen;const imageOnly=n.type==='image';document.querySelector('.game').classList.toggle('image-only',imageOnly);document.querySelector('.world').setAttribute('aria-hidden',imageOnly?'false':'true');setArtwork(n);warmNextArtwork(n);setVoice(n);$('speaker').textContent=n.speaker;$('avatar').textContent=person.mark;$('role').textContent=person.role;$('location').textContent=n.loc;$('sceneTitle').textContent=n.title;$('chapterLabel').textContent=n.end?'THE END':n.ch===0?'PROLOGUE':'THE JOURNEY';$('sceneNumber').hidden=n.ch==null;$('sceneNumber').textContent=n.ch==null?'':`CH. 0${n.ch+1}`;$('narration').textContent=n.narration||'';$('imageNarration').textContent=imageOnly?n.narration||'':'';$('imageNarration').hidden=!imageOnly||!n.narration?.trim();writeLine(imageOnly?'':n.line);$('progressText').textContent=n.ch==null?'Unchaptered scene':`0${n.ch+1} / 06`;$('ingredientCount').textContent=state.bag.length+' / 4';$('recipeHint').textContent=state.bag.length?"Your own recipe, one ingredient at a time.":"A little adventure begins with an empty cup.";
 const visitedCh=new Set(state.log.map(entry=>entry.ch));$('chapters').replaceChildren(...chapters.map((text,i)=>{const li=document.createElement('li');li.className=i===n.ch?'active':visitedCh.has(i)?'done':'';if(i===n.ch)li.setAttribute('aria-current','step');const num=document.createElement('span');num.className='chapter-index';num.textContent=visitedCh.has(i)&&i!==n.ch?'✓':String(i+1);li.append(num,document.createTextNode(text));return li;}));
 $('ingredients').replaceChildren(...items.map(([key,icon,label])=>{const el=document.createElement('div');const have=state.bag.includes(key);el.className='ingredient'+(have?' have':'');el.setAttribute('aria-label',label+(have?" collected":" not collected"));const symbol=document.createElement('span');symbol.textContent=have?'✓':icon;symbol.setAttribute('aria-hidden','true');el.append(symbol,document.createTextNode(label));return el;}));
 document.querySelector('.game').classList.toggle('ending',!!n.end);$('choicePrompt').textContent=n.end?"Try different choices for another story.":'What will you say?';$('choiceKeys').textContent=n.end?'':'1 – '+n.choices.length;$('choices').replaceChildren();if(n.end){const b=document.createElement('button');b.className='choice';b.textContent="Begin a new cup’s story";b.onclick=reset;$('choices').append(b);}else{n.choices.forEach((choice,i)=>{const b=document.createElement('button');b.className='choice';const num=document.createElement('span');num.className='choice-num';num.textContent=String(i+1);num.setAttribute('aria-hidden','true');b.append(num,document.createTextNode(imageOnly?'Next':choice.text));b.onclick=()=>choose(i);$('choices').append(b);});}}
function previous(){if(!ready||!pastStates.length)return;clearItemNotice();state=pastStates.pop();render();return snapshot();}
$('previous').onclick=previous;
function reset(){clearItemNotice();pastStates=[];state={node:'start',bag:[],log:[]};render();}
function openModal(title){$('menuModal').close();$('journalModal').close();$('modalTitle').textContent=title;$('modalContent').replaceChildren();$('modal').showModal();}
$('closeModal').onclick=()=>$('modal').close();$('modal').addEventListener('click',e=>{if(e.target===$('modal')){const r=$('modal').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('modal').close();}});
$('characters').onclick=()=>{openModal("Friends you’ll meet along the way");Object.entries(cast).forEach(([name,person])=>{const div=document.createElement('div');div.className='person';const h=document.createElement('h3');h.textContent=name;const small=document.createElement('small');small.textContent=person.role;const p=document.createElement('p');p.textContent=person.bio;div.append(h,small,p);$('modalContent').append(div);});};
$('history').onclick=()=>{openModal("Your story so far");if(!state.log.length){const p=document.createElement('p');p.textContent="Make your first choice to begin your story here.";$('modalContent').append(p);}state.log.forEach(entry=>{const div=document.createElement('div');div.className='log';const speaker=document.createElement('b');speaker.textContent=entry.speaker;const line=document.createElement('p');line.textContent=entry.line;const answer=document.createElement('p');answer.className='response';answer.textContent="Your choice · "+entry.choice;div.append(speaker,line,answer);$('modalContent').append(div);});};
$('restart').onclick=()=>{openModal("Start your journey again?");const p=document.createElement('p');p.textContent="Your ingredients and conversation history will be reset.";const b=document.createElement('button');b.className='modal-action';b.textContent="Start over";b.onclick=()=>{reset();$('modal').close();};$('modalContent').append(p,b);};
document.addEventListener('keydown',e=>{if(!ready||!started||$('modal').open||$('menuModal').open||$('journalModal').open||e.repeat||e.ctrlKey||e.altKey||e.metaKey||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if((e.code==='Space'||e.key===' ')&&typing){e.preventDefault();finishLine();return;}const i=Number(e.key)-1;if(['1','2','3','4'].includes(e.key)&&current().choices?.[i]){e.preventDefault();choose(i);}});
if(document.modelContext?.registerTool){for(const tool of [{name:'read_dialogue_game',description:"Read the current dialogue, ingredients, choices, and ending status.",inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute:()=>snapshot()},{name:'choose_dialogue',description:"Choose a zero-based option from the current dialogue and advance the story.",inputSchema:{type:'object',properties:{index:{type:'integer',minimum:0,maximum:3}},required:['index'],additionalProperties:false},annotations:{readOnlyHint:false},execute:input=>{if(!input||Object.keys(input).some(k=>k!=='index'))throw new Error("Provide only an index.");return choose(input.index);}}]){try{Promise.resolve(document.modelContext.registerTool(tool)).catch(()=>{});}catch{}}}

async function loadStory(){
 ready=false;$('gameStage').hidden=true;$('coverScreen').hidden=started;$('loadingScreen').hidden=!started;
 $('loadingRetry').hidden=true;$('coverRetry').hidden=true;$('beginGame').hidden=false;
 $('loadingMessage').textContent='Opening your story…';$('coverStatus').textContent='Preparing your story…';
 try{
  const response=await fetch('/api/story',{cache:'no-store'});if(!response.ok)throw new Error('Could not load the saved story.');
  const {content}=await response.json();({cast,chapters,items,nodes,endings}=content);defaultImage=content.image;
  const art=$('sceneArt');setArtwork(current());
  let timeout;try{await Promise.race([art.decode(),new Promise((_,reject)=>{timeout=setTimeout(()=>reject(new Error('Image load timed out')),8000);})]);}catch{failedArtwork.add(artworkUrl(current().image||defaultImage));setArtwork(current());}finally{clearTimeout(timeout);}
  ready=true;render();$('coverStatus').textContent='';
  if(started){$('loadingScreen').hidden=true;$('gameStage').hidden=false;}
 }catch(error){
  ready=false;
  $('loadingMessage').textContent='The opening scene could not load. Please try again.';$('loadingRetry').hidden=false;
  $('coverStatus').textContent='The opening scene could not load.';$('coverRetry').hidden=false;$('beginGame').hidden=true;
 }
}
$('loadingRetry').onclick=loadStory;$('coverRetry').onclick=loadStory;

// Begin leaves the cover. The story is usually preloaded by now; if it is not,
// the loading screen takes over until loadStory() finishes.
function begin(){
 if(started)return;
 started=true;$('coverScreen').hidden=true;
 if(ready){$('loadingScreen').hidden=true;$('gameStage').hidden=false;}
 else $('loadingScreen').hidden=false;
}
$('beginGame').onclick=begin;
$('coverArt').addEventListener('error',()=>{const art=$('coverArt');if(art.getAttribute('src')!=='/place-cafe.jpg')art.src='/place-cafe.jpg';});

let typingFrame=null,typing=false,fullLine='';
function finishLine(){if(typingFrame!==null&&typeof clearTimeout==='function')clearTimeout(typingFrame);typingFrame=null;typing=false;$('line').textContent=fullLine;$('reveal').hidden=true;$('listenHint').hidden=false;}
function writeLine(text){fullLine=text;finishLine();$('spokenLine').textContent=text;if(typeof setTimeout!=='function'||typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;const letters=Array.from(text);const duration=Math.min(2200,letters.length*17);if(duration===0)return;typing=true;$('reveal').hidden=false;$('listenHint').hidden=true;const started=Date.now();const frame=()=>{const count=Math.min(letters.length,Math.max(1,Math.floor((Date.now()-started)/duration*letters.length)));$('line').textContent=letters.slice(0,count).join('');if(count<letters.length)typingFrame=setTimeout(frame,24);else finishLine();};frame();}
$('reveal').onclick=finishLine;$('story').addEventListener('click',()=>{if(typing)finishLine();});
$('menu').onclick=()=>{$('menuModal').showModal();};$('closeMenu').onclick=()=>$('menuModal').close();$('resume').onclick=()=>$('menuModal').close();
$('journal').onclick=()=>{$('journalModal').showModal();};$('closeJournal').onclick=()=>$('journalModal').close();
$('fullscreen').hidden=!document.fullscreenEnabled;
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{$('fullscreen').hidden=true;}};
document.addEventListener('fullscreenchange',()=>{$('fullscreen').setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen');});
for(const id of ['menuModal','journalModal'])$(id).addEventListener('click',event=>{if(event.target!==$(id))return;const r=$(id).getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)$(id).close();});
$('sceneArt').addEventListener('error',()=>{
 const art=$('sceneArt');
 failedArtwork.add(art.getAttribute('src'));
 if(art.getAttribute('src')!==artworkUrl('/scene.png')){
  art.src=artworkUrl('/scene.png');
  art.alt='Storybook background';
 }
});
loadStory();

// Scene voice. Autoplay is blocked until the player interacts, so the replay
// button stays available whenever the scene has a clip.
function setVoice(scene) {
 const player = $('sceneVoice'), clip = scene.voice || '';
 if (player.getAttribute('src') !== clip) {
  player.pause();
  if (clip) player.src = clip;
  else if (player.hasAttribute('src')) { player.removeAttribute('src'); player.load(); }
 }
 $('replayVoice').hidden = !clip;
 if (clip) playVoice();
}

function playVoice() {
 const player = $('sceneVoice');
 if (!player.getAttribute('src') || window.sipAudio?.voiceEnabled === false) return;
 try { player.currentTime = 0; } catch {}
 window.sipAudio?.duck(true);
 player.play().catch(() => window.sipAudio?.duck(false));
}

$('replayVoice').onclick = playVoice;
for (const event of ['ended', 'pause', 'error']) $('sceneVoice').addEventListener(event, () => window.sipAudio?.duck(false));
document.addEventListener('sip-voice', event => { if (event.detail.enabled) playVoice(); else $('sceneVoice').pause(); });

function artworkUrl(path){return path==='/scene.png'?path+'?art=storybook-ui-v2':path;}


function setArtwork(scene) {
 const art = $('sceneArt');
 const requested = artworkUrl(scene.image || defaultImage);
 const unavailable = failedArtwork.has(requested);
 const source = unavailable ? artworkUrl('/scene.png') : requested;
 if (art.getAttribute('src') !== source) art.src = source;
 art.alt = unavailable ? 'Storybook background' : scene.imageAlt || 'Illustration for ' + scene.title;
}

// Fetch only the immediate destinations while the player reads the current scene.
function warmNextArtwork(scene) {
 for (const choice of scene.choices || []) {
  const next = choice.next.startsWith('ending:') ? endings[choice.next.slice(7)] : nodes[choice.next];
  if (!next || choice.next === 'ending') continue;
  const source = artworkUrl(next.image || defaultImage);
  if (warmedArtwork.has(source) || failedArtwork.has(source)) continue;
  warmedArtwork.add(source);
  const image = new Image();
  image.decoding = 'async';
  image.fetchPriority = 'low';
  image.onerror = () => warmedArtwork.delete(source);
  image.src = source;
 }
}
// --- end of artwork helpers ---
