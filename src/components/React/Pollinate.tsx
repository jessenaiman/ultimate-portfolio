import React, { useState } from 'react';

const APITester = () => {
  const [activeTab, setActiveTab] = useState('generateImage');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // API endpoints
  const apiEndpoints = {
    generateImage: `https://image.pollinations.ai/prompt/${inputValue}`,
    listImageModels: 'https://image.pollinations.ai/models',
    generateTextGet: `https://text.pollinations.ai/${inputValue}`,
    generateTextPost: 'https://text.pollinations.ai/',
    openaiCompatible: 'https://text.pollinations.ai/openai',
    listTextModels: 'https://text.pollinations.ai/models',
    imageFeed: 'https://image.pollinations.ai/feed',
    textFeed: 'https://text.pollinations.ai/feed',
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setInputValue('');
    setResult(null);
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      let response;
      if (activeTab === 'generateTextPost' || activeTab === 'openaiCompatible') {
        // POST requests
        response = await fetch(apiEndpoints[activeTab], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: inputValue }),
        });
      } else {
        // GET requests
        response = await fetch(apiEndpoints[activeTab]);
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="tabs tabs-boxed mb-4">
        {Object.keys(apiEndpoints).map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'tab-active' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>

      {/* Description and Instructions */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}
        </h2>
        <p className="text-sm text-gray-500">
          {getTabDescription(activeTab)}
        </p>
      </div>

      {/* Input and Submit Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your input here"
          className="input input-bordered w-full"
          disabled={['listImageModels', 'listTextModels', 'imageFeed', 'textFeed'].includes(activeTab)}
        />
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={!inputValue && !['listImageModels', 'listTextModels', 'imageFeed', 'textFeed'].includes(activeTab)}
        >
          Submit
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-base-200 p-4 rounded-lg">
          <h3 className="text-lg font-bold">Result:</h3>
          <pre className="overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to provide descriptions for each tab
const getTabDescription = (tab) => {
  switch (tab) {
    case 'generateImage':
      return 'Generates an image based on the provided prompt.';
    case 'listImageModels':
      return 'Lists all available image generation models.';
    case 'generateTextGet':
      return 'Generates text using a GET request with the provided prompt.';
    case 'generateTextPost':
      return 'Generates text using a POST request with the provided prompt.';
    case 'openaiCompatible':
      return 'Uses an OpenAI-compatible endpoint to generate text.';
    case 'listTextModels':
      return 'Lists all available text generation models.';
    case 'imageFeed':
      return 'Provides a real-time feed of generated images.';
    case 'textFeed':
      return 'Provides a real-time feed of generated text.';
    default:
      return 'Select a tab to view its description.';
  }
};

export default APITester;