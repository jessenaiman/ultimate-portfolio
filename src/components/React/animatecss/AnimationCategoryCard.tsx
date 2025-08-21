import React, { useState, useCallback, useEffect } from 'react';
import CodeSnippet from './CodeSnippet';
import Modal from './Modal';
import { CodeIcon, RefreshIcon } from './Icons';

interface AnimationCategoryCardProps {
  categoryName: string;
  animations: string[];
  animatedText: string;
  colorTheme: string;
}

const AnimationCategoryCard: React.FC<AnimationCategoryCardProps> = ({
  categoryName,
  animations,
  animatedText,
  colorTheme,
}) => {
  const [currentAnimation, setCurrentAnimation] = useState<string>(animations[0]);
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAnimate = useCallback(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, []);

  // Trigger animation when the dropdown selection changes
  useEffect(() => {
    handleAnimate();
  }, [currentAnimation, handleAnimate]);

  // Listen for the global 'animate-all' event
  useEffect(() => {
    const triggerAnimation = () => handleAnimate();
    document.addEventListener('animate-all', triggerAnimation);
    return () => {
      document.removeEventListener('animate-all', triggerAnimation);
    };
  }, [handleAnimate]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full bg-gray-800/50 rounded-xl shadow-2xl p-6 border border-gray-700 flex flex-col gap-4">
      <h2 className={`text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r ${colorTheme}`}>
        {categoryName}
      </h2>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <select
            value={currentAnimation}
            onChange={(e) => setCurrentAnimation(e.target.value)}
            className="w-full appearance-none bg-gray-700 border border-gray-600 text-white py-2 pl-3 pr-10 rounded-lg leading-tight focus:outline-none focus:bg-gray-600 focus:border-cyan-500 transition"
            aria-label={`Select animation for ${categoryName}`}
          >
            {animations.map(animation => (
              <option key={animation} value={animation}>
                {animation}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
        <button
            onClick={openModal}
            aria-label="Show code"
            className="flex-shrink-0 p-2 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
            <CodeIcon className="w-5 h-5" />
        </button>
        <button
          onClick={handleAnimate}
          aria-label="Replay animation"
          className="flex-shrink-0 p-2 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <RefreshIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="relative w-full h-32 bg-gray-900/60 rounded-lg overflow-hidden flex justify-center items-center border border-gray-700">
        <h3
          key={animationKey}
          className={`text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r ${colorTheme} animate__animated animate__${currentAnimation}`}
          style={{ '--animate-duration': '1s' } as React.CSSProperties}
        >
          {animatedText || 'Animate Me!'}
        </h3>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={closeModal} title={`Code for: ${currentAnimation}`}>
        <CodeSnippet animationName={currentAnimation} animatedText={animatedText} />
      </Modal>
    </div>
  );
};

export default AnimationCategoryCard;