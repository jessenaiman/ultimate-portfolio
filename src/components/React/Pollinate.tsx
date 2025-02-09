import React, { useState, useEffect } from 'react';
import { usePollinationsText } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';

const Pollinate: React.FC = () => {
  const [textModels, setTextModels] = useState<string[]>(['openai']);

  // Text Generation State
  const [textState, setTextState] = useState({
    prompt: 'Write a haiku about artificial intelligence',
    systemPrompt: 'You are a helpful AI assistant.',
    model: 'openai',
    seed: 42
  });

  // Fetch available models on component mount
  useEffect(() => {
    console.log('Component mounted, fetching models...');

    const fetchWithCORS = async (url: string) => {
      try {
        const response = await fetch(url, {
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        return [];
      }
    };

    // Fetch text models
    fetchWithCORS('https://text.pollinations.ai/models')
      .then(data => {
        console.log('Text models data:', data);
        setTextModels(data.length ? data : ['openai']);
      });
  }, []);

  // Text generation
  const text = usePollinationsText(textState.prompt, {
    seed: textState.seed,
    model: textState.model,
    systemPrompt: textState.systemPrompt
  });

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-xl font-semibold mb-2">Text Generation</h2>
      <p className="text-gray-400 mb-4">Generate text using Pollinations' API</p>

      <form onSubmit={handleTextSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-2">System Prompt</label>
          <textarea
            value={textState.systemPrompt}
            onChange={(e) => setTextState({ ...textState, systemPrompt: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Prompt</label>
          <textarea
            value={textState.prompt}
            onChange={(e) => setTextState({ ...textState, prompt: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Model</label>
            <select
              value={textState.model}
              onChange={(e) => setTextState({ ...textState, model: e.target.value })}
              className="w-full p-2 bg-gray-800 rounded"
            >
              {textModels.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Seed</label>
            <input
              type="number"
              value={textState.seed}
              onChange={(e) => setTextState({ ...textState, seed: parseInt(e.target.value) })}
              className="w-full p-2 bg-gray-800 rounded"
            />
          </div>
        </div>
      </form>

      {text && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Generated Text:</h3>
          <div className="bg-gray-800 p-4 rounded">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pollinate;
