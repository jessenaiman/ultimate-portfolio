import React, { useState } from 'react'
import { usePollinationsImage } from '@pollinations/react'
import { Highlight, themes } from 'prism-react-renderer'
import { useFetchModels } from '../../helpers/useFetchModels'

export default function ImageGenerationForm() {
  const { imageModels } = useFetchModels()
  const [selectedImageModel, setSelectedImageModel] = useState<string>(imageModels[0] || 'flux')
  const [imagePrompt, setImagePrompt] = useState("A futuristic city with flying cars and neon lights")
  const [imageSeed, setImageSeed] = useState<number>(42)
  const [imageWidth, setImageWidth] = useState<number>(1024)
  const [imageHeight, setImageHeight] = useState<number>(1024)
  
  const [activePrompt, setActivePrompt] = useState(imagePrompt)
  const [activeSettings, setActiveSettings] = useState({
    width: imageWidth,
    height: imageHeight,
    seed: imageSeed,
    model: selectedImageModel,
    nologo: true
  })

  const imageUrl = usePollinationsImage(activePrompt, activeSettings)

  const handleApplyChanges = () => {
    setActivePrompt(imagePrompt)
    setActiveSettings({
      width: imageWidth,
      height: imageHeight,
      seed: imageSeed,
      model: selectedImageModel,
      nologo: true
    })
  }

  const getImageCode = (): string => {
    return `
import React from 'react';
import { usePollinationsImage } from '@pollinations/react';

const ImageComponent = () => {
  const imageUrl = usePollinationsImage("${imagePrompt}", {
    width: ${imageWidth},
    height: ${imageHeight},
    seed: ${imageSeed},
    model: '${selectedImageModel}',
    nologo: true
  });

  return (
    <div>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="Generated image" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ImageComponent;
    `
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => console.log('Code copied to clipboard'))
      .catch(err => console.error('Failed to copy code: ', err))
  }

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">Image Generation</h2>
        <p className="opacity-70">Generate images using Pollinations' API</p>
        
        <div className="grid gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Model</span>
            </label>
            <select 
              className="select select-bordered w-full" 
              value={selectedImageModel}
              onChange={(e) => setSelectedImageModel(e.target.value)}
            >
              {imageModels.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Prompt</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Enter your image prompt here..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Width</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={imageWidth}
                onChange={(e) => setImageWidth(Number(e.target.value))}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Height</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={imageHeight}
                onChange={(e) => setImageHeight(Number(e.target.value))}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Seed</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={imageSeed}
                onChange={(e) => setImageSeed(Number(e.target.value))}
              />
            </div>
          </div>

          <button 
            className="btn btn-primary w-full"
            onClick={handleApplyChanges}
          >
            Generate Image
          </button>

          <div className="mt-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated image"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-base-200 rounded-lg">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </div>

          <div className="relative mt-4">
            <button
              className="btn btn-square btn-sm absolute right-2 top-2"
              onClick={() => copyToClipboard(getImageCode())}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <Highlight theme={themes.vsDark} code={getImageCode()} language="typescript">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ margin: 0, borderRadius: '0.5rem', ...style }}>
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
      </div>
    </div>
  )
}