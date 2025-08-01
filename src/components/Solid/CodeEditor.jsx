import { createSignal, createEffect, onMount } from 'solid-js';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';

// Default code templates
const defaultCode = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #4F46E5;
    }
  </style>
</head>
<body>
  <h1>Welcome to My Page</h1>
  <p>Edit this code to see live changes!</p>
  
  <script>
    // Your JavaScript code here
    console.log('Hello from the editor!');
  </script>
</body>
</html>`,
  css: `/* Add your CSS here */
body {
  background-color: #f8fafc;
  color: #1e293b;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

button {
  background-color: #4F46E5;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #4338CA;
}`,
  js: `// JavaScript code goes here
function greet(name = 'World') {
  console.log(\`Hello, \${name}!\`);
  return \`Hello, \${name}!\`;
}

// Example usage
greet('Developer');

// Add event listeners or other functionality here
document.addEventListener('DOMContentLoaded', () => {
  console.log('Document is ready!');
});

// ES6+ features work too
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`
};

export default function CodeEditor() {
  const [activeTab, setActiveTab] = createSignal('html');
  const [code, setCode] = createSignal({
    html: defaultCode.html,
    css: defaultCode.css,
    js: defaultCode.js
  });
  
  const [srcDoc, setSrcDoc] = createSignal('');
  const [isPreview, setIsPreview] = createSignal(true);
  let editorRef;
  let editorView;

  // Update the preview whenever code changes
  createEffect(() => {
    const { html, css, js } = code();
    setSrcDoc(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}
        <script>${js}</script>
      </body>
      </html>
    `);
  });

  // Initialize CodeMirror editor
  onMount(() => {
    const updateCode = (value) => {
      setCode(prev => ({
        ...prev,
        [activeTab()]: value
      }));
    };

    const extensions = [
      basicSetup,
      oneDark,
      activeTab() === 'html' ? html() :
      activeTab() === 'css' ? css() :
      javascript({ jsx: true, typescript: false }),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          updateCode(update.state.doc.toString());
        }
      })
    ];

    editorView = new EditorView({
      state: EditorState.create({
        doc: code()[activeTab()],
        extensions
      }),
      parent: editorRef
    });

    return () => editorView.destroy();
  });

  // Update editor when tab changes
  createEffect(() => {
    if (editorView) {
      const newState = EditorState.create({
        doc: code()[activeTab()],
        extensions: [
          basicSetup,
          oneDark,
          activeTab() === 'html' ? html() :
          activeTab() === 'css' ? css() :
          javascript({ jsx: true, typescript: false })
        ]
      });
      editorView.setState(newState);
    }
  });

  // Tab component
  const Tab = ({ id, label }) => (
    <button
      class={`tab tab-lifted ${activeTab() === id ? 'tab-active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </button>
  );

  // Toggle preview button
  const TogglePreview = () => (
    <button
      class="btn btn-sm btn-ghost absolute right-4 top-2 z-10"
      onClick={() => setIsPreview(!isPreview())}
      title={isPreview() ? 'Show Editor' : 'Show Preview'}
    >
      {isPreview() ? '✏️ Edit' : '👁️ Preview'}
    </button>
  );

  return (
    <div class="w-full h-full flex flex-col">
      <div class="tabs tabs-boxed bg-base-200 p-1 rounded-lg mb-4">
        <Tab id="html" label="HTML" />
        <Tab id="css" label="CSS" />
        <Tab id="js" label="JavaScript" />
        <div class="flex-1" />
        <TogglePreview />
      </div>
      
      <div class="flex-1 flex flex-col md:flex-row gap-4">
        <div class={`${isPreview() ? 'w-full md:w-1/2' : 'w-full'} h-full relative`}>
          <div ref={editorRef} class="h-full w-full rounded-lg overflow-hidden" />
        </div>
        
        {isPreview() && (
          <div class="w-full md:w-1/2 h-[400px] md:h-auto bg-base-100 rounded-lg overflow-hidden border border-base-300">
            <iframe
              srcDoc={srcDoc()}
              title="preview"
              sandbox="allow-scripts"
              class="w-full h-full border-0"
            />
          </div>
        )}
      </div>
      
      <div class="mt-4 text-xs text-base-content/60">
        <p>💡 Tip: Edit the code to see live changes in the preview!</p>
      </div>
    </div>
  );
}