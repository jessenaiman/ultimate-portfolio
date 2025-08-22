// Demo 4: Environment Mapping
import { initScene } from './threeUtils.js';

export function initDemo4() {
    const { renderer, scene, camera, resizeRendererToDisplaySize } = initScene('scene4', 'scene4-container');
    camera.position.z = 3;

    // Load environment map
    const envMapLoader = new THREE.CubeTextureLoader();
    const envMap = envMapLoader.setPath('https://threejs.org/examples/textures/cube/Bridge2/').load([
        'posx.jpg', 'negx.jpg',
        'posy.jpg', 'negy.jpg',
        'posz.jpg', 'negz.jpg'
    ]);
    scene.environment = envMap;
    scene.background = envMap;

    // Geometry types
    const geometries = {
        sphere: new THREE.SphereGeometry(1, 32, 32),
        box: new THREE.BoxGeometry(1.5, 1.5, 1.5),
        torus: new THREE.TorusKnotGeometry(0.8, 0.3, 128, 32)
    };

    // Create PBR material
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xaaaaaa,
        metalness: 0.9,
        roughness: 0.05,
        clearcoat: 0.5,
        clearcoatRoughness: 0.05,
        transmission: 0,
        transparent: false,
        opacity: 1.0,
        envMap: envMap,
        envMapIntensity: 1
    });

    let currentMesh = new THREE.Mesh(geometries.sphere, material);
    scene.add(currentMesh);

    // Load HDR environment for better reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const gui = new lil.GUI({ container: document.getElementById('scene4-container') });
    const params = {
        shape: 'sphere',
        metalness: material.metalness,
        roughness: material.roughness,
        transmission: material.transmission,
        clearcoat: material.clearcoat,
        thickness: 1.0,
        environment: 'Bridge2'
    };

    const textures = {
        'Bridge2': 'https://threejs.org/examples/textures/cube/Bridge2/',
        'Sky': 'https://threejs.org/examples/textures/cube/Sky/',
        'SwedishRoyalCastle': 'https://threejs.org/examples/textures/cube/SwedishRoyalCastle/'
    };

    function setEnvironment(envName) {
        const path = textures[envName];
        const loader = new THREE.CubeTextureLoader();
        const envMap = loader.setPath(path).load([
            'posx.jpg', 'negx.jpg',
            'posy.jpg', 'negy.jpg',
            'posz.jpg', 'negz.jpg'
        ], (texture) => {
            pmremGenerator.fromCubemap(texture).then((generated) => {
                scene.environment = generated.texture;
                generated.dispose();
            });
            scene.background = texture;
        });
    }

    gui.add(params, 'shape', Object.keys(geometries)).name('Shape').onChange(shape => {
        scene.remove(currentMesh);
        currentMesh = new THREE.Mesh(geometries[shape], material);
        scene.add(currentMesh);
    });
    gui.add(params, 'environment', Object.keys(textures)).name('Environment').onChange(setEnvironment);

    // Directly control material properties
    gui.add(material, 'metalness', 0, 1).name('Metalness');
    gui.add(material, 'roughness', 0, 1).name('Roughness');
    gui.add(material, 'transmission', 0, 1).name('Transmission').onChange(val => {
        material.transparent = val > 0;
        material.needsUpdate = true;
    });
    gui.add(material, 'clearcoat', 0, 1).name('Clearcoat');
    gui.add(material, 'thickness', 0, 5).name('Thickness (Glass)');

    function animate() {
        resizeRendererToDisplaySize();
        currentMesh.rotation.y += 0.002;
        currentMesh.rotation.x += 0.002;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();
}