import { createSignal } from 'solid-js';

const Features = () => {
  const [activeTab, setActiveTab] = createSignal(0);

  const tabs = [
    {
      title: 'Default Example',
      content: `
        <div class="max-w-md mx-auto p-4">
          <header class="text-center mb-4">
            <h1 class="text-2xl font-bold">Welcome to Coding!</h1>
            <p class="opacity-70 text-sm">Edit this code to see live changes</p>
          </header>

          <div class="card bg-base-200 p-4 mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span class="text-primary-content text-lg">🚀</span>
              </div>
              <div>
                <h2 class="text-lg font-semibold">Interactive Demo</h2>
                <p class="opacity-70 text-sm">Try editing this code!</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 mb-4">
            <div class="flex items-center text-success text-sm">
              <span class="mr-1">✓</span> Responsive
            </div>
            <div class="flex items-center text-success text-sm">
              <span class="mr-1">✓</span> Modern UI
            </div>
            <div class="flex items-center text-success text-sm">
              <span class="mr-1">✓</span> Live Preview
            </div>
            <div class="flex items-center text-success text-sm">
              <span class="mr-1">✓</span> Easy to Edit
            </div>
          </div>

          <button class="w-full py-2 px-4 bg-primary text-primary-content rounded-lg hover:opacity-90 transition-opacity">
            Click Me!
          </button>
        </div>
      `,
    },
    {
      title: 'Counter Example',
      content: `
        <div class="max-w-md mx-auto p-4">
          <div class="text-center mb-4">
            <h2 class="text-2xl font-bold">Interactive Counter</h2>
            <p class="opacity-70 text-sm">Watch the number bounce!</p>
          </div>
          
          <div class="bg-base-200 rounded-xl p-6 relative overflow-hidden">
            <div class="relative">
              <div class="flex justify-center mb-6">
                <div class="text-5xl font-bold">0</div>
              </div>
              <div class="flex justify-center items-center space-x-4">
                <button class="btn btn-primary">-</button>
                <button class="btn btn-primary">+</button>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      title: 'Color Palette',
      content: `
        <div class="text-center space-y-4">
          <h2 class="text-2xl">Interactive Color Palette</h2>
          <div class="grid grid-cols-5 gap-3">
            <button class="p-8 rounded-lg" style="background: #00DC82"></button>
            <button class="p-8 rounded-lg" style="background: #36E4DA"></button>
            <button class="p-8 rounded-lg" style="background: #4C7AF0"></button>
            <button class="p-8 rounded-lg" style="background: #FF5D01"></button>
            <button class="p-8 rounded-lg" style="background: #FF3E00"></button>
          </div>
        </div>
      `,
    },
  ];

  return (
    <div role="tablist" class="tabs tabs-lifted">
      {tabs.map((tab, index) => (
        <>
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            class="tab"
            aria-label={tab.title}
            checked={activeTab() === index}
            onChange={() => setActiveTab(index)}
          />
          <div
            role="tabpanel"
            class="tab-content bg-base-100 border-base-300 rounded-box p-6"
            innerHTML={tab.content}
          ></div>
        </>
      ))}
    </div>
  );
};

export default Features;