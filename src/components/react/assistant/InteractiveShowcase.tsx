import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePollinationsChat } from '@pollinations/react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
}

const InteractiveShowcase: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm Jesse Naiman, a Senior Developer with nearly 20 years of experience. I'm here to help you with development tasks, technical questions, or project discussions. What can I assist you with today?",
      sender: "assistant"
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [hasRespondedToFirstMessage, setHasRespondedToFirstMessage] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Pollinations chat hook with professional context
  const systemPrompt = `You are Jesse Naiman, a Senior Developer and Community Support specialist with nearly 20 years of programming experience. You are professional, helpful, and ready to solve complex technical problems.

Key background information:
- 20+ years as programmer/web developer
- Expertise in full-stack development (.NET, JavaScript, React, Vue, Svelte, Solid)
- Experience with modern frameworks and tools
- Strong problem-solving skills and ability to learn new technologies quickly
- Background in managing teams, handling complex machinery repair, and community support
- Experience with Web3/blockchain technologies and decentralized systems

You should:
- Be professional and solution-oriented
- Draw from your extensive development experience when answering questions
- Be willing to tackle complex technical challenges
- Show enthusiasm for helping with development tasks
- Be honest about what you know and don't know
- Focus on providing practical, actionable solutions

Always maintain a professional tone while being approachable and helpful.`;

  const { messages: pollinationsMessages, sendUserMessage } = usePollinationsChat([
    { role: 'system', content: systemPrompt }
  ], {
    seed: 42,
    model: 'gpt-3.5-turbo'
  });

  const scrollToBottom = () => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = chatContainerRef.current;
      const isScrolledToBottom = scrollHeight - clientHeight <= scrollTop + 100;

      if (isScrolledToBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sync pollinations messages with our local state
  useEffect(() => {
    if (pollinationsMessages.length > 1) { // More than just the system message
      const latestMessage = pollinationsMessages[pollinationsMessages.length - 1];
      if (latestMessage.role === 'assistant') {
        const assistantMessage: Message = {
          id: messages.length + 1,
          content: typeof latestMessage.content === 'string'
            ? latestMessage.content
            : JSON.stringify(latestMessage.content),
          sender: 'assistant'
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    }
  }, [pollinationsMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user'
    };
    setMessages(prev => [...prev, userMessage]);

    // Send to pollinations
    sendUserMessage(newMessage);

    setNewMessage('');
  };

  return (
    <div className="w-full h-full bg-base-100 rounded-lg shadow-xl flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-primary-content p-4 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-10">
              <span className="text-sm font-bold">JN</span>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Jesse Naiman</h3>
            <p className="text-sm opacity-90">Senior Developer & Technical Consultant</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 min-h-64"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-content'
                    : 'bg-base-200 text-base-content'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-base-300">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask me about development, technical solutions, or projects..."
            className="input input-bordered flex-1"
            disabled={false}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!newMessage.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </form>
        <p className="text-xs text-base-content/60 mt-2 text-center">
          Professional development assistance powered by AI
        </p>
      </div>
    </div>
  );
};

export default InteractiveShowcase;
