const sceneModules = ['s1', 's4', 's5', 's5-chaak', 's6', 's9', 's10', 's11', 's13', 's14'];

const mount = document.querySelector("#scenes");
const sceneMarkup = await Promise.all(sceneModules.map(async (id) => {
  const response = await fetch(`scenes/${id}.html?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load scene ${id}`);
  return response.text();
}));
mount.innerHTML = sceneMarkup.join("\n");

const venueFrame=document.querySelector('.venues-iframe');

const scenes=[...document.querySelectorAll('.scene')];let index=0,playing=false,autoTimer=null,progressTimer=null,startAt=0,elapsed=0,musicOn=false,soundtrackStarted=false;
const $=id=>document.getElementById(id),progress=$('progress');
const soundtrack=$('soundtrack');
const creditsScene=$('s13'),creditsRoll=creditsScene.querySelector('.credits-roll');
function updateMusicButton(){const button=$('music');button.setAttribute('aria-pressed',String(musicOn));button.setAttribute('aria-label',musicOn?'Turn music off':'Turn music on');button.querySelector('span').textContent='\u266b'}
soundtrack.addEventListener('playing',()=>{musicOn=true;soundtrackStarted=true;updateMusicButton()});
soundtrack.addEventListener('error',()=>console.error('Soundtrack failed to load',soundtrack.error));
soundtrack.addEventListener('canplay',()=>{if(playing&&soundtrack.paused)startSoundtrack()},{once:true});
function stopSoundtrack(){const soundtrack=$('soundtrack');soundtrack.pause();soundtrack.currentTime=0;musicOn=false;updateMusicButton()}
function finishCredits(){creditsRoll.classList.remove('replaying');if(!creditsScene.classList.contains('credits-complete'))creditsScene.classList.add('credits-complete')}
new MutationObserver(()=>{if(creditsScene.classList.contains('active')&&matchMedia('(prefers-reduced-motion: reduce)').matches)creditsScene.classList.add('credits-complete')}).observe(creditsScene,{attributes:true,attributeFilter:['class']});
creditsRoll.addEventListener('animationend',event=>{if(event.animationName==='creditsRoll')finishCredits()});
$('repeat-credits').addEventListener('click',()=>{creditsScene.classList.remove('credits-complete');creditsRoll.classList.add('replaying');creditsRoll.style.animation='none';void creditsRoll.offsetHeight;creditsRoll.style.animation='';if(playing)beginTimer()});
const sangeetStars=(()=>{const canvas=document.querySelector('.sangeet-stars'),context=canvas.getContext('2d');let stars=[],frame=0,active=false;function resize(){const box=canvas.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(box.width*ratio);canvas.height=Math.round(box.height*ratio);context.setTransform(ratio,0,0,ratio,0,0);stars=Array.from({length:120},()=>({x:Math.random()*box.width,y:Math.random()*box.height,r:.35+Math.random()*1.25,phase:Math.random()*6.28,speed:.7+Math.random()*2.2,alpha:.2+Math.random()*.48,glint:Math.random()<.12}))}function draw(time){if(!active)return;const box=canvas.getBoundingClientRect();context.clearRect(0,0,box.width,box.height);for(const star of stars){const alpha=star.alpha*(.48+.52*(.5+.5*Math.sin(time/1000*star.speed+star.phase)));context.globalAlpha=alpha;context.fillStyle=star.glint?'#ffe8aa':'#fff8e7';context.beginPath();context.arc(star.x,star.y,star.r,0,Math.PI*2);context.fill();if(star.glint&&alpha>.42){context.strokeStyle='#ffe2a0';context.lineWidth=.6;context.beginPath();context.moveTo(star.x-3,star.y);context.lineTo(star.x+3,star.y);context.moveTo(star.x,star.y-3);context.lineTo(star.x,star.y+3);context.stroke()}}context.globalAlpha=1;frame=requestAnimationFrame(draw)}return{start(){if(active)return;active=true;resize();frame=requestAnimationFrame(draw)},stop(){active=false;cancelAnimationFrame(frame);context.clearRect(0,0,canvas.width,canvas.height)}}})();
for(let i=0;i<16;i++){const petal=document.createElement('i');petal.className='mehendi-petal';petal.style.left=(4+Math.random()*92)+'%';petal.style.setProperty('--duration',(9+Math.random()*9)+'s');petal.style.setProperty('--delay',(-Math.random()*15)+'s');petal.style.setProperty('--drift',(-35+Math.random()*70)+'px');petal.style.transform='scale('+(0.55+Math.random()*0.75)+')';$('s5').querySelector('.mehendi-petals').appendChild(petal)}
const baraatCanvas=document.querySelector(".baraat-canvas"),baraatLights=baraatCanvas.querySelector(".baraat-lights"),baraatPetals=baraatCanvas.querySelector(".baraat-petals"),baraatSparks=baraatCanvas.querySelector(".baraat-sparks");for(let i=0;i<26;i++){const e=document.createElement("i");e.className="baraat-glow";e.style.left=(i%2===0?Math.random()*9:91+Math.random()*7)+"%";e.style.top=Math.random()*94+"%";e.style.setProperty("--d",1.4+Math.random()*3.5+"s");e.style.setProperty("--delay",-Math.random()*4+"s");baraatLights.appendChild(e)}for(let i=0;i<24;i++){const e=document.createElement("i");e.className="baraat-petal";e.style.setProperty("--x",Math.random()*100+"%");e.style.setProperty("--s",7+Math.random()*13+"px");e.style.setProperty("--o",(.48+Math.random()*.45).toFixed(2));e.style.setProperty("--t",8+Math.random()*11+"s");e.style.setProperty("--delay",-Math.random()*18+"s");baraatPetals.appendChild(e)}for(let i=0;i<32;i++){const e=document.createElement("i");e.className="baraat-spark";e.style.left=Math.random()*100+"%";e.style.top=Math.random()*100+"%";e.style.setProperty("--t",1.5+Math.random()*3.5+"s");e.style.setProperty("--delay",-Math.random()*5+"s");baraatSparks.appendChild(e)}
const panigrahanCanvas=document.querySelector(".panigrahan-canvas"),panigrahanPetalLayer=panigrahanCanvas.querySelector(".panigrahan-petal-layer"),panigrahanSparkLayer=panigrahanCanvas.querySelector(".panigrahan-spark-layer");for(let i=0;i<58;i++){const e=document.createElement("i");e.className="panigrahan-petal";e.style.setProperty("--x",Math.random()*100+"%");e.style.setProperty("--s",3.5+Math.random()*5.5+"px");e.style.setProperty("--o",(.68+Math.random()*.3).toFixed(2));e.style.setProperty("--t",8+Math.random()*11+"s");e.style.setProperty("--delay",-Math.random()*18+"s");panigrahanPetalLayer.appendChild(e)}for(let i=0;i<24;i++){const e=document.createElement("i");e.className="panigrahan-spark";e.style.left=(22+Math.random()*56)+"%";e.style.top=(55+Math.random()*35)+"%";e.style.setProperty("--t",1.5+Math.random()*3.5+"s");e.style.setProperty("--delay",-Math.random()*5+"s");panigrahanSparkLayer.appendChild(e)}
for(let i=0;i<34;i++){const p=document.createElement("i");p.className="chaak-petal";p.style.setProperty("--x",Math.random()*100+"%");p.style.setProperty("--size",7+Math.random()*13+"px");p.style.setProperty("--duration",7+Math.random()*10+"s");p.style.setProperty("--delay",-Math.random()*17+"s");p.style.setProperty("--rot",Math.random()*360+"deg");p.style.setProperty("--drift",-55+Math.random()*110+"px");document.querySelector(".chaak-petals").appendChild(p)}
function duration(){return Number(scenes[index].dataset.duration)||6500}
function show(n){if(scenes[index]?.id==='s6')sangeetStars.stop();index=Math.max(0,Math.min(scenes.length-1,n));scenes.forEach((s,i)=>s.classList.toggle('active',i===index));document.body.classList.toggle('mehendi-active',scenes[index].id==='s5');document.body.classList.toggle('sangeet-active',scenes[index].id==='s6');document.body.classList.toggle('ghudchadi-active',scenes[index].id==='s9');if(scenes[index].id==='s6')sangeetStars.start();$('counter').textContent=String(index+1).padStart(2,'0')+' / '+String(scenes.length).padStart(2,'0');progress.style.width=(index/scenes.length*100)+'%';elapsed=0;if(playing)beginTimer()}
function stopTimer(){clearTimeout(autoTimer);clearInterval(progressTimer)}
function beginTimer(){
  stopTimer();
  startAt=Date.now();
  const d=duration();
  autoTimer=setTimeout(()=>{
    if(index<scenes.length-1)show(index+1);
    else{playing=false;document.body.classList.remove('presentation-playing');stopTimer();stopSoundtrack()}
  },d);
  progressTimer=setInterval(()=>{
    const p=Math.min(1,(Date.now()-startAt)/d);
    progress.style.width=((index+p)/scenes.length*100)+'%';
  },80);
}
async function startSoundtrack(){if(musicOn||scenes[index]?.id==='s14')return;const soundtrack=$('soundtrack');try{await soundtrack.play();musicOn=!soundtrack.paused;soundtrackStarted=musicOn;updateMusicButton()}catch(error){musicOn=false;updateMusicButton();console.warn('Soundtrack autoplay did not start:',error)}}
function setPlaying(next){
  if(next&&index===scenes.length-1){show(0)}
  playing=next;
  if(playing){beginTimer();startSoundtrack()}
  else{stopTimer();stopSoundtrack()}
  document.body.classList.toggle('presentation-playing',playing);
}
function navigate(delta){show(index+delta)}
function handleScreenAction(clientX,target){
  if(target?.closest?.('#music,.credits-repeat,a,button,input,select,textarea,video'))return;
  const x=clientX, width=window.innerWidth;
  if(x<width/3){if(!started){started=true;setPlaying(true)}navigate(-1);return}
  if(x>width*2/3){if(!started){started=true;setPlaying(true)}navigate(1);return}
  if(!started){started=true;setPlaying(true)}else setPlaying(!playing);
}
let started=false;
document.addEventListener('click',event=>handleScreenAction(event.clientX,event.target));
document.addEventListener('keydown',event=>{
  if(event.key==='ArrowRight'){event.preventDefault();if(!started){started=true;setPlaying(true)}navigate(1)}
  if(event.key==='ArrowLeft'){event.preventDefault();if(!started){started=true;setPlaying(true)}navigate(-1)}
  if(event.key===' '){event.preventDefault();if(!started){started=true;setPlaying(true)}else setPlaying(!playing)}
});
$('music').addEventListener('click',async event=>{
  event.stopPropagation();
  if(musicOn)stopSoundtrack();
  else await startSoundtrack();
});
function bindVenueNavigation(){
  try{
    const frameDocument=venueFrame.contentDocument;
    if(!frameDocument||frameDocument.documentElement.dataset.navigationBound)return;
    frameDocument.documentElement.dataset.navigationBound='true';
    frameDocument.addEventListener('click',event=>{
      if(event.target.closest('a,button,input,select,textarea'))return;
      const rect=venueFrame.getBoundingClientRect();
      handleScreenAction(rect.left+event.clientX,event.target);
    });
  }catch(error){console.warn('Could not bind venue scene navigation',error)}
}
venueFrame.addEventListener('load',bindVenueNavigation);
bindVenueNavigation();
show(0);
updateMusicButton();
started=true;
setPlaying(true);
