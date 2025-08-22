// Utility functions for three.js demos

// General Scene Initializer
export function initScene(canvasId, containerId) {
    const container = document.getElementById(containerId);
    const canvas = document.querySelector(`#${canvasId}`);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 2000);

    // Fullscreen button
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1v4m0 0h-4m4 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5 5" /></svg>`;
    fullscreenBtn.className = 'btn btn-ghost btn-circle fullscreen-btn';
    fullscreenBtn.onclick = () => {
        if (!document.fullscreenElement) {
            container.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };
    container.appendChild(fullscreenBtn);
    
    const resizeRendererToDisplaySize = () => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
        return needResize;
    };

    return { renderer, scene, camera, resizeRendererToDisplaySize };
}
