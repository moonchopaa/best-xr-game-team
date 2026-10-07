'use strict';
const $=id=>document.getElementById(id);let story=null,revision=0,dirty=false,busy=false,selection='nodes:start',entries=[];
async function api(path,options={}){const response=await fetch(path,{...options,cache:'no-store',headers:{'X-Editor-Request':'1',...options.headers}});let data;try{data=await response.json();}catch{throw new Error('The server could not be reached. Your draft is still here.');}if(!response.ok){const error=new Error(data.error||'The request failed.');error.status=response.status;error.conflict=data.conflict;throw error;}return data;}
function notice(message,error=false){$('notice').textContent=message;$('notice').className=error?'error':'';}
function markDirty(){dirty=true;$('saveState').textContent='Unsaved changes';$('save').disabled=busy;}
function setBusy(value){busy=value;$('save').disabled=value||!dirty;$('reload').disabled=value;$('sceneFile').disabled=value;$('voiceFile').disabled=value;$('importFile').disabled=value;$('exportStory').disabled=value;$('resetStory').disabled=value;$('lock').disabled=value;for(const el of $('sceneForm').elements)el.disabled=value;$('sceneSelect').disabled=value;for(const button of $('sceneButtons').querySelectorAll('button'))button.disabled=value;$('addScene').disabled=value;$('moveSceneUp').disabled=value;$('moveSceneDown').disabled=value;if(!value&&story)updateControls();}
function selected(){const [group,id]=selection.split(':');return story[group][id];}
function reachableScenes(){const seen=new Set(),queue=['start'];while(queue.length){const id=queue.pop();if(seen.has(id))continue;seen.add(id);if(id==='ending'&&story.nodes.scene_9634fffd222c4e74958ef0732ebb5450?.end)queue.push('scene_9634fffd222c4e74958ef0732ebb5450');for(const choice of story.nodes[id]?.choices||[])queue.push(choice.next);}return seen;}
function destinationName(id){if(id==='ending')return 'Recipe ending (based on ingredients)';if(id.startsWith('ending:'))return story.endings[id.slice(7)]?.title||'Missing ending';return story.nodes[id]?.title||'Choose a destination';}
function incoming(id){return Object.entries(story.nodes).filter(([key])=>key!==id).flatMap(([key,node])=>(node.choices||[]).filter(choice=>choice.next===id).map(()=>node.title||key));}
function chapterInfo(scene){return scene.ch==null?'No chapter':'Chapter '+(scene.ch+1)+' · '+story.chapters[scene.ch];}
function buildEntries(){
 const reachable=reachableScenes();
 const all=Object.entries(story.nodes).filter(([id])=>id!=='ending').map(([id,n])=>({key:'nodes:'+id,label:n.title||'Untitled scene',chapter:chapterInfo(n),unconnected:!reachable.has(id)}));
 for(const [id,n]of Object.entries(story.endings))all.push({key:'endings:'+id,label:n.title,chapter:chapterInfo(n)+' · Ending'});
 const byKey=new Map(all.map(e=>[e.key,e]));const order=[...new Set([...(story.sceneOrder||[]),...byKey.keys()])].filter(key=>byKey.has(key));story.sceneOrder=order;entries=order.map(key=>byKey.get(key));
 $('sceneSelect').replaceChildren();$('sceneButtons').replaceChildren();
 const term=$('sceneSearch').value.trim().toLowerCase();
 const matches=entry=>{if(!term)return true;const [group,id]=entry.key.split(':');const scene=story[group][id];return [entry.label,entry.chapter,scene.line,scene.narration,scene.loc,scene.speaker].some(value=>typeof value==='string'&&value.toLowerCase().includes(term));};
 let shown=0;
 for(const entry of entries){const option=document.createElement('option');option.value=entry.key;option.textContent=entry.chapter+' — '+entry.label;$('sceneSelect').append(option);if(!matches(entry))continue;shown++;const button=document.createElement('button');button.className='scene-button'+(entry.unconnected?' unconnected':'')+(entry.key===selection?' selected':'');button.dataset.key=entry.key;const chapter=document.createElement('small');chapter.className='scene-chapter';chapter.textContent=entry.chapter;const title=document.createElement('span');title.textContent=entry.label;button.append(chapter,title);button.onclick=()=>select(entry.key);$('sceneButtons').append(button);}
 $('sceneCount').textContent=term?shown+' of '+entries.length+' scenes match “'+term+'”':entries.length+' scenes';
 $('sceneSelect').value=selection;
}
function moveScene(offset){if(busy||!story)return;const index=story.sceneOrder.indexOf(selection),target=index+offset;if(index<0||target<0||target>=story.sceneOrder.length)return;[story.sceneOrder[index],story.sceneOrder[target]]=[story.sceneOrder[target],story.sceneOrder[index]];markDirty();buildEntries();renderChoices();preview();updateControls();const button=[...$('sceneButtons').children].find(b=>b.dataset.key===selection);button?.scrollIntoView({block:'nearest'});notice('Scene order updated. Save changes to keep this order.');}
$('moveSceneUp').onclick=()=>moveScene(-1);$('moveSceneDown').onclick=()=>moveScene(1);
function fillOptions(select,options,value){select.replaceChildren(...options.map(([id,label])=>{const option=document.createElement('option');option.value=id;option.textContent=label;return option;}));select.value=value;}
function orderedSceneKeys(){const keys=[...Object.keys(story.nodes).filter(id=>id!=='ending').map(id=>'nodes:'+id),...Object.keys(story.endings).map(id=>'endings:'+id)];const valid=new Set(keys);return [...new Set([...(story.sceneOrder||[]),...keys])].filter(key=>valid.has(key));}
function sceneTarget(key){const [group,id]=key.split(':');return group==='endings'?'ending:'+id:id;}
function nextOrderedTarget(key=selection){const order=orderedSceneKeys(),index=order.indexOf(key);return index>=0&&index+1<order.length?sceneTarget(order[index+1]):'ending';}
function targetOptions(){return [...orderedSceneKeys().map(key=>{const [group,id]=key.split(':');return [sceneTarget(key),story[group][id].title||'Untitled scene'];}),['ending','Recipe ending (based on ingredients)']];}

function updateControls() {
 if (!story) return;
 const position = entries.findIndex(entry => entry.key === selection);
 const scene = selected(), [group, id] = selection.split(':');
 const isEnding = group === 'endings' || !!scene.end;
 const imageOnly = scene.type === 'image';
 const refs = group === 'nodes' ? incoming(id) : [];
 $('moveSceneUp').disabled = busy || position <= 0;
 $('moveSceneDown').disabled = busy || position < 0 || position === entries.length - 1;
 $('sceneType').disabled = busy || group === 'endings';
 $('sceneType').querySelector('[value=ending]').disabled = id === 'start';
 $('sceneSpeaker').parentElement.hidden = imageOnly;
 $('dialogueFields').hidden = imageOnly;
 $('line').required = !imageOnly;
 $('addChoice').hidden = isEnding || imageOnly;
 $('choiceLimit').hidden = isEnding || imageOnly;
 $('addChoice').disabled = busy || (scene.choices?.length || 0) >= 3;
 $('deleteScene').disabled = busy || group === 'endings' || id === 'start' || refs.length > 0;
 $('deleteHelp').textContent = group === 'endings'
  ? 'Recipe endings can be edited, but not deleted.'
  : id === 'start' ? 'The homesick scene is the opening scene.'
  : refs.length ? 'Disconnect incoming choices before deleting this scene.'
  : 'Only this scene will be deleted. Uploaded images are kept.';
 $('addScene').disabled = busy || Object.keys(story.nodes).length >= 120;
 $('removeVoice').disabled = busy || !scene.voice;
 $('duplicateScene').disabled = busy || group === 'endings' || Object.keys(story.nodes).length >= 120;
 const reachable = reachableScenes();
 $('connectionInfo').textContent = id === 'scene_9634fffd222c4e74958ef0732ebb5450'
  ? 'Recipe ending · Tea, Milk, and Maple collected, without Boba.'
  : group === 'endings' ? 'This ending can be reached directly, or selected by the recipe ending.'
  : id === 'start' ? 'Starting scene · Every new game begins here.'
  : !reachable.has(id) ? 'Not reachable from the opening scene. Connect a choice from a reachable scene to this one.'
  : refs.length ? 'Reached from: ' + [...new Set(refs)].join(', ')
  : 'This scene is reachable from the opening scene.';
}
function renderChoices(){const scene=selected();$('choiceFields').replaceChildren();if(scene.type==='image'){const label=document.createElement('label');label.htmlFor='imageNext';label.textContent='Next scene';const target=document.createElement('select');target.id='imageNext';fillOptions(target,targetOptions(),scene.choices[0].next);target.onchange=()=>{scene.choices[0].next=target.value;markDirty();buildEntries();preview();};const help=document.createElement('p');help.className='help';help.textContent='Shows the image, optional narration, and Next button. Character dialogue is hidden.';$('choiceFields').append(label,target,help);updateControls();return;}if(scene.end||selection.startsWith('endings:')){const p=document.createElement('p');p.className='help';p.textContent='This scene ends the journey. Players can start again afterwards.';$('choiceFields').append(p);updateControls();return;}const title=document.createElement('h3');title.textContent='Choices & destinations';$('choiceFields').append(title);(scene.choices||[]).forEach((choice,i)=>{const block=document.createElement('div');block.className='choice-field';const tools=document.createElement('div');tools.className='choice-tools';const h=document.createElement('h4');h.textContent='Choice '+(i+1);const remove=document.createElement('button');remove.type='button';remove.className='secondary';remove.textContent='Remove';remove.disabled=scene.choices.length<=1;remove.onclick=()=>{scene.choices.splice(i,1);markDirty();renderChoices();buildEntries();preview();};tools.append(h,remove);block.append(tools);
for(const [field,label,max]of [['text','What the player can say or do',500],['feedback','Response after choosing (optional)',800]]){const id='choice-'+i+'-'+field;const l=document.createElement('label');l.htmlFor=id;l.textContent=label;const input=document.createElement('textarea');input.id=id;input.rows=2;input.maxLength=max;input.value=choice[field]||'';input.required=field==='text';input.oninput=()=>{choice[field]=input.value;markDirty();preview();};block.append(l,input);}
const label=document.createElement('label');label.htmlFor='choice-'+i+'-next';label.textContent='Go to scene';const target=document.createElement('select');target.id=label.htmlFor;fillOptions(target,targetOptions(),choice.next);target.onchange=()=>{choice.next=target.value;markDirty();buildEntries();updateControls();preview();};block.append(label,target);
const effects=document.createElement('div');effects.className='choice-effects';const rewardWrap=document.createElement('div'),rewardLabel=document.createElement('label'),reward=document.createElement('select');rewardLabel.textContent='Ingredient reward';rewardLabel.htmlFor='choice-'+i+'-item';reward.id=rewardLabel.htmlFor;fillOptions(reward,[['','None'],...story.items.map(([key,,name])=>[key,name])],choice.item||'');reward.onchange=()=>{if(reward.value)choice.item=reward.value;else delete choice.item;markDirty();};rewardWrap.append(rewardLabel,reward);effects.append(rewardWrap);block.append(effects);$('choiceFields').append(block);});updateControls();}
function select(key){if(busy)return;selection=key;const scene=selected();$('sceneSelect').value=key;for(const b of $('sceneButtons').children)b.classList.toggle('selected',b.dataset.key===key);$('sceneTag').textContent=key.startsWith('endings:')||scene.end?'ENDING':scene.ch==null?'SCENE':'CHAPTER '+(scene.ch+1);$('editingTitle').textContent=scene.title;$('speakerLabel').textContent=scene.speaker;fillOptions($('sceneSpeaker'),Object.keys(story.cast).map(name=>[name,name]),scene.speaker);fillOptions($('sceneChapter'),[['','No chapter'],...story.chapters.map((name,i)=>[String(i),name])],scene.ch==null?'':String(scene.ch));$('sceneType').value=scene.end||key.startsWith('endings:')?'ending':scene.type==='image'?'image':'scene';for(const field of ['title','loc','narration','line','imageAlt'])$(field).value=scene[field]||'';renderChoices();renderVoice();preview();}
function preview(){const scene=selected();for(const id of ['previewTitle','previewLocation','previewSpeaker','previewLine'])$(id).hidden=scene.type==='image';$('previewImage').src=artworkUrl(scene.image||story.image);$('previewImage').alt=scene.imageAlt||'Scene artwork preview';$('previewTitle').textContent=scene.title;$('previewLocation').textContent=scene.loc;$('previewSpeaker').textContent=scene.speaker;$('previewNarration').textContent=scene.narration||'';$('previewLine').textContent=scene.line;$('previewChoices').replaceChildren(...(scene.choices||[]).map((choice,i)=>{const button=document.createElement('button');button.type='button';button.className='preview-choice';button.append(document.createTextNode((i+1)+'. '+choice.text));const next=document.createElement('small');next.textContent='Next: '+destinationName(choice.next);button.append(next);button.onclick=()=>{if(choice.next==='ending'){notice('The recipe ending depends on the ingredients collected during play. Edit its three outcomes in the scene list.');return;}select(choice.next.startsWith('ending:')?'endings:'+choice.next.slice(7):'nodes:'+choice.next);};return button;}));}
async function load(){setBusy(true);try{const data=await api('/api/story');story=data.content;{const [group,id]=selection.split(':');if(!story[group]?.[id])selection='nodes:start';}revision=data.revision;dirty=false;buildEntries();$('saveState').textContent=data.updatedAt?'Last saved '+new Date(data.updatedAt).toLocaleString():'Original story · No edits saved yet';setBusy(false);select(entries.some(x=>x.key===selection)?selection:'nodes:start');notice('Edits become visible to everyone after you save.');}catch(error){notice(error.message,true);}finally{setBusy(false);}}
async function showWorkspace(){ $('loginPanel').hidden=true;$('workspace').hidden=false;$('lock').hidden=false;await load();}
$('loginForm').onsubmit=async event=>{event.preventDefault();$('unlock').disabled=true;$('loginStatus').textContent='Unlocking…';try{await api('/api/editor/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:$('password').value})});$('password').value='';if(story){$('loginPanel').hidden=true;$('workspace').hidden=false;$('lock').hidden=false;notice('Editor unlocked. Your unsaved draft is still here.');}else await showWorkspace();}catch(error){$('loginStatus').textContent=error.message;}finally{$('unlock').disabled=false;}};
$('sceneSelect').onchange=e=>select(e.target.value);$('sceneForm').onsubmit=e=>e.preventDefault();for(const field of ['title','loc','narration','line','imageAlt'])$(field).oninput=()=>{selected()[field]=$(field).value;markDirty();preview();if(field==='title'){$('editingTitle').textContent=$(field).value;buildEntries();}};
function expired(){ $('workspace').hidden=true;$('loginPanel').hidden=false;$('lock').hidden=true;$('loginStatus').textContent='Your editing session expired. Enter the password to continue. Your draft is still here.';}
$('save').onclick=async()=>{if(!story||busy)return;if(!$('sceneForm').reportValidity())return;const problem=validateDraft();if(problem){select(problem.key);notice(problem.message,true);return;}setBusy(true);notice('Saving your story…');try{const result=await api('/api/editor/story',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({revision,content:story})});revision=result.revision;dirty=false;$('saveState').textContent='Saved '+new Date(result.updatedAt).toLocaleString();notice('Saved. Players will see these changes when they open or refresh the game.');}catch(error){notice(error.message,true);if(error.status===401)expired();}finally{setBusy(false);}};
async function upload(input){const file=input.files?.[0];if(!file||busy||!story)return;if(file.size>5*1024*1024||!['image/png','image/jpeg','image/webp'].includes(file.type)){notice('Choose a PNG, JPEG, or WebP image smaller than 5 MB.',true);input.value='';return;}setBusy(true);notice('Uploading image…');try{const bitmap=await createImageBitmap(file);if(bitmap.width*bitmap.height>40000000){bitmap.close();throw new Error('Please choose an image under 40 megapixels.');}bitmap.close();const data=await api('/api/editor/upload',{method:'POST',headers:{'Content-Type':file.type},body:file});selected().image=data.url;markDirty();preview();notice('Image updated for this scene only. Save changes to publish.');}catch(error){notice(error.message||'The image could not be uploaded. Try another image.',true);if(error.status===401)expired();}finally{input.value='';setBusy(false);}}
function renderVoice(){const scene=selected(),clip=scene.voice||'',player=$('voicePreview');player.hidden=!clip;if(clip){if(player.getAttribute('src')!==clip)player.src=clip;}else if(player.hasAttribute('src')){player.removeAttribute('src');player.load();}$('voiceState').textContent=clip?'A voice clip plays when this scene opens.':'No voice clip. This scene stays silent.';$('removeVoice').disabled=busy||!clip;}
async function uploadVoice(input){const file=input.files?.[0];if(!file||busy||!story)return;if(file.size>10*1024*1024||(file.type&&!file.type.startsWith('audio/'))){notice('Choose an MP3, WAV, M4A, OGG, or WebM clip smaller than 10 MB.',true);input.value='';return;}setBusy(true);notice('Uploading voice clip…');try{const data=await api('/api/editor/upload',{method:'POST',headers:{'Content-Type':file.type||'application/octet-stream'},body:file});if(data.kind!=='voice')throw new Error('That file was read as an image. Choose an MP3, WAV, M4A, OGG, or WebM clip.');selected().voice=data.url;markDirty();renderVoice();notice('Voice clip added to this scene only. Save changes to publish.');}catch(error){notice(error.message||'The voice clip could not be uploaded. Try another file.',true);if(error.status===401)expired();}finally{input.value='';setBusy(false);}}
$('voiceFile').onchange=()=>uploadVoice($('voiceFile'));
$('removeVoice').onclick=()=>{if(busy||!selected().voice)return;delete selected().voice;markDirty();renderVoice();notice('Voice clip removed from this scene. Save changes to publish.');};
$('sceneFile').onchange=()=>upload($('sceneFile'));$('useDefault').onclick=()=>{selected().image=story.sceneImages?.[selection]||story.image;markDirty();preview();};
$('reload').onclick=()=>{if(dirty)$('confirmDialog').showModal();else load();};$('cancelReload').onclick=()=>$('confirmDialog').close();$('confirmReload').onclick=()=>{$('confirmDialog').close();load();};
$('lock').onclick=async()=>{if(dirty&&!confirm('Lock the editor and discard your unsaved changes?'))return;try{await api('/api/editor/logout',{method:'POST'});dirty=false;story=null;$('workspace').hidden=true;$('loginPanel').hidden=false;$('lock').hidden=true;$('loginStatus').textContent='Editor locked.';}catch(error){notice(error.message,true);}};
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
(async()=>{try{const session=await api('/api/editor/session');if(session.authenticated)await showWorkspace();else $('loginStatus').textContent='';}catch{$('loginStatus').textContent='Could not check your session. You can try unlocking again.';}})();

function artworkUrl(path){return path==='/scene.png'?path+'?art=storybook-ui-v2':path;}

const choiceDrafts=new Map();
$('addScene').onclick=()=>{if(!story||busy||Object.keys(story.nodes).length>=120)return;const previous=selected(),previousKey=selection,next=nextOrderedTarget(),id='scene_'+crypto.randomUUID().replaceAll('-','');const order=orderedSceneKeys();const index=order.indexOf(previousKey);story.nodes[id]={ch:null,speaker:previous.speaker,title:'New scene',loc:previous.loc||'',narration:'',line:'',choices:[{text:'Continue',next}]};order.splice(index+1,0,'nodes:'+id);story.sceneOrder=order;if(previousKey.startsWith('nodes:')&&!previous.end&&previous.choices?.length===1)previous.choices[0].next=id;selection='nodes:'+id;markDirty();buildEntries();select(selection);notice('Scene added here. Its choices continue to the following scene. A single choice in the preceding scene now leads here.');$('title').focus();$('title').select();};
$('addChoice').onclick=()=>{const scene=selected();if(busy||scene.end||selection.startsWith('endings:')||(scene.choices?.length||0)>=3)return;scene.choices??=[];scene.choices.push({text:'New choice',next:nextOrderedTarget()});markDirty();renderChoices();preview();};
$('sceneSpeaker').onchange=()=>{selected().speaker=$('sceneSpeaker').value;$('speakerLabel').textContent=selected().speaker;markDirty();preview();};
$('sceneChapter').onchange=()=>{selected().ch=$('sceneChapter').value===''?null:Number($('sceneChapter').value);markDirty();buildEntries();select(selection);};
$('sceneType').onchange=()=>{const scene=selected(),type=$('sceneType').value;if(selection.startsWith('endings:')||(selection==='nodes:start'&&type==='ending'))return;
if(!scene.end&&scene.type!=='image')choiceDrafts.set(selection,structuredClone(scene.choices||[]));
if(type==='ending'){scene.end=true;delete scene.type;delete scene.choices;}
else if(type==='image'){const next=scene.choices?.[0]?.next||choiceDrafts.get(selection)?.[0]?.next||nextOrderedTarget();delete scene.end;scene.type='image';scene.choices=[{text:'Next',next}];}
else{delete scene.end;delete scene.type;scene.choices=choiceDrafts.get(selection)?.length?structuredClone(choiceDrafts.get(selection)):[{text:'Continue',next:scene.choices?.[0]?.next||nextOrderedTarget()}];}
markDirty();buildEntries();select(selection);};
$('deleteScene').onclick=()=>{const [group,id]=selection.split(':');if(busy||group!=='nodes'||id==='start'||incoming(id).length)return;if(!confirm('Delete “'+(selected().title||'Untitled scene')+'”? This takes effect when you save.'))return;delete story.nodes[id];selection='nodes:start';markDirty();buildEntries();select(selection);notice('Scene removed from your draft. Save changes to publish.');};
// Backup, restore and search. None of these publish anything on their own:
// they fill in the draft, and the editor still has to save it.
$('sceneSearch').oninput=()=>{if(story)buildEntries();};

function loadDraft(content,message){
 story=content;
 if(!Array.isArray(story.sceneOrder))story.sceneOrder=[];
 const [group,id]=selection.split(':');
 if(!story[group]?.[id])selection='nodes:start';
 markDirty();buildEntries();
 select(entries.some(entry=>entry.key===selection)?selection:'nodes:start');
 const problem=validateDraft();
 if(problem){select(problem.key);notice(message+' One thing to fix before saving: '+problem.message,true);}
 else notice(message);
}

$('exportStory').onclick=()=>{
 if(!story||busy)return;
 const name='a-sip-of-home-'+new Date().toISOString().slice(0,10)+'.json';
 const url=URL.createObjectURL(new Blob([JSON.stringify(story,null,2)],{type:'application/json'}));
 const link=document.createElement('a');link.href=url;link.download=name;
 document.body.append(link);link.click();link.remove();
 setTimeout(()=>URL.revokeObjectURL(url),10000);
 notice('Saved '+name+' to your downloads. It includes any unsaved changes in this draft.');
};

async function importStory(input){
 const file=input.files?.[0];
 if(!file||busy||!story){input.value='';return;}
 if(dirty&&!confirm('Replace your draft with this backup? Your unsaved changes will be lost.')){input.value='';return;}
 try{
  const data=JSON.parse(await file.text());
  const content=data&&typeof data==='object'&&!data.nodes&&data.content?data.content:data;
  if(!content||typeof content!=='object'||!content.nodes||!content.endings)throw new Error('That file is not a story backup.');
  if(!content.nodes.start)throw new Error('That backup has no opening scene, so the game could not start.');
  loadDraft(content,'Backup loaded into your draft. Review it, then save to publish.');
 }catch(error){notice(error instanceof SyntaxError?'That file is not valid JSON.':error.message||'That file could not be read.',true);}
 finally{input.value='';}
}
$('importFile').onchange=()=>importStory($('importFile'));

$('resetStory').onclick=async()=>{
 if(busy||!story)return;
 if(!confirm('Reset your draft to the original story? Your current draft will be replaced. Nothing changes for players until you save.'))return;
 setBusy(true);notice('Loading the original story…');
 try{const data=await api('/api/story/original');loadDraft(data.content,'Original story loaded into your draft. Save to publish it.');}
 catch(error){notice(error.message,true);}
 finally{setBusy(false);}
};

$('duplicateScene').onclick=()=>{
 const [group,id]=selection.split(':');
 if(busy||!story||group!=='nodes'||id==='ending'||Object.keys(story.nodes).length>=120)return;
 const copy=structuredClone(selected());
 copy.title=(copy.title||'Untitled scene')+' (copy)';
 const newId='scene_'+crypto.randomUUID().replaceAll('-','');
 story.nodes[newId]=copy;
 const order=orderedSceneKeys();order.splice(order.indexOf(selection)+1,0,'nodes:'+newId);story.sceneOrder=order;
 selection='nodes:'+newId;markDirty();buildEntries();select(selection);
 notice('Scene duplicated. Nothing leads to the copy yet — point a choice at it to bring it into the story.');
 $('title').focus();$('title').select();
};

function validateDraft(){for(const group of ['nodes','endings'])for(const [id,scene]of Object.entries(story[group])){if(group==='nodes'&&id==='ending')continue;const key=group+':'+id;if(!scene.title?.trim()||(scene.type!=='image'&&!scene.line?.trim()))return {key,message:'Add a title and dialogue to “'+(scene.title||'Untitled scene')+'” before saving.'};if(!scene.end&&group==='nodes'){if(!scene.choices?.length||scene.choices.length>3)return {key,message:'Add 1–3 choices, or make this scene an ending.'};for(const choice of scene.choices){if(!choice.text?.trim())return {key,message:'Write the text for every choice.'};if(!Object.hasOwn(story.nodes,choice.next)&&!(choice.next?.startsWith('ending:')&&Object.hasOwn(story.endings,choice.next.slice(7))))return {key,message:'Choose a valid destination for every choice.'};}}}return null;}
