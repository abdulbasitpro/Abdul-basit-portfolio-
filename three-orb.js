// three-orb.js
import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = document.createElement('canvas');
renderer.domElement.id = 'orb-canvas';
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1.2, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x3b82f6,
  roughness: 0.1,
  metalness: 0.9,
  transparent: true,
  opacity: 0.6
});
const orb = new THREE.Mesh(geometry, material);
scene.add(orb);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x3b82f6, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  orb.rotation.x = Math.sin(Date.now() * 0.0003) * 0.2;
  orb.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});