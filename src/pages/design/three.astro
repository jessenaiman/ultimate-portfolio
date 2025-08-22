---
import Layout from "../../layouts/Layout.astro";
import Demo1Geometry from "../../components/three/Demo1Geometry.astro";
import Demo2Shader from "../../components/three/Demo2Shader.astro";
import Demo3Particles from "../../components/three/Demo3Particles.astro";
import Demo4Environment from "../../components/three/Demo4Environment.astro";

// Page metadata
const title = "Three.js Showcase | Ultimate Portfolio";
const description = "Interactive 3D scenes built with three.js, featuring geometry, shaders, particles, and environment mapping.";
---

<Layout 
  title={title} 
  description={description} 
  maxWidth="container"
  variant="showcase"
>
  <!-- Hero Section -->
  <div slot="hero" class="hero min-h-[60vh] bg-gradient-to-br from-base-200 to-base-300">
    <div class="hero-content text-center">
      <div class="max-w-4xl">
        <h1 class="text-4xl md:text-6xl font-extrabold text-primary mb-6">three.js Showcase</h1>
        <p class="text-xl md:text-2xl text-base-content/80 mb-8">
          Interactive 3D experiences built with three.js. Explore geometry, shaders, particles, and environment mapping.
        </p>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container mx-auto px-4 py-12">
    <!-- Browser Mockup for Desktop Demos -->
    <div class="mockup-browser border border-base-300 w-full my-12">
      <div class="mockup-browser-toolbar">
        <div class="input">https://portfolio.omega-spiral.com/three-js</div>
      </div>
      <div class="bg-base-200 p-6">
        <h2 class="text-3xl font-bold mb-8 text-center">3D Demos</h2>
        
        <!-- Responsive Grid of Demos -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Demo 1: Geometry -->
          <div class="card bg-base-100 shadow-xl overflow-hidden">
            <div class="gui-container h-64 relative">
              <div id="demo1" class="three-canvas w-full h-full"></div>
            </div>
            <div class="card-body">
              <h3 class="card-title">3D Geometry</h3>
              <p>Explore various 3D primitives and their properties.</p>
            </div>
          </div>

          <!-- Demo 2: Shaders -->
          <div class="card bg-base-100 shadow-xl overflow-hidden">
            <div class="gui-container h-64 relative">
              <div id="demo2" class="three-canvas w-full h-full"></div>
            </div>
            <div class="card-body">
              <h3 class="card-title">GLSL Shaders</h3>
              <p>Custom shader materials with real-time controls.</p>
            </div>
          </div>

          <!-- Demo 3: Particles -->
          <div class="card bg-base-100 shadow-xl overflow-hidden">
            <div class="gui-container h-64 relative">
              <div id="demo3" class="three-canvas w-full h-full"></div>
            </div>
            <div class="card-body">
              <h3 class="card-title">Particle System</h3>
              <p>Interactive particle effects with physics.</p>
            </div>
          </div>

          <!-- Demo 4: Environment -->
          <div class="card bg-base-100 shadow-xl overflow-hidden">
            <div class="gui-container h-64 relative">
              <div id="demo4" class="three-canvas w-full h-full"></div>
            </div>
            <div class="card-body">
              <h3 class="card-title">Environment Mapping</h3>
              <p>Realistic lighting and reflections.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Preview Section -->
  <div class="container mx-auto px-4 py-12">
    <h2 class="text-3xl font-bold text-center mb-8">Mobile Experience</h2>
    <div class="flex flex-col md:flex-row justify-center items-center gap-12">
      <div class="mockup-phone border-primary">
        <div class="camera"></div>
        <div class="display">
          <div class="artboard artboard-demo phone-1 bg-base-100 p-4">
            <h3 class="text-lg font-semibold mb-2">3D on Mobile</h3>
            <p class="text-sm">Optimized for touch interactions and performance.</p>
          </div>
        </div>
      </div>
      <div class="prose max-w-md">
        <h3>Touch & Gesture Support</h3>
        <p>All demos include touch controls for mobile devices, with optimized performance for smooth 3D rendering on all screen sizes.</p>
        <ul class="list-disc pl-6 mt-4">
          <li>Pinch to zoom</li>
          <li>Pan to rotate</li>
          <li>Tap to interact</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Three.js Scripts -->
  <script is:inline>
    // Load Three.js and dependencies
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // Initialize demos after dependencies are loaded
    const initDemos = async () => {
      try {
        // Load Three.js
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        await loadScript('https://cdn.jsdelivr.net/npm/lil-gui@0.19');
        
        // Import and initialize demos
        const [{ vertexShader, fragmentShader }, utils, demo1, demo2, demo3, demo4] = await Promise.all([
          import('/scripts/vertexShader.js'),
          import('/scripts/threeUtils.js'),
          import('/scripts/threeDemo1.js'),
          import('/scripts/threeDemo2.js'),
          import('/scripts/threeDemo3.js'),
          import('/scripts/threeDemo4.js')
        ]);

        // Initialize demos with proper error handling
        try {
          demo1.initDemo1();
          demo2.initDemo2(vertexShader, fragmentShader);
          demo3.initDemo3();
          demo4.initDemo4();
        } catch (error) {
          console.error('Error initializing demos:', error);
        }

        // Handle window resize
        const handleResize = () => {
          const canvases = document.querySelectorAll('.three-canvas');
          canvases.forEach(canvas => {
            const container = canvas.parentElement;
            if (container) {
              const width = container.clientWidth;
              const height = container.clientHeight;
              if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
                // Notify Three.js about the resize
                window.dispatchEvent(new Event('resize'));
              }
            }
          });
        };

        // Initial resize
        handleResize();
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(handleResize, 100);
        });

      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    // Start initialization when DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDemos);
    } else {
      initDemos();
    }
  </script>

  <!-- Custom Styles -->
  <style>
    .three-canvas {
      width: 100%;
      height: 100%;
      display: block;
      background: #1a1a1a;
    }
    
    .gui-container {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
      overflow: hidden;
      background: #1a1a1a;
    }
    
    .lil-gui.root {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10;
      --width: 300px;
      --title-background: oklch(0.3 0 0 / 0.8);
      --background: oklch(0.2 0 0 / 0.8);
      --text-color: #ffffff;
      --title-text-color: #ffffff;
      --widget-color: oklch(0.6 0 0);
      --hover-color: oklch(0.7 0 0);
      --focus-color: oklch(0.8 0 0);
      --number-color: #4ade80;
      --string-color: #60a5fa;
    }
    
    @media (max-width: 768px) {
      .lil-gui.root {
        --width: 250px;
      }
    }
    
    /* Smooth animations */
    .card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }
  </style>
</Layout>
