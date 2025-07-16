import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
}

const InteractiveShowcase: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi",
      sender: "assistant"
    },
    {
      id: 2,
      content: "Hey, who are you?",
      sender: "user"
    },
    {
      id: 3,
      content: "AI version of developer Jesse Naiman",
      sender: "assistant"
    },
    {
      id: 4,
      content: "Sick,let's chat, I'm starting",
      sender: "user"
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [hasRespondedToFirstMessage, setHasRespondedToFirstMessage] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
    setNewMessage('');

    // Call the chat API
    try {
      const result = await axios.post('https://chatapi.akash.network/api/v1/chat/completions', {
        model: "Meta-Llama-3-1-8B-Instruct-FP8",
        messages: [
          {
            "role": "user",
            "content": newMessage
          }
        ]
      }, {
        headers: {
          'Authorization': 'Bearer sk-q_0D8kIK7WlIknAWcquS5g', // Replace with your actual API key
          'Content-Type': 'application/json'
        }
      });

      // Assuming the response structure matches Python's OpenAI response
      let content = result.data.choices[0].message.content;

      // Simulating textwrap.fill behavior in JS
      const wrappedText = content.match(/.{1,50}/g)?.join('\n') || content;

      const assistantMessage: Message = {
        id: messages.length + 2,
        content: wrappedText,
        sender: 'assistant'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMsg: Message = {
        id: messages.length + 2,
        content: 'An error occurred while fetching the response.',
        sender: 'assistant'
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  return (
    <div id="chat-section" className="w-full p-4 md:p-8">
      <div className="w-full max-w-2xl mx-auto card bg-base-200 shadow-xl">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-base-300 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <img
                  className="aspect-square h-full w-full"
                  alt="Jesse Naiman"
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23a855f7'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='40' fill='white' text-anchor='middle' dominant-baseline='middle'%3EI%3C/text%3E%3C/svg%3E"
                />
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="font-semibold">Jesse Naiman</h3>
              <p className="text-xs opacity-70">@astroisthebest</p>
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div ref={chatContainerRef} className="p-4 h-[400px] overflow-auto scroll-smooth">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 max-w-[80%] shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-300 text-base-content'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-base-300 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              className="input input-bordered flex-1"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="btn btn-primary"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 2 11 13" />
                <path d="m22 2-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InteractiveShowcase;