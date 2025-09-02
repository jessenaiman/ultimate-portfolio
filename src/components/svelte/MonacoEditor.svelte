<script>
  import { onMount } from 'svelte';
  import * as monaco from 'monaco-editor';

  export let language = "javascript";
  export let code = "// Type your code here";
  export let onChange = (newCode) => {};

  let editorContainer;
  let editor;
  let previewContainer;
  let isDragging = false;
  let startX;
  let startWidth;

  const startResize = (e) => {
    isDragging = true;
    startX = e.clientX;
    startWidth = editorContainer.offsetWidth;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

  const handleResize = (e) => {
    if (isDragging) {
      const delta = e.clientX - startX;
      const newWidth = startWidth + delta;
      editorContainer.style.width = `${newWidth}px`;
      if (editor) editor.layout();
    }
  };

  const stopResize = () => {
    isDragging = false;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

  onMount(() => {
    if (editorContainer) {
      editor = monaco.editor.create(editorContainer, {
        value: code,
        language: language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
          enabled: false
        }
      });

      editor.onDidChangeModelContent(() => {
        const newCode = editor.getValue();
        onChange(newCode);
        // Update preview here based on language
        previewContainer.innerHTML = `<pre>${newCode}</pre>`;
      });
    }

    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  });
</script>

<div class="split-container">
  <div 
    bind:this={editorContainer} 
    class="editor-container"
  ></div>
  
  <div 
    class="resize-handle"
    on:mousedown={startResize}
    role="separator"
    aria-orientation="vertical"
    tabindex="0"
  ></div>
  
  <div 
    bind:this={previewContainer} 
    class="preview-container"
  ></div>
</div>

<style>
  .split-container {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 500px;
    position: relative;
  }

  .editor-container {
    width: 50%;
    height: 100%;
    min-width: 200px;
  }

  .preview-container {
    flex: 1;
    height: 100%;
    background: #1e1e1e;
    color: #fff;
    padding: 1rem;
    overflow: auto;
  }

  .resize-handle {
    width: 4px;
    height: 100%;
    background: #333;
    cursor: col-resize;
    transition: background 0.2s;
  }

  .resize-handle:hover {
    background: #666;
  }
</style>