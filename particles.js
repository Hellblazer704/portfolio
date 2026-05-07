// particles.js — Three.js 3D floating particle background
export function initParticles() {
  const container = document.getElementById('canvas-container');
  if (!container || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 300;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Particle system
  const count = window.innerWidth < 768 ? 800 : 1800;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const palette = [
    { r: 0.545, g: 0.435, b: 0.278 }, // teak brown
    { r: 0.831, g: 0.659, b: 0.325 }, // gold
    { r: 0.671, g: 0.580, b: 0.494 }, // warm taupe
    { r: 0.761, g: 0.702, b: 0.643 }, // soft beige
    { r: 0.420, g: 0.384, b: 0.345 }, // warm gray
  ];

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 800;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 500;

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    sizes[i] = Math.random() * 3 + 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 2.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Connecting lines between nearby particles
  const linesMaterial = new THREE.LineBasicMaterial({
    color: 0x8B6F47,
    transparent: true,
    opacity: 0.06,
    blending: THREE.AdditiveBlending,
  });

  const linesGeometry = new THREE.BufferGeometry();
  const linePositions = [];
  const posArr = geometry.attributes.position.array;

  for (let i = 0; i < Math.min(count, 300); i++) {
    for (let j = i + 1; j < Math.min(count, 300); j++) {
      const dx = posArr[i*3] - posArr[j*3];
      const dy = posArr[i*3+1] - posArr[j*3+1];
      const dz = posArr[i*3+2] - posArr[j*3+2];
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
      if (dist < 80) {
        linePositions.push(posArr[i*3], posArr[i*3+1], posArr[i*3+2]);
        linePositions.push(posArr[j*3], posArr[j*3+1], posArr[j*3+2]);
      }
    }
  }

  linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
  scene.add(lines);

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Scroll-based fade
  let scrollOpacity = 1;
  window.addEventListener('scroll', () => {
    const heroHeight = document.getElementById('hero')?.clientHeight || window.innerHeight;
    scrollOpacity = Math.max(0, 1 - (window.scrollY / (heroHeight * 0.7)));
    container.style.opacity = scrollOpacity;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animate
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    particles.rotation.y = elapsed * 0.03 + mouseX * 0.15;
    particles.rotation.x = elapsed * 0.015 + mouseY * 0.1;
    lines.rotation.y = particles.rotation.y;
    lines.rotation.x = particles.rotation.x;

    // Gentle wave motion
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(elapsed + i * 0.01) * 0.05;
    }
    geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
}
