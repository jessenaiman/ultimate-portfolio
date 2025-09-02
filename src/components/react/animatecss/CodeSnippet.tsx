import React, { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyIcon, CheckIcon } from './Icons';

interface CodeSnippetProps {
  animationName: string;
  animatedText: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ animationName, animatedText }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const codeString = `<h1 class="animate__animated animate__${animationName}">${animatedText}</h1>`;

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [codeString]);

  return (
    <div className="relative mt-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-gray-700 rounded-md text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
        aria-label="Copy code"
      >
        {isCopied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
      </button>
      <SyntaxHighlighter language="jsx" style={atomDark} customStyle={{ borderRadius: '0.5rem', margin: 0, padding: '1rem' }}>
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;