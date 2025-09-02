import React, { useState } from 'react'
import { usePollinationsText } from '@pollinations/react'
import ReactMarkdown from 'react-markdown'
import { Highlight, themes } from 'prism-react-renderer'
import { useFetchModels } from '../../helpers/useFetchModels'

interface TextModel {
  name: string
  type: 'chat' | 'completion'
  censored: boolean
}

export default function TextGenerationForm() {
  const [textPrompt, setTextPrompt] = useState("Write a haiku about artificial intelligence")
  const [textSeed, setTextSeed] = useState<number>(42)
  const [selectedTextModel, setSelectedTextModel] = useState<string>('openai')
  const { textModels } = useFetchModels()
  const [systemPrompt, setSystemPrompt] = useState<string>("You are a helpful AI assistant.")

  const [activePrompt, setActivePrompt] = useState(textPrompt)
  const [activeSettings, setActiveSettings] = useState({
    seed: textSeed,
    model: selectedTextModel,
    systemPrompt
  })

  const textResult = usePollinationsText(activePrompt, activeSettings)

  const getTextCode = (): string => {
    return `
import React from 'react';
import { usePollinationsText } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';

const TextComponent = () => {
  const text = usePollinationsText("${textPrompt}", { 
    seed: ${textSeed},
    model: '${selectedTextModel}',
    systemPrompt: "${systemPrompt}"
  });
  
  return (
    <div>
      {text ? <ReactMarkdown>{text}</ReactMarkdown> : <p>Loading...</p>}
    </div>
  );
};

export default TextComponent;
    `
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => console.log('Code copied to clipboard'))
      .catch(err => console.error('Failed to copy code: ', err))
  }

  const handleApplyChanges = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setActivePrompt(textPrompt)
    setActiveSettings({
      seed: textSeed,
      model: selectedTextModel,
      systemPrompt
    })
  }

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h2 className="card-title">Text Generation</h2>
        <p className="opacity-70">Generate text using Pollinations' API</p>
        
        <div className="grid gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">System Prompt</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system prompt here..."
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Prompt</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              value={textPrompt}
              onChange={(e) => setTextPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Model</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={selectedTextModel}
                onChange={(e) => setSelectedTextModel(e.target.value)}
              >
                {textModels.map((model: TextModel) => (
                  <option key={model.name} value={model.name}>{model.name}</option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Seed</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={textSeed}
                onChange={(e) => setTextSeed(Number(e.target.value))}
              />
            </div>
          </div>

          <button 
            className="btn btn-primary w-full"
            onClick={handleApplyChanges}
          >
            Apply Changes
          </button>

          <div className="mt-4 prose max-w-none">
            {textResult ? (
              <ReactMarkdown>{textResult}</ReactMarkdown>
            ) : (
              <div className="w-full h-24 flex items-center justify-center bg-base-200 rounded-lg">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </div>

          <div className="relative mt-4">
            <button
              className="btn btn-square btn-sm absolute right-2 top-2"
              onClick={() => copyToClipboard(getTextCode())}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <Highlight theme={themes.vsDark} code={getTextCode()} language="typescript">
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
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