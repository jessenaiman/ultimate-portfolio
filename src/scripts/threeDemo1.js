// Demo 1: Basic Geometry & Lighting
import { initScene } from './threeUtils.js';

export function initDemo1() {
    const { renderer, scene, camera, resizeRendererToDisplaySize } = initScene('scene1', 'scene1-container');
    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), new THREE.MeshStandardMaterial({ color: 0x1e90ff }));
    sphere.position.x = -1.5;
    const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0xff4500 }));
    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 16, 100), new THREE.MeshStandardMaterial({ color: 0x32cd32 }));
    torus.position.x = 1.5;

    const group = new THREE.Group();
    group.add(sphere, box, torus);
    scene.add(group);

    const gui = new lil.GUI({ container: document.getElementById('scene1-container') });
    const params = { lightColor: pointLight.color.getHex(), showSphere: true, showBox: true, showTorus: true };
    gui.addColor(params, 'lightColor').name('Light Color').onChange(val => pointLight.color.set(val));
    gui.add(params, 'showSphere').name('Show Sphere').onChange(val => sphere.visible = val);
    gui.add(params, 'showBox').name('Show Box').onChange(val => box.visible = val);
    gui.add(params, 'showTorus').name('Show Torus').onChange(val => torus.visible = val);

    function animate() {
        resizeRendererToDisplaySize();
        group.rotation.y += 0.005;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
}
