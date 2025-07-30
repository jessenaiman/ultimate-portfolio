import React, { useState, useEffect } from 'react';
import { usePollinationsText } from '@pollinations/react';
import { Highlight, themes } from 'prism-react-renderer';
import { useFetchModels } from '../../../helpers/useFetchModels';

interface TextModel {
  name: string;
  type: 'chat' | 'completion';
  censored: boolean;
}

const TextInterface = ({ model, systemPrompt, seed, prompt }: { model: string; systemPrompt: string; seed: number; prompt: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const textResult = usePollinationsText(
    prompt, 
    {
      seed: seed,
      model: model,
      systemPrompt
    }
  );

  const getCode = () => `
import React, { useState } from 'react';
import { usePollinationsText } from '@pollinations/react';

const TextGenerator = () => {
  const [prompt, setPrompt] = useState("${prompt}");
  const textResult = usePollinationsText(prompt, {
    model: "${model}",
    seed: ${seed},
    systemPrompt: "${systemPrompt}"
  });

  return (
    <div>
      <textarea 
        value={prompt} 
        onChange={e => setPrompt(e.target.value)} 
        rows={4} 
        style={{ width: '100%' }}
      />
      <pre>{textResult}</pre>
    </div>
  );
};

export default TextGenerator;
  `;

  return (
    <div className="space-y-4">
      <div className="mockup-window border bg-base-300">
        <div className="p-4 bg-base-200">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {textResult || "Generated text will appear here..."}
          </pre>
        </div>
      </div>
      <div className="relative">
        <button
          className="btn btn-sm btn-square absolute top-2 right-2"
          onClick={() => {
            navigator.clipboard.writeText(getCode());
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }}
        >
          {isCopied ? '✅' : '📋'}
        </button>
        <Highlight theme={themes.vsDark} code={getCode()} language="tsx">
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

export default function TextGenerationForm() {
  const { textModels, isLoading } = useFetchModels();
  const [textPrompt, setTextPrompt] = useState("Write a haiku about artificial intelligence");
  const [textSeed, setTextSeed] = useState<number>(42);
  const [selectedTextModel, setSelectedTextModel] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<string>("You are a helpful AI assistant.");
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  useEffect(() => {
    if (textModels.length > 0 && !selectedTextModel) {
      setSelectedTextModel(textModels[0].name);
    }
  }, [textModels, selectedTextModel]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTextModel) return;
    setGeneratedPrompt(textPrompt);
  };

  if (isLoading || !selectedTextModel) {
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
          value={selectedTextModel || ''}
          onChange={e => setSelectedTextModel(e.target.value)}
        >
          {textModels.map(model => (
            <option key={model.name} value={model.name}>{model.name}</option>
          ))}
        </select>
      </div>
      <div className="form-control">
        <label className="label"><span className="label-text">Prompt</span></label>
        <textarea 
          className="textarea textarea-bordered h-24" 
          value={textPrompt} 
          onChange={e => setTextPrompt(e.target.value)} 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label"><span className="label-text">System Prompt</span></label>
          <input 
            type="text" 
            className="input input-bordered" 
            value={systemPrompt} 
            onChange={e => setSystemPrompt(e.target.value)} 
          />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Seed</span></label>
          <input 
            type="number" 
            className="input input-bordered" 
            value={textSeed} 
            onChange={e => setTextSeed(Number(e.target.value))} 
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full" onClick={handleSubmit}>Generate Text</button>
      {generatedPrompt && <TextInterface model={selectedTextModel} systemPrompt={systemPrompt} seed={textSeed} prompt={generatedPrompt} />}
    </div>
  );
}