import React, { useState } from 'react';
import { usePollinationsText, usePollinationsImage, usePollinationsChat } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';

const Pollinate: React.FC = () => {
  const [activeTab, setActiveTab] = useState('text');

  // Image Generation State
  const [imageState, setImageState] = useState({
    prompt: 'A futuristic city with flying cars and neon lights',
    model: 'flux',
    seed: 42,
    width: 1024,
    height: 1024
  });

  // Text Generation State
  const [textState, setTextState] = useState({
    prompt: 'Write a haiku about artificial intelligence',
    systemPrompt: 'You are a helpful AI assistant.',
    model: 'openai',
    seed: 42
  });

  // Chat State
  const [chatState, setChatState] = useState({
    systemMessage: 'You are a helpful AI assistant.',
    model: 'openai',
    seed: 42,
    messages: []
  });
  const [chatInput, setChatInput] = useState('');

  // Hook calls
  const imageUrl = usePollinationsImage(imageState.prompt, {
    width: imageState.width,
    height: imageState.height,
    seed: imageState.seed,
    model: imageState.model,
    nologo: true
  });

  const text = usePollinationsText(textState.prompt, {
    seed: textState.seed,
    model: textState.model,
    systemPrompt: textState.systemPrompt
  });

  const { sendUserMessage, messages } = usePollinationsChat([
    { role: 'system', content: chatState.systemMessage }
  ], {
    seed: chatState.seed,
    model: chatState.model
  });

  const handleImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImageState({ ...imageState });
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTextState({ ...textState });
  };

  const handleChatSend = () => {
    if (chatInput.trim()) {
      sendUserMessage(chatInput);
      setChatInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="border-b border-gray-700">
        <nav className="flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2 ${activeTab === 'text' ? 'bg-gray-800' : ''}`}
          >
            usePollinationsText
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-4 py-2 ${activeTab === 'image' ? 'bg-gray-800' : ''}`}
          >
            usePollinationsImage
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 ${activeTab === 'chat' ? 'bg-gray-800' : ''}`}
          >
            usePollinationsChat
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'image' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Image Generation</h2>
            <p className="text-gray-400 mb-4">Generate images using Pollinations' API</p>
            
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Prompt</label>
                <textarea
                  value={imageState.prompt}
                  onChange={(e) => setImageState({ ...imageState, prompt: e.target.value })}
                  className="w-full p-2 bg-gray-800 rounded"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Model</label>
                  <select
                    value={imageState.model}
                    onChange={(e) => setImageState({ ...imageState, model: e.target.value })}
                    className="w-full p-2 bg-gray-800 rounded"
                  >
                    <option value="flux">flux</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Seed</label>
                  <input
                    type="number"
                    value={imageState.seed}
                    onChange={(e) => setImageState({ ...imageState, seed: parseInt(e.target.value) })}
                    className="w-full p-2 bg-gray-800 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Width</label>
                  <input
                    type="number"
                    value={imageState.width}
                    onChange={(e) => setImageState({ ...imageState, width: parseInt(e.target.value) })}
                    className="w-full p-2 bg-gray-800 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Height</label>
                  <input
                    type="number"
                    value={imageState.height}
                    onChange={(e) => setImageState({ ...imageState, height: parseInt(e.target.value) })}
                    className="w-full p-2 bg-gray-800 rounded"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Apply Changes
              </button>
            </form>

            {imageUrl && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Generated Image:</h3>
                <img src={imageUrl} alt="Generated" className="rounded-lg" />
              </div>
            )}
          </div>
        )}

        {activeTab === 'text' && (
          <div>
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
                    <option value="openai">openai</option>
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

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Apply Changes
              </button>
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
        )}

        {activeTab === 'chat' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Chat</h2>
            <p className="text-gray-400 mb-4">Chat with Pollinations' AI</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">System Message</label>
                <textarea
                  value={chatState.systemMessage}
                  onChange={(e) => setChatState({ ...chatState, systemMessage: e.target.value })}
                  className="w-full p-2 bg-gray-800 rounded"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Model</label>
                  <select
                    value={chatState.model}
                    onChange={(e) => setChatState({ ...chatState, model: e.target.value })}
                    className="w-full p-2 bg-gray-800 rounded"
                  >
                    <option value="openai">openai</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">Seed</label>
                  <input
                    type="number"
                    value={chatState.seed}
                    onChange={(e) => setChatState({ ...chatState, seed: parseInt(e.target.value) })}
                    className="w-full p-2 bg-gray-800 rounded"
                  />
                </div>
              </div>

              <button
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => setChatState({ ...chatState })}
              >
                Apply Settings
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className="bg-gray-800 p-4 rounded">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 p-2 bg-gray-800 rounded"
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleChatSend()}
              />
              <button
                onClick={handleChatSend}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pollinate;
