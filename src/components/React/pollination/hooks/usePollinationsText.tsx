import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import memoize from "lodash.memoize";

// NOTE: You may need to install the types for lodash.memoize
// npm install --save-dev @types/lodash.memoize

/**
 * Reusable interface for chat messages.
 */
interface Message {
  role: "user" | "system";
  content: string;
}

/**
 * Defines the configuration options for the usePollinationsText hook.
 */
export interface PollinationsTextOptions {
  seed?: number;
  systemPrompt?: string;
  model?: string;
  jsonMode?: boolean;
  loadNull?: boolean;
}

/**
 * Defines the structure of the request body sent to the API.
 */
interface RequestBody {
  messages: Message[];
  seed?: number;
  model?: string;
  jsonMode?: boolean;
}

/**
 * Custom hook to generate text using the Pollinations API.
 * It is generic, allowing you to specify the expected return type `T` when using jsonMode.
 *
 * @param {string | null} prompt - The user's input prompt. If null, no request is made.
 * @param {PollinationsTextOptions} [options={}] - Configuration options for text generation.
 * @returns {T | string | null} - The generated content (type T for JSON, string for text), an error string, or null while loading.
 */
const usePollinationsText = <T = object>(
  prompt: string | null,
  options: PollinationsTextOptions = {}
): T | string | null => {
  const {
    seed = 42,
    systemPrompt,
    model,
    jsonMode = false,
    loadNull = false,
  } = options;

  // State to hold the generated text. Its type is a union of the generic T, string, or null.
  const [text, setText] = useState<T | string | null>(null);

  // Ref to track and chain the current fetch request to avoid race conditions.
  const currentFetchRef = useRef<Promise<void>>(Promise.resolve());

  // Memoized request body to prevent re-creating it on every render.
  const requestBody: RequestBody = useMemo(() => {
    const messages: Message[] = systemPrompt
      ? [{ role: "system", content: systemPrompt }]
      : [];
    if (prompt) {
      messages.push({ role: "user", content: prompt });
    }
    return { messages, seed, model, jsonMode };
  }, [prompt, systemPrompt, seed, model, jsonMode]);

  // A useCallback to create the fetch chain.
  const fetchText = useCallback(() => {
    currentFetchRef.current = currentFetchRef.current
      .then(() => memoizedFetchPollinationsText<T>(requestBody))
      .then((cleanedData) => {
        setText(cleanedData);
      })
      .catch((error: Error) => {
        console.error("Error in usePollinationsText:", error);
        setText(
          `An error occurred while generating text: ${error.message}. Please try again.`
        );
      });
  }, [requestBody]);

  // Effect to fetch text when dependencies change.
  useEffect(() => {
    if (prompt === null) return;
    if (loadNull) setText(null);
    fetchText();
  }, [fetchText, loadNull, prompt]);

  return text;
};

/**
 * Async function to fetch text from the Pollinations API.
 * It's generic to handle both string and JSON object responses.
 * @param {RequestBody} requestBody - The request body for the API call.
 * @returns {Promise<T | string>} - A promise that resolves to the cleaned text data or parsed JSON.
 */
const fetchPollinationsText = async <T = object>(
  requestBody: RequestBody
): Promise<T | string> => {
  try {
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    // If jsonMode is true, parse the data and cast it to the generic type T.
    // Otherwise, clean the markdown text.
    return requestBody.jsonMode ? (JSON.parse(data) as T) : cleanMarkdown(data);
  } catch (error) {
    console.error("Error fetching text from Pollinations API:", error);
    throw error;
  }
};

// Memoized version of fetchPollinationsText for caching API calls.
const memoizedFetchPollinationsText = memoize(
  fetchPollinationsText,
  (requestBody: RequestBody) => JSON.stringify(requestBody) // Use the stringified body as the cache key
);

/**
 * Helper function to clean markdown data by extracting content from code blocks.
 * @param {string} data - The markdown data to clean.
 * @returns {string} - The cleaned text data.
 */
const cleanMarkdown = (data: string): string => {
  const match = data.match(/```(?:json|)\n([\s\S]*?)```/);
  return match?.[1] ?? data; // Return the first captured group or the original data
};

export default usePollinationsText;