// Demo 2: Advanced Shader
import { initScene } from './threeUtils.js';

export function initDemo2(vertexShader, fragmentShader) {
    const { renderer, scene, camera, resizeRendererToDisplaySize } = initScene('scene2', 'scene2-container');
    camera.position.z = 1;

    const uniforms = { 
        u_time: { value: 0.0 },
        u_complexity: { value: 5.0 },
        u_colorA: { value: new THREE.Color('#43C6AC') },
        u_colorB: { value: new THREE.Color('#191654') },
        u_colorC: { value: new THREE.Color('#F8FFAE') },
    };

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    });
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    const gui = new lil.GUI({ container: document.getElementById('scene2-container') });
    const params = { speed: 1.0 };
    gui.add(params, 'speed', 0.1, 2.0).name('Speed');
    gui.add(uniforms.u_complexity, 'value', 1.0, 20.0).name('Complexity');
    gui.addColor({ color: uniforms.u_colorA.value.getStyle() }, 'color').name('Color A').onChange(val => uniforms.u_colorA.value.set(val));
    gui.addColor({ color: uniforms.u_colorB.value.getStyle() }, 'color').name('Color B').onChange(val => uniforms.u_colorB.value.set(val));
    gui.addColor({ color: uniforms.u_colorC.value.getStyle() }, 'color').name('Color C').onChange(val => uniforms.u_colorC.value.set(val));

    const clock = new THREE.Clock();

    function animate() {
        resizeRendererToDisplaySize();
        uniforms.u_time.value = clock.getElapsedTime() * params.speed;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
}
