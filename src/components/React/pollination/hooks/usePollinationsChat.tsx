import { useState, useCallback, useEffect } from "react";

/**
 * Defines the structure of a single chat message.
 */
export interface Message {
  role: "user" | "assistant" | "system";
  content: string | object; // Content can be a string or a JSON object
}

/**
 * Defines the configuration options for the usePollinationsChat hook.
 */
export interface PollinationsChatOptions {
  seed?: number;
  jsonMode?: boolean;
  model?: string;
}

/**
 * Defines the return type of the usePollinationsChat hook.
 */
export interface PollinationsChatReturn {
  sendUserMessage: (userMessage: string) => void;
  messages: Message[];
}

/**
 * Custom hook to generate a Pollinations chat response based on the given messages and fetch the response.
 *
 * @param {Message[]} [initMessages=[]] - The initial array of message objects to send.
 * @param {PollinationsChatOptions} [options={}] - Configuration options for the chat.
 * @returns {PollinationsChatReturn} - Object containing messages array and control functions.
 */
const usePollinationsChat = (
  initMessages: Message[] = [],
  options: PollinationsChatOptions = {}
): PollinationsChatReturn => {
  const { seed = 42, jsonMode = false, model = "openai" } = options;

  // State for storing the chat messages, now strongly typed with Message[]
  const [messages, setMessages] = useState<Message[]>(initMessages);

  const sendUserMessage = useCallback(
    (userMessage: string): void => {
      const updatedMessages: Message[] = [
        ...messages,
        { role: "user", content: userMessage },
      ];
      setMessages(updatedMessages);

      const requestBody = {
        messages: updatedMessages,
        jsonMode: jsonMode,
        seed: seed,
        model: model,
      };

      fetch(`https://text.pollinations.ai/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          let assistantMessageContent: string | object;

          try {
            // Parse the response if jsonMode is true, otherwise use the raw text
            assistantMessageContent = jsonMode ? JSON.parse(data) : data;
          } catch (error) {
            console.error("Error parsing response:", error);
            assistantMessageContent = `Sorry, I encountered an error while processing the response: ${
              error instanceof Error ? error.message : String(error)
            }`;
          }

          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: assistantMessageContent },
          ]);
        })
        .catch((error) => {
          console.error("Error fetching chat:", error);
          const errorMessage = `I'm sorry, but I encountered an error while trying to respond: ${
            error instanceof Error ? error.message : String(error)
          }. Please try again later.`;

          setMessages((prevMessages) => [
            ...prevMessages,
            { role: "assistant", content: errorMessage },
          ]);
        });
    },
    [messages, jsonMode, seed, model]
  );

  // This effect syncs the messages state if the initial messages prop changes.
  useEffect(() => {
    setMessages(initMessages);
  }, [initMessages]);

  return { sendUserMessage, messages };
};

export default usePollinationsChat;