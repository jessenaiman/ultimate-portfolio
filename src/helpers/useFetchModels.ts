import { useState, useEffect } from 'react';

interface TextModel {
  name: string;
  type: 'chat' | 'completion';
  censored: boolean;
}

type ImageModel = string;

export function useFetchModels(): { textModels: TextModel[]; imageModels: ImageModel[]; isLoading: boolean } {
  const [textModels, setTextModels] = useState<TextModel[]>([]);
  const [imageModels, setImageModels] = useState<ImageModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const [textResponse, imageResponse] = await Promise.all([
          fetch('https://text.pollinations.ai/models'),
          fetch('https://image.pollinations.ai/models')
        ]);
        const textData: TextModel[] = await textResponse.json();
        const imageData: ImageModel[] = await imageResponse.json();
        setTextModels(textData);
        setImageModels(imageData);
      } catch (error) {
        console.error('Error fetching models:', error);
        // Fallback models
        setTextModels([{ name: 'openai', type: 'chat', censored: false }]);
        setImageModels(['flux']);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModels();
  }, []);

  return { textModels, imageModels, isLoading };
}