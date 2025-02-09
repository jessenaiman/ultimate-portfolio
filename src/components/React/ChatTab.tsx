import React, { useState } from 'react'
import { usePollinationsChat } from '@pollinations/react'
import ReactMarkdown from 'react-markdown'
import { Highlight, themes } from 'prism-react-renderer'
import { useFetchModels } from '../../helpers/useFetchModels'

export default function ChatComponent() {
  const { textModels } = useFetchModels()
  const [selectedTextModel, setSelectedTextModel] = useState<string>(textModels[0]?.name || 'openai')
  const [chatPrompt, setChatPrompt] = useState("")
  const [systemMessage, setSystemMessage] = useState<string>("You are a helpful AI assistant.")
  const [chatSeed, setChatSeed] = useState<number>(42)
  const [chatModel, setChatModel] = useState<string>(selectedTextModel)

  const { sendUserMessage, messages } = usePollinationsChat(
    [{ role: "system", content: systemMessage }], 
    {
      seed: chatSeed,
      model: chatModel
    }
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatPrompt.trim()) {
      sendUserMessage(chatPrompt)
      setChatPrompt('')
    }
  }

  const getChatCode = (): string => {
    return `
import React, { useState } from 'react';
import { usePollinationsChat } from '@pollinations/react';
import ReactMarkdown from 'react-markdown';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const { sendUserMessage, messages } = usePollinationsChat([
    { role: "system", content: "${systemMessage}" }
  ], { 
    seed: ${chatSeed},
    model: '${chatModel}'
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
              msg.role === 'user' ? 'bg-primary/10 text-primary-content' : 'bg-base-200 text-base-content'
            }\`}>
              <span className="mr-2">{msg.role === 'user' ? '🐦' : '🌸'}</span>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-base-300">
        <div className="join w-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="input input-bordered join-item w-full"
          />
          <button 
            onClick={handleSend}
            className="btn btn-primary join-item"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
    `
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => console.log('Code copied to clipboard'))
      .catch(err => console.error('Failed to copy code: ', err))
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="form-control">
          <label className="label">
            <span className="label-text">System Message</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            value={systemMessage}
            onChange={(e) => setSystemMessage(e.target.value)}
            placeholder="Enter system message..."
          />
        </div>

        <div className="flex space-x-4">
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text">Model</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={chatModel}
              onChange={(e) => setChatModel(e.target.value)}
            >
              {textModels.map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Seed</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-24"
              value={chatSeed}
              onChange={(e) => setChatSeed(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-base-200 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}
            >
              <div className={`chat-bubble ${
                msg.role === 'user' ? 'chat-bubble-primary' : ''
              }`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
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

      <div className="relative mt-4">
        <button
          className="btn btn-square btn-sm absolute right-2 top-2"
          onClick={() => {
            navigator.clipboard.writeText(getChatCode())
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <Highlight theme={themes.vsDark} code={getChatCode()} language="typescript">
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
  )
}