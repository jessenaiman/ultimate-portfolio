// Shader background for the mobile design page
export function initShaderBackground(canvas: HTMLCanvasElement): void {
  // Check if THREE is available
  if (typeof THREE === 'undefined') {
    console.warn('THREE.js is not loaded. Skipping shader background initialization.');
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ 
    canvas,
    alpha: true,
    antialias: true 
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Create shader material
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        vec2 p = (2.0 * gl_FragCoord.xy - resolution) / min(resolution.x, resolution.y);
        
        // Animate
        float t = time * 0.1;
        
        // Create a simple gradient with some noise
        vec3 color1 = vec3(0.1, 0.2, 0.4);
        vec3 color2 = vec3(0.0, 0.1, 0.2);
        
        // Mix colors based on position and time
        float mixValue = 0.5 + 0.3 * sin(p.x * 2.0 + t) * cos(p.y * 3.0 + t * 0.7);
        vec3 finalColor = mix(color1, color2, mixValue);
        
        // Add some subtle pulsing
        float pulse = 0.8 + 0.2 * sin(t * 0.5);
        finalColor *= pulse;
        
        gl_FragColor = vec4(finalColor, 0.15);
      }
    `,
    transparent: true,
    depthTest: false,
    depthWrite: false
  });
  
  // Create full-screen plane
  const geometry = new THREE.PlaneGeometry(2, 2);
  const plane = new THREE.Mesh(geometry, shaderMaterial);
  scene.add(plane);
  
  // Handle window resize
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    shaderMaterial.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  };
  
  window.addEventListener('resize', onWindowResize, false);
  
  // Animation loop
  const animate = (time: number) => {
    requestAnimationFrame(animate);
    shaderMaterial.uniforms.time.value = time * 0.001; // Convert to seconds
    renderer.render(scene, camera);
  };
  
  // Start animation
  animate(0);
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', onWindowResize);
    renderer.dispose();
    geometry.dispose();
    shaderMaterial.dispose();
  };
}