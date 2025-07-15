---
import Layout from '../../layouts/Layout.astro';
import { Icon } from 'astro-icon/components';

const title = 'Chat with AI';
const description = 'Interact with our AI assistant powered by Flowise';
---

<Layout title={title} description={description}>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Chat with AI</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Ask me anything and I'll do my best to help you out!
      </p>
    </div>

    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <!-- Flowise Chatbot Container -->
        <div id="flowise-chat" class="min-h-[500px] rounded-lg border border-base-300 p-4">
          <div class="flex items-center justify-center h-full">
            <div class="text-center">
              <div class="loading loading-spinner loading-lg text-primary mb-4"></div>
              <p>Loading AI assistant...</p>
            </div>
          </div>
        </div>

        <!-- Copy Button -->
        <div class="mt-4 flex justify-end">
          <button id="copy-chat" class="btn btn-ghost btn-sm gap-2">
            <Icon name="mdi:content-copy" class="w-4 h-4" />
            Copy Conversation
          </button>
        </div>
      </div>
    </div>
  </div>

  <script is:inline>
    // Initialize Flowise chat
    document.addEventListener('DOMContentLoaded', () => {
      // Create and append the Flowise chat element
      const chatContainer = document.createElement('flowise-fullchatbot');
      const flowiseContainer = document.getElementById('flowise-chat');
      
      // Clear loading content and append the chat
      if (flowiseContainer) {
        flowiseContainer.innerHTML = '';
        flowiseContainer.appendChild(chatContainer);
      }

      // Initialize Flowise chat
      import('https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js')
        .then(module => {
          const Chatbot = module.default;
          Chatbot.initFull({
            chatflowid: "5565a6be-fe2a-4866-9fc6-1f341513dd86",
            apiHost: "https://flowise.omega-spiral.com",
            chatflowConfig: {
              // Configuration options can go here
            },
            theme: {
              // Customize the chat theme to match DaisyUI
              button: {
                backgroundColor: "#570df8", // DaisyUI primary color
                right: 20,
                bottom: 20,
                size: "medium",
                iconColor: "white"
              },
              chatWindow: {
                welcomeMessage: "Hello! How can I help you today?",
                backgroundColor: "#ffffff",
                height: 500,
                width: "100%",
                fontSize: 16,
                poweredByTextColor: "#303235",
                botMessage: {
                  backgroundColor: "#f7f7f8",
                  textColor: "#303235",
                  showAvatar: true,
                  avatarSrc: "/images/ai-avatar.png"
                },
                userMessage: {
                  backgroundColor: "#3b82f6",
                  textColor: "#ffffff",
                  showAvatar: true,
                  avatarSrc: ""
                },
                textInput: {
                  placeholder: "Type your question",
                  backgroundColor: "#ffffff",
                  textColor: "#303235",
                  sendButtonColor: "#3b82f6"
                }
              }
            }
          });
        })
        .catch(error => {
          console.error('Error loading Flowise chat:', error);
          if (flowiseContainer) {
            flowiseContainer.innerHTML = `
              <div class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error loading chat. Please try again later.</span>
              </div>
            `;
          }
        });

      // Copy conversation functionality
      const copyButton = document.getElementById('copy-chat');
      if (copyButton) {
        copyButton.addEventListener('click', () => {
          const chatMessages = document.querySelectorAll('.flowise-message');
          let conversationText = '';
          
          chatMessages.forEach(message => {
            const isBot = message.classList.contains('flowise-bot-message');
            const sender = isBot ? 'AI' : 'You';
            const text = message.textContent?.trim() || '';
            conversationText += `${sender}: ${text}\n\n`;
          });

          navigator.clipboard.writeText(conversationText)
            .then(() => {
              const originalText = copyButton.textContent;
              copyButton.innerHTML = '<span>Copied!</span>';
              setTimeout(() => {
                copyButton.innerHTML = '<span>Copy Conversation</span>';
              }, 2000);
            })
            .catch(err => {
              console.error('Failed to copy conversation:', err);
            });
        });
      }
    });
  </script>
</Layout>

<style>
  /* Custom styles for the Flowise chat */
  :global(.flowise-chatbot) {
    --flowise-primary: #570df8;
    --flowise-secondary: #f7f7f8;
    --flowise-text: #303235;
    --flowise-bg: #ffffff;
  }

  /* Ensure the chat container takes full height */
  #flowise-chat {
    min-height: 500px;
    display: flex;
    flex-direction: column;
  }

  /* Style the copy button */
  #copy-chat {
    transition: all 0.3s ease;
  }

  #copy-chat:hover {
    transform: translateY(-2px);
  }
</style>
