import { useMemo } from "react";

/**
 * Defines the configuration options for the usePollinationsImage hook.
 */
export interface PollinationsImageOptions {
  width?: number;
  height?: number;
  model?: string;
  seed?: number;
  nologo?: boolean;
  enhance?: boolean;
}

/**
 * Custom hook to generate a Pollinations image URL based on the given prompt and options.
 *
 * @param {string} prompt - The prompt to generate the image.
 * @param {PollinationsImageOptions} [options={}] - Optional parameters for image generation.
 * @returns {string} - The URL of the generated image.
 */
const usePollinationsImage = (
  prompt: string,
  options: PollinationsImageOptions = {}
): string => {
  const {
    width = 1024,
    height = 1024,
    model = "flux",
    seed = 42,
    nologo = true,
    enhance = false,
  } = options;

  const imageUrl = useMemo(() => {
    const params = new URLSearchParams({
      width: String(width),
      height: String(height),
      model: model,
      seed: String(seed),
      nologo: String(nologo),
      enhance: String(enhance),
    });
    return `https://pollinations.ai/p/${encodeURIComponent(
      prompt
    )}?${params.toString()}`;
  }, [prompt, width, height, model, seed, nologo, enhance]);

  return imageUrl;
};

export default usePollinationsImage;