import React, { useState } from 'react';
import { usePollinationsImage } from '@pollinations/react';

const PollinateImage: React.FC = () => {
  const [formState, setFormState] = useState({
    prompt: 'A futuristic city with flying cars and neon lights',
    model: 'flux',
    seed: 42,
    width: 1024,
    height: 1024
  });

  const [shouldGenerate, setShouldGenerate] = useState(false);

  const imageUrl = usePollinationsImage(
    shouldGenerate ? formState.prompt : '',
    shouldGenerate ? {
      width: formState.width,
      height: formState.height,
      seed: formState.seed,
      model: formState.model,
      nologo: true
    } : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShouldGenerate(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: name === 'seed' || name === 'width' || name === 'height' 
        ? parseInt(value, 10) 
        : value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Image Generation</h2>
        <p className="text-gray-400 mb-4">Generate images using Pollinations' API</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Prompt</label>
            <textarea
              name="prompt"
              value={formState.prompt}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Model</label>
              <select
                name="model"
                value={formState.model}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              >
                <option value="flux">flux</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Seed</label>
              <input
                type="number"
                name="seed"
                value={formState.seed}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Width</label>
              <input
                type="number"
                name="width"
                value={formState.width}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Height</label>
              <input
                type="number"
                name="height"
                value={formState.height}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Changes
          </button>
        </form>
      </div>

      {shouldGenerate && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-white mb-4">Generated Image:</h3>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated image"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-400">Loading...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PollinateImage;