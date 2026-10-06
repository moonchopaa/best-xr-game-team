'use strict';
(()=>{
 const toggle=document.getElementById('musicToggle'),slider=document.getElementById('musicVolume'),status=document.getElementById('musicStatus'),effects=document.getElementById('soundToggle');
 const music=new Audio('/starlight.wav');music.loop=true;music.preload='auto';
 let enabled=true,volume=.5,sound=true,attempting=false,activated=false,clickContext;
 try{const s=JSON.parse(localStorage.getItem('sip-audio-v2')||'null');if(s){enabled=s.enabled!==false;sound=s.sound!==false;if(Number.isFinite(s.volume))volume=Math.max(0,Math.min(1,s.volume));}}catch{}
 function save(){try{localStorage.setItem('sip-audio-v2',JSON.stringify({enabled,volume,sound}));}catch{}}
 function show(){toggle.textContent=enabled?'Music: On':'Music: Off';toggle.setAttribute('aria-pressed',String(enabled));effects.textContent=sound?'Button sounds: On':'Button sounds: Off';effects.setAttribute('aria-pressed',String(sound));slider.value=String(Math.round(volume*100));music.volume=volume*.25;status.textContent=!enabled?'Music muted':!music.paused?'A Little Sip of Starlight · Original theme':'Tap a game button to start music';}
 function play(){if(!enabled||attempting||!music.paused)return;attempting=true;status.textContent='Loading music…';music.play().then(()=>{activated=true;show();}).catch(()=>{status.textContent='Tap Music to start playback.';}).finally(()=>{attempting=false;});}
 function clickSound(){if(!sound)return;try{const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)return;clickContext??=new AudioCtx();clickContext.resume().then(()=>{const now=clickContext.currentTime,osc=clickContext.createOscillator(),gain=clickContext.createGain();osc.type='sine';osc.frequency.setValueAtTime(740,now);osc.frequency.exponentialRampToValueAtTime(440,now+.075);gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.28,now+.006);gain.gain.exponentialRampToValueAtTime(.0001,now+.09);osc.connect(gain);gain.connect(clickContext.destination);osc.start(now);osc.stop(now+.1);osc.onended=()=>{osc.disconnect();gain.disconnect();};}).catch(()=>{});}catch{}}
 toggle.addEventListener('click',()=>{enabled=!enabled;save();if(enabled)play();else music.pause();show();});
 effects.addEventListener('click',()=>{sound=!sound;save();show();});
 slider.addEventListener('input',()=>{volume=Number(slider.value)/100;music.volume=volume*.25;save();});
 document.addEventListener('click',event=>{const button=event.target.closest('button');if(button&&!button.disabled)clickSound();if(button!==toggle)play();});
 document.addEventListener('keydown',event=>{if(event.repeat||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName))return;if(['1','2','3','4'].includes(event.key)){clickSound();play();}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)music.pause();else if(activated)play();});
 music.addEventListener('error',()=>{status.textContent='Music could not load. Refresh to try again.';});
 show();
})();
