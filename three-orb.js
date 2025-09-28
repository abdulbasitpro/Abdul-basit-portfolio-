// three-orb.js - Fixed Version (Blue Animated Orb)

// Create canvas
const canvas = document.createElement('canvas');
canvas.id = 'orb-canvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

// Load Three.js if not already loaded
if (typeof THREE === 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  script.onload = initThreeJS;
  document.head.appendChild(script);
} else {
  initThreeJS();
}

function initThreeJS() {
  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Add ambient light (soft global light)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Add point light (bright blue spotlight)
  const pointLight = new THREE.PointLight(0x3b82f6, 1.5); // Bright blue
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Create orb with visible material
  const geometry = new THREE.SphereGeometry(1.2, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,      // Blue
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.7,
    emissive: 0x3b82f6,   // Glow effect
    emissiveIntensity: 0.5
  });

  const orb = new THREE.Mesh(geometry, material);
  scene.add(orb);

  camera.position.z = 5;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    orb.rotation.x += 0.005;
    orb.rotation.y += 0.005;
    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}