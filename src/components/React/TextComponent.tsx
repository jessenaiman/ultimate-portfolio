
import React from 'react';
import { usePollinationsText } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';

const TextComponent = () => {
  const text = usePollinationsText("Write a haiku about artificial intelligence", { 
    seed: 42,
    model: 'openai',
    systemPrompt: "You are a helpful AI assistant."
  });
  
  return (
    <div>
      {text ? <ReactMarkdown>{text}</ReactMarkdown> : <p>Loading...</p>}
    </div>
  );
};

export default TextComponent;
    