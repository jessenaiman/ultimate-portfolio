import { createSignal, onMount } from 'solid-js';

const Hero = () => {
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    setTimeout(() => setIsVisible(true), 100);
  });

  return (
    <section class={`relative flex items-center justify-center p-8 transition-all duration-700 transform ${isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div class={`container mx-auto grid md:grid-cols-2 gap-12 items-center transition-all duration-700 delay-200 transform ${isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Left Column - Text Content */}
        <div class={`space-y-8 transition-all duration-700 delay-300 transform ${isVisible() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div class="space-y-6">
            <h1 class="text-5xl font-bold leading-tight">
              <span class="text-white">Build with</span>{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#4F87C7] to-[#2B5C9B]">
                Solid.js
              </span>{" "}
              <span class="text-white">+</span>{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Astro
              </span>
            </h1>
            <p class="text-xl text-gray-300 leading-relaxed">
              Experience the perfect blend of Solid.js reactivity and Astro's static-first approach.
              Build blazing-fast websites with the finest granular reactivity system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
