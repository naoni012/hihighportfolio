import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const stage = document.getElementById('hamon-model-stage');
if (!stage) throw new Error('Hamon model stage was not found.');

const fallback = stage.querySelector('.model-fallback');
const loading = stage.querySelector('.model-loading');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
camera.position.set(0, 0.18, 5.6);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.domElement.setAttribute('aria-hidden', 'true');
stage.prepend(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x8875a8, 3.1));
const key = new THREE.DirectionalLight(0xffffff, 4.6);
key.position.set(3.5, 5.2, 5.6);
key.castShadow = true;
scene.add(key);
const fill = new THREE.DirectionalLight(0xd7c7ff, 2.5);
fill.position.set(-4.5, 1.8, 3.2);
scene.add(fill);
const rim = new THREE.DirectionalLight(0xfff2d9, 2.2);
rim.position.set(1.5, 2.7, -4);
scene.add(rim);

const root = new THREE.Group();
scene.add(root);

const shadow = new THREE.Mesh(
  new THREE.CircleGeometry(1.5, 64),
  new THREE.ShadowMaterial({ color: 0x493d61, opacity: 0.16 })
);
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = -1.62;
shadow.receiveShadow = true;
scene.add(shadow);

let modelReady = false;
const loader = new GLTFLoader();
loader.load(
  'assets/models/hamon_sculpt_master_WEB.glb',
  gltf => {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const scale = 3.05 / Math.max(size.x, size.y, size.z);
    model.scale.setScalar(scale);
    model.position.set(-center.x * scale, -center.y * scale - 0.05, -center.z * scale);

    model.traverse(node => {
      if (!node.isMesh) return;
      node.castShadow = true;
      node.receiveShadow = true;
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach(material => {
        if (!material) return;
        if ('roughness' in material) material.roughness = Math.max(material.roughness ?? 0.5, 0.78);
        if ('metalness' in material) material.metalness = Math.min(material.metalness ?? 0, 0.05);
        if ('sheen' in material) {
          material.sheen = 0.55;
          material.sheenRoughness = 0.9;
          material.sheenColor = new THREE.Color(0xcab7ef);
        }
        material.needsUpdate = true;
      });
    });

    root.add(model);
    modelReady = true;
    fallback?.classList.add('is-hidden');
    if (loading) loading.textContent = 'VELVET CHARACTER · READY';
    window.setTimeout(() => loading?.remove(), 1400);
  },
  event => {
    if (!loading || !event.total) return;
    const percent = Math.round((event.loaded / event.total) * 100);
    loading.textContent = `LOADING 3D · ${percent}%`;
  },
  error => {
    console.warn('[hamon] GLB load failed. Static sheet fallback remains visible.', error);
    if (loading) loading.textContent = 'STATIC PREVIEW';
  }
);

let dragging = false;
let previousX = 0;
let targetRotation = -0.2;
let rotation = -0.2;

stage.addEventListener('pointerdown', event => {
  dragging = true;
  previousX = event.clientX;
  stage.setPointerCapture?.(event.pointerId);
});
stage.addEventListener('pointermove', event => {
  if (!dragging) return;
  const dx = event.clientX - previousX;
  previousX = event.clientX;
  targetRotation += dx * 0.008;
});
const release = event => {
  dragging = false;
  try { stage.releasePointerCapture?.(event.pointerId); } catch (_) {}
};
stage.addEventListener('pointerup', release);
stage.addEventListener('pointercancel', release);
stage.addEventListener('pointerleave', () => { dragging = false; });

const resize = () => {
  const width = stage.clientWidth || 1;
  const height = stage.clientHeight || 1;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
};
new ResizeObserver(resize).observe(stage);
resize();

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  if (!reducedMotion && !dragging && modelReady) targetRotation += 0.0015;
  rotation += (targetRotation - rotation) * 0.075;
  root.rotation.y = rotation;
  root.position.y = reducedMotion ? 0 : Math.sin(t * 0.9) * 0.055;
  renderer.render(scene, camera);
}
animate();
