import React, { useState, useEffect } from 'react';
import { usePollinationsChat } from '@pollinations/react';
import { Highlight, themes } from 'prism-react-renderer';

const ChatInterface = ({ model, systemMessage, seed }: { model: string; systemMessage: string; seed: number }) => {
  const [chatPrompt, setChatPrompt] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const { sendUserMessage, messages } = usePollinationsChat(
    [{ role: "system", content: systemMessage }],
    {
      seed: seed,
      model: model
    }
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatPrompt.trim()) {
      sendUserMessage(chatPrompt);
      setChatPrompt('');
    }
  };

  const getChatCode = (): string => {
    return `
import React, { useState } from 'react';
import { usePollinationsChat } from '@pollinations/react';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const { sendUserMessage, messages } = usePollinationsChat([
    { role: "system", content: "${systemMessage}" }
  ], { 
    seed: ${seed},
    model: '${model}'
  });

  const handleSend = () => {
    if (input.trim()) {
      sendUserMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={\`flex \${msg.role === 'user' ? 'justify-end' : 'justify-start'}\`}>
            <div className={\`max-w-[70%] p-3 rounded-lg \${
              msg.role === 'user' ? 'bg-primary text-primary-content' : 'bg-base-300'
            }\`}>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-4">
        <input
          type="text"
          className="input input-bordered flex-1 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
    `;
  };

  return (
    <div className="space-y-4">
      <div className="mockup-window border bg-base-300">
        <div className="flex flex-col p-4 bg-base-200 h-[500px]">
          <div className="flex-1 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}
              >
                <div className={`chat-bubble ${
                  msg.role === 'user' ? 'chat-bubble-primary' : ''
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              className="input input-bordered flex-1"
              value={chatPrompt}
              onChange={(e) => setChatPrompt(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="relative mt-4">
        <button
          className="btn btn-sm btn-square absolute top-2 right-2"
          onClick={() => {
            navigator.clipboard.writeText(getChatCode());
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
          }}
        >
          {isCopied ? '✅' : '📋'}
        </button>
        <Highlight theme={themes.vsDark} code={getChatCode()} language="tsx">
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

export default function ChatTab() {
  const [input, setInput] = useState('');
  const [systemMessage, setSystemMessage] = useState('You are a helpful assistant');
  const [seed, setSeed] = useState(42);
  const [model, setModel] = useState('mistral');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">System Message</span>
          </label>
          <input 
            type="text" 
            className="input input-bordered"
            value={systemMessage}
            onChange={(e) => setSystemMessage(e.target.value)}
            placeholder="You are a helpful assistant"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Model</span>
          </label>
          <select 
            className="select select-bordered"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="mistral">Mistral</option>
            <option value="openai">OpenAI</option>
            <option value="llama">Llama</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Seed</span>
          </label>
          <input 
            type="number" 
            className="input input-bordered"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
          />
        </div>
      </div>

      <ChatInterface model={model} systemMessage={systemMessage} seed={seed} />
    </div>
  );
}