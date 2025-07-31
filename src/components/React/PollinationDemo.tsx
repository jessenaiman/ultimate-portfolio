import React from 'react';
// CORRECTED IMPORTS: Now importing directly from the installed package
import { usePollinationsChat, usePollinationsImage, usePollinationsText } from '@pollinations/react';

export default function PollinationsDemo() {
  // Chat Hook
  const { messages, sendUserMessage } = usePollinationsChat([
    { role: 'system', content: 'You are a helpful assistant.' },
  ], { seed: 42, model: 'gpt-3.5-turbo' });
  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('chat-prompt') as HTMLInputElement;
    if (input.value) sendUserMessage(input.value);
    input.value = '';
  };

  // Image Hook
  const [imagePrompt, setImagePrompt] = React.useState('A programmer cat in a neon-lit room');
  const imageUrl = usePollinationsImage(imagePrompt, { width: 512, height: 512, seed: 42, model: 'gpt-3.5-turbo', nologo: true });

  // Text Hook
  const [textPrompt, setTextPrompt] = React.useState<string | null>(null);
  const generatedText = usePollinationsText(textPrompt || '', { seed: 42, model: 'gpt-3.5-turbo' });
  const handleTextGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('text-prompt') as HTMLInputElement;
    if (input.value) setTextPrompt(input.value);
  };

  return (
    <div role="tablist" className="tabs tabs-lifted">
      
      {/* Tab 1: Chat (Active and Working) */}
      <input type="radio" name="pollination_tabs" role="tab" className="tab" aria-label="Chat" defaultChecked />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <h3 className="text-2xl font-bold mb-4">Live Chat Demo</h3>
        <div className="h-80 overflow-y-auto bg-base-200 p-4 rounded-lg mb-4 border border-base-300">
          {messages.map((msg: any, index: number) => (
            <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-primary' : ''}`}>
                {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content, null, 2)}
              </div>
            </div>
          ))}
        </div>
        <form className="form-control" onSubmit={handleChatSubmit}>
          <div className="join w-full">
            <input name="chat-prompt" type="text" placeholder="Type your message..." className="input input-bordered join-item w-full" />
            <button type="submit" className="btn btn-primary join-item">Send</button>
          </div>
        </form>
      </div>

      {/* Tab 2: Image */}
      <input type="radio" name="pollination_tabs" role="tab" className="tab" aria-label="Image" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <h3 className="text-2xl font-bold">Image Generation</h3>
        <div className="form-control w-full mt-4">
          <label className="label"><span className="label-text">Image Prompt</span></label>
          <input type="text" className="input input-bordered w-full" value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} />
        </div>
        {imageUrl && <img src={imageUrl} alt={imagePrompt} className="rounded-lg shadow-lg max-w-sm mx-auto mt-4" />}
      </div>

      {/* Tab 3: Text */}
      <input type="radio" name="pollination_tabs" role="tab" className="tab" aria-label="Text" />
      <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
        <h3 className="text-2xl font-bold">Text Generation</h3>
        <form className="form-control mt-4" onSubmit={handleTextGenerate}>
          <label className="label"><span className="label-text">Text Prompt</span></label>
          <div className="join w-full">
            <input name="text-prompt" type="text" placeholder="A short poem about space" className="input input-bordered join-item w-full" />
            <button type="submit" className="btn btn-primary join-item">Generate</button>
          </div>
        </form>
        {generatedText && (
          <div className="mockup-code mt-4">
            <pre data-prefix="$"><code>{generatedText}</code></pre>
          </div>
        )}
      </div>

    </div>
  );
}