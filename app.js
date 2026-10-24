const sceneModules = ['s1', 's4', 's9', 's10', 's11', 's13', 's14'];

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
const baraatCanvas=document.querySelector(".baraat-canvas"),baraatLights=baraatCanvas.querySelector(".baraat-lights"),baraatPetals=baraatCanvas.querySelector(".baraat-petals"),baraatSparks=baraatCanvas.querySelector(".baraat-sparks");for(let i=0;i<26;i++){const e=document.createElement("i");e.className="baraat-glow";e.style.left=(i%2===0?Math.random()*9:91+Math.random()*7)+"%";e.style.top=Math.random()*94+"%";e.style.setProperty("--d",1.4+Math.random()*3.5+"s");e.style.setProperty("--delay",-Math.random()*4+"s");baraatLights.appendChild(e)}for(let i=0;i<24;i++){const e=document.createElement("i");e.className="baraat-petal";e.style.setProperty("--x",Math.random()*100+"%");e.style.setProperty("--s",7+Math.random()*13+"px");e.style.setProperty("--o",(.48+Math.random()*.45).toFixed(2));e.style.setProperty("--t",8+Math.random()*11+"s");e.style.setProperty("--delay",-Math.random()*18+"s");baraatPetals.appendChild(e)}for(let i=0;i<32;i++){const e=document.createElement("i");e.className="baraat-spark";e.style.left=Math.random()*100+"%";e.style.top=Math.random()*100+"%";e.style.setProperty("--t",1.5+Math.random()*3.5+"s");e.style.setProperty("--delay",-Math.random()*5+"s");baraatSparks.appendChild(e)}
const panigrahanCanvas=document.querySelector(".panigrahan-canvas"),panigrahanPetalLayer=panigrahanCanvas.querySelector(".panigrahan-petal-layer"),panigrahanSparkLayer=panigrahanCanvas.querySelector(".panigrahan-spark-layer");for(let i=0;i<58;i++){const e=document.createElement("i");e.className="panigrahan-petal";e.style.setProperty("--x",Math.random()*100+"%");e.style.setProperty("--s",3.5+Math.random()*5.5+"px");e.style.setProperty("--o",(.68+Math.random()*.3).toFixed(2));e.style.setProperty("--t",8+Math.random()*11+"s");e.style.setProperty("--delay",-Math.random()*18+"s");panigrahanPetalLayer.appendChild(e)}for(let i=0;i<24;i++){const e=document.createElement("i");e.className="panigrahan-spark";e.style.left=(22+Math.random()*56)+"%";e.style.top=(55+Math.random()*35)+"%";e.style.setProperty("--t",1.5+Math.random()*3.5+"s");e.style.setProperty("--delay",-Math.random()*5+"s");panigrahanSparkLayer.appendChild(e)}
function duration(){return Number(scenes[index].dataset.duration)||6500}
function show(n){index=Math.max(0,Math.min(scenes.length-1,n));scenes.forEach((s,i)=>s.classList.toggle('active',i===index));document.body.classList.toggle('ghudchadi-active',scenes[index].id==='s9');$('counter').textContent=String(index+1).padStart(2,'0')+' / '+String(scenes.length).padStart(2,'0');progress.style.width=(index/scenes.length*100)+'%';elapsed=0;if(playing)beginTimer()}
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
