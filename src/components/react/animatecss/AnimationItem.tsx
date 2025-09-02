import React, { useState, useCallback, useEffect } from 'react';
import CodeSnippet from './CodeSnippet';
import { CodeIcon } from './Icons';

interface AnimationItemProps {
  animationName: string;
  animatedText: string;
  colorTheme: string;
}

const AnimationItem: React.FC<AnimationItemProps> = ({ animationName, animatedText, colorTheme }) => {
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [showCode, setShowCode] = useState<boolean>(false);

  const handleAnimate = useCallback(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    const triggerAnimation = () => handleAnimate();
    document.addEventListener('animate-all', triggerAnimation);
    return () => {
      document.removeEventListener('animate-all', triggerAnimation);
    };
  }, [handleAnimate]);

  const toggleShowCode = useCallback(() => {
    setShowCode(prev => !prev);
  }, []);

  return (
    <div className="p-4 bg-gray-900/60 rounded-lg border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <p className="font-mono text-cyan-400 truncate pr-2">{animationName}</p>
        <div className="flex items-center gap-2 flex-shrink-0">
            <button
                onClick={toggleShowCode}
                aria-label="Show code"
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
            >
                <CodeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleAnimate}
              className="px-4 py-2 bg-gray-700 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out"
            >
              Animate
            </button>
        </div>
      </div>
      
      <div className="relative w-full h-24 bg-gray-800/50 rounded-lg overflow-hidden flex justify-center items-center">
        <h3
          key={animationKey}
          className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colorTheme} animate__animated animate__${animationName}`}
          style={{ '--animate-duration': '1s' } as React.CSSProperties}
        >
          {animatedText || 'Animate Me!'}
        </h3>
      </div>
      
      {showCode && <CodeSnippet animationName={animationName} animatedText={animatedText} />}
    </div>
  );
};

export default AnimationItem;