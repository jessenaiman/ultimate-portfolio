import React, { useState, useEffect } from 'react';
import { usePollinationsImage } from '@pollinations/react';
import { useFetchModels } from '../../../helpers/useFetchModels';
import Highlight from 'react-highlight';
import themes from 'react-syntax-highlighter/dist/esm/styles/hljs/vs2015';

const ImageInterface = ({ model, prompt, width, height, seed, nologo, enhance }: {
  model: string;
  prompt: string;
  width: number;
  height: number;
  seed: number;
  nologo: boolean;
  enhance: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const imageUrl = usePollinationsImage(prompt, {
    width,
    height,
    seed,
    model,
    nologo,
    enhance
  });

  const getImageCode = () => `
import React, { useState } from 'react';
import { usePollinationsImage } from '@pollinations/react';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("${prompt}");
  const [width, setWidth] = useState(${width});
  const [height, setHeight] = useState(${height});
  const [seed, setSeed] = useState(${seed});
  const [nologo, setNologo] = useState(${nologo});
  const [enhance, setEnhance] = useState(${enhance});

  const imageUrl = usePollinationsImage(prompt, {
    width,
    height,
    seed,
    model: "${model}",
    nologo,
    enhance
  });

  return (
    <div>
      <textarea 
        value={prompt} 
        onChange={e => setPrompt(e.target.value)} 
        rows={4} 
        style={{ width: '100%' }}
      />
      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Generated image" 
          style={{ maxWidth: '100%', height: 'auto' }} 
        />
      )}
    </div>
  );
};

export default ImageGenerator;
  `;

  return (
    <div className="space-y-4">
      <div className="mockup-window border bg-base-300">
        <div className="p-4 bg-base-200">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Generated image" 
              className="w-full h-auto rounded-lg"
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-base-300 rounded-lg">
              <span className="text-base-content opacity-50">Image will appear here...</span>
            </div>
          )}
        </div>
      </div>
      <div className="relative">
        <button
          className="btn btn-sm btn-square absolute top-2 right-2"
          onClick={() => {
            navigator.clipboard.writeText(getImageCode());
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }}
        >
          {isCopied ? '✅' : '📋'}
        </button>
        <Highlight theme={themes.vsDark} code={getImageCode()} language="tsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{...style, margin: 0, borderRadius: '0.5rem'}}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default function ImageGenerationForm() {
  const { imageModels, isLoading } = useFetchModels();
  const [prompt, setPrompt] = useState('A beautiful sunset over the ocean');
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [seed, setSeed] = useState(42);
  const [selectedImageModel, setSelectedImageModel] = useState<string | null>(null);
  const [nologo, setNologo] = useState(true);
  const [enhance, setEnhance] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  useEffect(() => {
    if (imageModels.length > 0 && !selectedImageModel) {
      setSelectedImageModel(imageModels[0]);
    }
  }, [imageModels, selectedImageModel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImageModel) return;
    setGeneratedPrompt(prompt);
  };

  if (isLoading || !selectedImageModel) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="form-control">
        <label className="label"><span className="label-text">Model</span></label>
        <select 
          className="select select-bordered w-full" 
          value={selectedImageModel || ''}
          onChange={e => setSelectedImageModel(e.target.value)}
        >
          {imageModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label className="label"><span className="label-text">Prompt</span></label>
        <textarea 
          className="textarea textarea-bordered h-24" 
          value={prompt} 
          onChange={e => setPrompt(e.target.value)} 
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="form-control">
          <label className="label"><span className="label-text">Width</span></label>
          <input 
            type="number" 
            className="input input-bordered"
            value={width}
            onChange={e => setWidth(Number(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Height</span></label>
          <input 
            type="number" 
            className="input input-bordered"
            value={height}
            onChange={e => setHeight(Number(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Seed</span></label>
          <input 
            type="number" 
            className="input input-bordered"
            value={seed}
            onChange={e => setSeed(Number(e.target.value))}
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">No Logo</span></label>
          <input 
            type="checkbox" 
            className="checkbox checkbox-primary"
            checked={nologo}
            onChange={e => setNologo(e.target.checked)}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>Generate Image</button>
      {generatedPrompt && (
        <ImageInterface 
          model={selectedImageModel} 
          prompt={generatedPrompt} 
          width={width} 
          height={height} 
          seed={seed} 
          nologo={nologo} 
          enhance={enhance} 
        />
      )}
    </div>
  );
}