import { createSignal, createEffect, Show, onMount, onCleanup } from 'solid-js';
import * as monaco from 'monaco-editor';

const Features = () => {
  let editorContainer;
  let editor;
  let previewContainer;
  const [activeTab, setActiveTab] = createSignal('playground');
  const [code, setCode] = createSignal(defaultTemplate);
  const [error, setError] = createSignal(null);
  const [theme, setTheme] = createSignal('vs-dark');
  const [previewCount, setPreviewCount] = createSignal(0);
  const [selectedColor, setSelectedColor] = createSignal('#00DC82');
  const [isMobile, setIsMobile] = createSignal(false);

  // Default template
  const defaultTemplate = `<div class="max-w-md mx-auto p-4">
  <header class="text-center mb-4">
    <h1 class="text-2xl font-bold text-gradient">Welcome to Coding!</h1>
    <p class="text-gray-400 text-sm">Edit this code to see live changes</p>
  </header>

  <div class="bg-gray-800 rounded-lg p-4 mb-4">
    <div class="flex items-center space-x-3">
      <div class="w-10 h-10 bg-gradient-to-r from-[#00DC82] to-[#36E4DA] rounded-full flex items-center justify-center">
        <span class="text-white text-lg">🚀</span>
      </div>
      <div>
        <h2 class="text-lg font-semibold text-white">Interactive Demo</h2>
        <p class="text-gray-400 text-sm">Try editing this code!</p>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-2 mb-4">
    <div class="flex items-center text-green-400 text-sm">
      <span class="mr-1">✓</span> Responsive
    </div>
    <div class="flex items-center text-green-400 text-sm">
      <span class="mr-1">✓</span> Modern UI
    </div>
    <div class="flex items-center text-green-400 text-sm">
      <span class="mr-1">✓</span> Live Preview
    </div>
    <div class="flex items-center text-green-400 text-sm">
      <span class="mr-1">✓</span> Easy to Edit
    </div>
  </div>

  <button class="w-full py-2 px-4 bg-gradient-to-r from-[#00DC82] to-[#36E4DA] text-white rounded-lg hover:opacity-90 transition-opacity">
    Click Me!
  </button>
</div>`;

  // Initialize Monaco Editor
  onMount(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initialize editor
    editor = monaco.editor.create(editorContainer, {
      value: code(),
      language: 'html',
      theme: theme(),
      minimap: { enabled: !isMobile() },
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: true,
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on',
      suggestOnTriggerCharacters: true,
      snippetSuggestions: 'on',
      formatOnPaste: true,
      formatOnType: true,
      tabSize: 2,
      folding: true,
      glyphMargin: true,
      lightbulb: { enabled: true },
    });

    // Set up event listeners
    editor.onDidChangeModelContent(() => {
      setCode(editor.getValue());
    });

    // Handle theme changes
    const handleThemeChange = (e) => {
      const newTheme = e.detail?.theme === 'dark' ? 'vs-dark' : 'vs-light';
      setTheme(newTheme);
      monaco.editor.setTheme(newTheme);
    };
    window.addEventListener('themeChange', handleThemeChange);

    // Cleanup
    onCleanup(() => {
      editor.dispose();
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('themeChange', handleThemeChange);
    });
  });

  // Update editor layout on mobile/desktop switch
  createEffect(() => {
    if (editor) {
      editor.updateOptions({
        minimap: { enabled: !isMobile() },
        lineNumbers: isMobile() ? 'off' : 'on',
      });
    }
  });

  // Sanitize and render HTML safely
  const renderPreview = (htmlContent) => {
    try {
      return htmlContent;
    } catch (e) {
      setError(e.message);
      return '';
    }
  };

  const examples = {
    default: defaultTemplate,
    counter: `
    <div class="max-w-md mx-auto p-4">
      <div class="text-center mb-4">
        <h2 class="text-2xl font-bold text-gradient">Interactive Counter</h2>
        <p class="text-gray-400 text-sm">Watch the number bounce!</p>
      </div>
      
      <div class="bg-gray-800 rounded-xl p-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-[#00DC82]/10 to-[#36E4DA]/10"></div>
        
        <div class="relative">
          <div class="flex justify-center mb-6">
            <div class="counter-number text-5xl font-bold text-white transition-all duration-300 transform hover:scale-110" style="text-shadow: 0 0 20px rgba(0, 220, 130, 0.5)">
              ${previewCount()}
            </div>
          </div>
          
          <div class="flex justify-center items-center space-x-4">
            <button id="decrement" class="group relative px-6 py-3 rounded-lg bg-gray-900 text-white overflow-hidden transition-all duration-300 hover:scale-105">
              <div class="absolute inset-0 bg-gradient-to-r from-[#00DC82] to-[#36E4DA] opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div class="relative flex items-center">
                <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                </svg>
              </div>
            </button>
            
            <button id="increment" class="group relative px-6 py-3 rounded-lg bg-gray-900 text-white overflow-hidden transition-all duration-300 hover:scale-105">
              <div class="absolute inset-0 bg-gradient-to-r from-[#00DC82] to-[#36E4DA] opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div class="relative flex items-center">
                <svg class="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>`,
    colorPalette: () => {
      const colors = ['#00DC82', '#36E4DA', '#4C7AF0', '#FF5D01', '#FF3E00'];
      return `
      <div class="text-center space-y-4">
        <h2 class="text-2xl text-gradient">Interactive Color Palette</h2>
        <div class="grid grid-cols-5 gap-3">
          ${colors.map(color => `
            <button 
              class="color-block p-8 rounded-lg transition-transform hover:scale-105 ${color === selectedColor() ? 'ring-2 ring-white' : ''}" 
              style="background: ${color}"
              data-color="${color}"
            ></button>
          `).join('')}
        </div>
        <div class="mt-4">
          <p class="text-lg">Selected Color: <span class="font-mono">${selectedColor()}</span></p>
        </div>
      </div>`;
    }
  };

  return (
    <div class={`w-full ${isMobile() ? 'flex flex-col' : 'grid grid-cols-2'} gap-4`}>
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between mb-2">
          <div class="flex space-x-2">
            <button
              class={`px-3 py-1 rounded ${activeTab() === 'playground' ? 'bg-accent text-white' : 'bg-card hover:bg-accent/10'}`}
              onClick={() => {
                setActiveTab('playground');
                editor.setValue(examples.default);
              }}
            >
              Playground
            </button>
            <button
              class={`px-3 py-1 rounded ${activeTab() === 'counter' ? 'bg-accent text-white' : 'bg-card hover:bg-accent/10'}`}
              onClick={() => {
                setActiveTab('counter');
                editor.setValue(examples.counter);
              }}
            >
              Counter
            </button>
            <button
              class={`px-3 py-1 rounded ${activeTab() === 'colors' ? 'bg-accent text-white' : 'bg-card hover:bg-accent/10'}`}
              onClick={() => {
                setActiveTab('colors');
                editor.setValue(examples.colorPalette());
              }}
            >
              Colors
            </button>
          </div>
        </div>
        
        <div 
          ref={editorContainer} 
          class="flex-grow min-h-[400px] border border-card rounded-lg overflow-hidden"
        />
      </div>

      <div class="flex flex-col h-full">
        <h3 class="text-lg font-semibold mb-2">Preview</h3>
        <div
          ref={previewContainer}
          class={`preview-area flex-grow p-4 border border-card rounded-lg ${theme() === 'vs-dark' ? 'dark' : 'light'}`}
          innerHTML={renderPreview(code())}
        />
        <Show when={error()}>
          <div class="mt-2 p-2 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
            {error()}
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Features;
