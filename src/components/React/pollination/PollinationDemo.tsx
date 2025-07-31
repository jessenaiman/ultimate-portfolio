import React from 'react';
import usePollinationsChat from './hooks/usePollinationsChat';

export default function PollinationsDemo() {
  // We are only using the chat hook for now
  const { messages, sendUserMessage } = usePollinationsChat([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('chat-prompt') as HTMLInputElement;
    if (input.value) {
      sendUserMessage(input.value);
      input.value = '';
    }
  };

  return (
    // DaisyUI Tab structure
    <div role="tablist" className="tabs tabs-lifted">
      
      {/* Tab 1: Chat (Active) */}
      <input type="radio" name="pollination_tabs" role="tab" className="tab" aria-label="Chat" defaultChecked />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <h3 className="text-2xl font-bold mb-4">Live Chat Demo</h3>
        <div className="h-80 overflow-y-auto bg-base-200 p-4 rounded-lg mb-4 border border-base-300">
          {messages.map((msg, index) => (
            <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-primary' : ''}`}>
                {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
              </div>
            </div>
          ))}
        </div>
        <form className="form-control" onSubmit={handleChatSubmit}>
          <div className="join w-full">
            <input
              name="chat-prompt"
              type="text"
              placeholder="Type your message..."
              className="input input-bordered join-item w-full"
            />
            <button type="submit" className="btn btn-primary join-item">Send</button>
          </div>
        </form>
      </div>

      {/* Tab 2: Image (Placeholder) */}
      <input type="radio" name="pollination_tabs" role="tab" className="tab" aria-label="Image" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <h3 className="text-2xl font-bold">Image Generation</h3>
        <p className="mt-4">This component will be integrated next.</p>
      </div>

      {/* Tab 3: Text (Placeholder) */}
      <input type="radio" name="pollination_tabs" role="tab" className="tab" aria-label="Text" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <h3 className="text-2xl font-bold">Text Generation</h3>
        <p className="mt-4">This component will be integrated next.</p>
      </div>

    </div>
  );
}