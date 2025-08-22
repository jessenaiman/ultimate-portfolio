// Demo 3: Dynamic Particle System
import { initScene } from './threeUtils.js';

export function initDemo3() {
    const { renderer, scene, camera, resizeRendererToDisplaySize } = initScene('scene3', 'scene3-container');
    camera.position.z = 1000;

    const count = 5000;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    for(let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000;
    }
    originalPositions.set(positions);
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ size: 2, color: 0x87ceeb });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const gui = new lil.GUI({ container: document.getElementById('scene3-container') });
    const params = {
        speed: 0.1,
        pattern: 'Galaxy',
        particleSize: particlesMaterial.size,
        particleColor: particlesMaterial.color.getHex(),
    };
    gui.add(params, 'speed', 0.05, 0.5).name('Animation Speed');
    gui.add(params, 'pattern', ['Galaxy', 'Wave', 'Static']).name('Pattern');
    gui.add(params, 'particleSize', 0.5, 10).name('Particle Size').onChange(val => particlesMaterial.size = val);
    gui.addColor(params, 'particleColor').name('Particle Color').onChange(val => particlesMaterial.color.set(val));

    const clock = new THREE.Clock();

    function animate() {
        resizeRendererToDisplaySize();
        const elapsedTime = clock.getElapsedTime() * params.speed;
        const positions = particles.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const x = originalPositions[i3];
            const y = originalPositions[i3 + 1];
            const z = originalPositions[i3 + 2];
            
            switch(params.pattern) {
                case 'Wave':
                    positions[i3 + 1] = y + Math.sin(elapsedTime * 5 + x * 0.01) * 100;
                    break;
                case 'Galaxy':
                    const angle = Math.atan2(x, z);
                    const radius = Math.sqrt(x*x + z*z);
                    positions[i3] = Math.cos(angle + elapsedTime) * radius;
                    positions[i3 + 2] = Math.sin(angle + elapsedTime) * radius;
                    break;
                case 'Static':
                    // Reset to original positions if coming from another pattern
                    positions[i3] = x;
                    positions[i3+1] = y;
                    break;
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
}
