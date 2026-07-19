import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';

const stage = document.querySelector('#three-stage');
const loading = stage.querySelector('.stage-loading');
const projectButtons = [...document.querySelectorAll('.rail-item')];

const projectData = {
  hamon: { index: 0, color: 0xbda6e8, target: '#hamon' },
  resummer: { index: 1, color: 0x93cdd0, target: '#resummer' },
  danjo: { index: 2, color: 0xd6a269, target: '#danjo' }
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(0, 0.15, 9.4);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
stage.prepend(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0xdedede, 2.4));
const key = new THREE.DirectionalLight(0xffffff, 3.2);
key.position.set(4, 6, 7);
key.castShadow = true;
scene.add(key);
const rim = new THREE.DirectionalLight(0xd9ceff, 2.1);
rim.position.set(-5, 1, 3);
scene.add(rim);

const world = new THREE.Group();
scene.add(world);

const objects = [];
const baseMaterial = (color, roughness = .28, metalness = .05) => new THREE.MeshPhysicalMaterial({
  color,
  roughness,
  metalness,
  clearcoat: .42,
  clearcoatRoughness: .35
});

// HAMON: soft asymmetric character-like sculpture
const hamon = new THREE.Group();
const hamonBody = new THREE.Mesh(new THREE.SphereGeometry(1.02, 64, 64), baseMaterial(0xbda6e8, .38, 0));
hamonBody.scale.set(1.02, 1.18, .92);
hamon.add(hamonBody);
const eyeMat = baseMaterial(0x20202b, .08, .2);
const eyeL = new THREE.Mesh(new THREE.SphereGeometry(.21, 32, 32), eyeMat); eyeL.position.set(-.33,.18,.89); eyeL.scale.z=.5;
const eyeR = new THREE.Mesh(new THREE.SphereGeometry(.135, 32, 32), eyeMat); eyeR.position.set(.32,.14,.91); eyeR.scale.set(.78,1.18,.45);
hamon.add(eyeL,eyeR);
const antenna = new THREE.Mesh(new THREE.CapsuleGeometry(.055,.48,10,20),baseMaterial(0xbda6e8,.38,0)); antenna.rotation.z=-.52; antenna.position.set(.52,.98,0);
const tip = new THREE.Mesh(new THREE.SphereGeometry(.12,24,24),baseMaterial(0xbda6e8,.38,0)); tip.position.set(.68,1.22,0);
hamon.add(antenna,tip);
hamon.position.x=-2.55;
hamon.userData.key='hamon';
world.add(hamon); objects.push(hamon);

// RE,SUMMER: folded-paper butterfly abstraction
const summer = new THREE.Group();
const wingMat = new THREE.MeshPhysicalMaterial({color:0xf5f2e9,side:THREE.DoubleSide,roughness:.72,metalness:0,transmission:.05});
const wingShape = new THREE.Shape();
wingShape.moveTo(0, 0);
wingShape.bezierCurveTo(.4, .85, 1.22, .95, 1.48, .16);
wingShape.bezierCurveTo(1.1, -.12, .6, -.28, 0, 0);
const wingGeo = new THREE.ShapeGeometry(wingShape);
const wingL = new THREE.Mesh(wingGeo,wingMat); wingL.rotation.set(-.15,.15,.15); wingL.scale.set(1.1,1.1,1);
const wingR = wingL.clone(); wingR.scale.x=-1.1; wingR.rotation.set(-.15,-.15,-.15);
summer.add(wingL,wingR);
const body = new THREE.Mesh(new THREE.CapsuleGeometry(.07,.7,8,16),baseMaterial(0x93cdd0,.5,0)); body.rotation.z=Math.PI/2; body.position.z=.08; summer.add(body);
summer.position.x=0; summer.userData.key='resummer';
world.add(summer); objects.push(summer);

// DANJO: forged blade / ember sculpture
const danjo = new THREE.Group();
const bladeGeo = new THREE.ConeGeometry(.52,2.15,4,1,false);
const blade = new THREE.Mesh(bladeGeo,baseMaterial(0x8f969d,.2,.78)); blade.rotation.z=-Math.PI/2; blade.rotation.y=Math.PI/4; danjo.add(blade);
const handle = new THREE.Mesh(new THREE.CylinderGeometry(.16,.18,.95,24),baseMaterial(0x3f3127,.72,.05)); handle.rotation.z=Math.PI/2; handle.position.x=-1.46; danjo.add(handle);
const guard = new THREE.Mesh(new THREE.BoxGeometry(.12,.92,.2),baseMaterial(0xd6a269,.25,.55)); guard.position.x=-.98; danjo.add(guard);
for(let i=0;i<12;i++){
  const ember=new THREE.Mesh(new THREE.SphereGeometry(.025+Math.random()*.035,10,10),new THREE.MeshBasicMaterial({color:0xd6a269}));
  ember.position.set((Math.random()-.5)*1.8,(Math.random()-.5)*1.6,(Math.random()-.5)*.8); ember.userData.baseY=ember.position.y; ember.userData.speed=.5+Math.random(); danjo.add(ember);
}
danjo.position.x=2.55; danjo.rotation.z=.25; danjo.userData.key='danjo';
world.add(danjo); objects.push(danjo);

const floor = new THREE.Mesh(new THREE.PlaneGeometry(20,12),new THREE.ShadowMaterial({color:0x777777,opacity:.08}));
floor.rotation.x=-Math.PI/2; floor.position.y=-2.1; floor.receiveShadow=true; scene.add(floor);
objects.forEach(group=>group.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}}));

let activeKey='hamon';
let targetRotationY=0;
let targetRotationX=0;
let pointerDown=false;
let previousX=0;
let autoRotate=true;
const raycaster=new THREE.Raycaster();
const pointer=new THREE.Vector2();

function setActive(key, scroll=false){
  activeKey=key;
  projectButtons.forEach(btn=>btn.classList.toggle('active',btn.dataset.project===key));
  document.documentElement.style.setProperty('--accent',`#${projectData[key].color.toString(16).padStart(6,'0')}`);
  objects.forEach(obj=>{
    const active=obj.userData.key===key;
    obj.userData.targetScale=active?1.15:.82;
    obj.userData.targetY=active?.16:0;
  });
  if(scroll) document.querySelector(projectData[key].target).scrollIntoView({behavior:'smooth',block:'center'});
}
projectButtons.forEach(btn=>btn.addEventListener('click',()=>setActive(btn.dataset.project,true)));

stage.addEventListener('pointerdown',e=>{pointerDown=true;previousX=e.clientX;autoRotate=false;stage.setPointerCapture(e.pointerId)});
stage.addEventListener('pointermove',e=>{
  if(!pointerDown)return;
  const dx=e.clientX-previousX; previousX=e.clientX; targetRotationY+=dx*.006;
});
stage.addEventListener('pointerup',e=>{pointerDown=false;stage.releasePointerCapture(e.pointerId)});
stage.addEventListener('pointerleave',()=>pointerDown=false);
stage.addEventListener('click',e=>{
  const rect=renderer.domElement.getBoundingClientRect();
  pointer.x=((e.clientX-rect.left)/rect.width)*2-1;
  pointer.y=-((e.clientY-rect.top)/rect.height)*2+1;
  raycaster.setFromCamera(pointer,camera);
  const hits=raycaster.intersectObjects(objects,true);
  if(hits.length){
    let node=hits[0].object;
    while(node.parent&&!node.userData.key)node=node.parent;
    if(node.userData.key)setActive(node.userData.key,true);
  }
});

function resize(){
  const {clientWidth,clientHeight}=stage;
  camera.aspect=clientWidth/clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth,clientHeight,false);
}
window.addEventListener('resize',resize); resize(); loading.remove();

const clock=new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const t=clock.getElapsedTime();
  if(autoRotate)targetRotationY+=.0014;
  world.rotation.y+=(targetRotationY-world.rotation.y)*.06;
  world.rotation.x+=(targetRotationX-world.rotation.x)*.06;
  objects.forEach((obj,i)=>{
    const s=obj.userData.targetScale||.82;
    obj.scale.x+=(s-obj.scale.x)*.08;obj.scale.y+=(s-obj.scale.y)*.08;obj.scale.z+=(s-obj.scale.z)*.08;
    obj.position.y=((obj.userData.targetY||0)+Math.sin(t*.9+i)*.08);
  });
  summer.rotation.y=Math.sin(t*.65)*.22;
  hamon.rotation.y=Math.sin(t*.5)*.18;
  danjo.rotation.y=Math.sin(t*.55)*.18;
  danjo.children.forEach(child=>{if(child.userData.speed){child.position.y=child.userData.baseY+((t*child.userData.speed)%1.6);if(child.position.y>.9)child.position.y=-.7;}});
  renderer.render(scene,camera);
}
setActive('hamon'); animate();

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('video').forEach(video=>video.addEventListener('error',()=>video.style.opacity='0'));
