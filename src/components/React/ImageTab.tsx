import React, { useState, useEffect } from 'react'
import { usePollinationsImage } from '@pollinations/react'
import { Highlight, themes } from 'prism-react-renderer'
import { useFetchModels } from '../../helpers/useFetchModels'


// Image Generation API (Default model: 'flux')
// Generate Image: GET https://image.pollinations.ai/prompt/{prompt}

// Params: prompt*, model, seed, width, height, nologo, private, enhance, safe
// Return: Image file
// List Models: GET https://image.pollinations.ai/models

interface ImageSettings {
  prompt: string;
  model: string;
  seed: number;
  width: number;
  height: number;
  nologo: boolean;
  private: boolean;
  enhance: boolean;
  safe: boolean;
}

export default function ImageGenerationForm() {
  const { imageModels } = useFetchModels()
  const [selectedImageModel, setSelectedImageModel] = useState<string>('flux')
  const [imagePrompt, setImagePrompt] = useState("A futuristic city with flying cars and neon lights")
  const [imageSeed, setImageSeed] = useState<number>(42)
  const [imageWidth, setImageWidth] = useState<number>(1024)
  const [imageHeight, setImageHeight] = useState<number>(1024)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  
  // Additional settings
  const [noLogo, setNoLogo] = useState<boolean>(true)
  const [isPrivate, setIsPrivate] = useState<boolean>(false)
  const [enhance, setEnhance] = useState<boolean>(false)
  const [safe, setSafe] = useState<boolean>(true)
  
  const [activePrompt, setActivePrompt] = useState(imagePrompt)
  const [activeSettings, setActiveSettings] = useState({
    width: imageWidth,
    height: imageHeight,
    seed: imageSeed,
    model: selectedImageModel,
    nologo: noLogo,
    private: isPrivate,
    enhance: enhance,
    safe: safe
  })

  useEffect(() => {
    if (imageModels.length > 0) {
      setSelectedImageModel(imageModels[0])
    }
  }, [imageModels])

  const imageUrl = usePollinationsImage(activePrompt, activeSettings)

  const handleApplyChanges = () => {
    setIsGenerating(true)
    setActivePrompt(imagePrompt)
    setActiveSettings({
      width: imageWidth,
      height: imageHeight,
      seed: imageSeed,
      model: selectedImageModel,
      nologo: noLogo,
      private: isPrivate,
      enhance: enhance,
      safe: false
    })
  }

  useEffect(() => {
    if (imageUrl) {
      setIsGenerating(false)
    }
  }, [imageUrl])

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
    nologo: ${noLogo},
    private: ${isPrivate},
    enhance: ${enhance},
    safe: ${safe}
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
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000) // Reset after 2 seconds
        console.log('Code copied to clipboard')
      })
      .catch(err => console.error('Failed to copy code: ', err))
  }

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body p-6 space-y-6">
        <div>
          <h2 className="card-title text-2xl font-bold mb-2">Image Generation</h2>
          <p className="text-base-content/70">Generate images using Pollinations' API</p>
        </div>
        
        <div className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Model</span>
            </label>
            <select 
              className="select select-bordered w-full bg-base-100" 
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
              <span className="label-text font-medium">Prompt</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 bg-base-100"
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              placeholder="Enter your image prompt here..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Width</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100"
                value={imageWidth}
                onChange={(e) => setImageWidth(Number(e.target.value))}
                min="64"
                max="2048"
                step="64"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Height</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100"
                value={imageHeight}
                onChange={(e) => setImageHeight(Number(e.target.value))}
                min="64"
                max="2048"
                step="64"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Seed</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100"
                value={imageSeed}
                onChange={(e) => setImageSeed(Number(e.target.value))}
                min="0"
                max="999999999"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-4">Remove Logo</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={noLogo}
                  onChange={(e) => setNoLogo(e.target.checked)}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-4">Private</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-4">Enhance</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={enhance}
                  onChange={(e) => setEnhance(e.target.checked)}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-4">Safe Mode</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={safe}
                  onChange={(e) => setSafe(e.target.checked)}
                />
              </label>
            </div>
          </div>

          <button 
            className={`btn btn-primary w-full ${isGenerating ? 'btn-disabled' : ''}`}
            onClick={handleApplyChanges}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="loading loading-spinner"></span>
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </button>

          <div className="mt-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated image"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-base-100 rounded-xl">
                <div className="flex flex-col items-center gap-2">
                  <span className="loading loading-spinner loading-lg"></span>
                  {isGenerating && <p className="text-sm opacity-70">Generating your image...</p>}
                </div>
              </div>
            )}
          </div>

          <div className="relative mt-8 bg-base-100 rounded-xl overflow-hidden">
            <button
              className={`btn btn-square btn-sm absolute right-3 top-3 bg-base-200/80 hover:bg-base-300 ${isCopied ? 'btn-success' : ''}`}
              onClick={() => copyToClipboard(getImageCode())}
              title={isCopied ? 'Copied!' : 'Copy code'}
            >
              {isCopied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
            <Highlight theme={themes.vsDark} code={getImageCode()} language="typescript">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} p-4`} style={{ margin: 0, ...style }}>
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