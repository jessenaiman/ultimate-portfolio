import React, { useState } from 'react';
import { ANIMATIONS, COLOR_THEMES } from '../../../data/animation';
import { GithubIcon, SparklesIcon } from './Icons';
import AnimationCategoryCard from './AnimationCategoryCard';

const App: React.FC = () => {
  const [animatedText, setAnimatedText] = useState<string>('Animate Me!');

  const handleAnimateAll = () => {
    document.dispatchEvent(new CustomEvent('animate-all'));
  };

  return (
    <div className="flex flex-col min-h-full text-gray-200 font-sans">
      <header className="w-full p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-20">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Animate.css Showcase
          </h1>
          <a
            href="https://animate.style/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Visit Animate.css Official Site
          </a>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl mb-8 flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="w-full sm:flex-grow">
              <label htmlFor="animatedText" className="block text-sm font-medium text-gray-400 mb-2">
                Change Animation Text
              </label>
              <input
                type="text"
                id="animatedText"
                value={animatedText}
                onChange={(e) => setAnimatedText(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                placeholder="Enter text to animate..."
              />
            </div>
            <div className="flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={handleAnimateAll}
                className="w-full h-[50px] flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-all duration-200 ease-in-out"
                aria-label="Trigger all animations"
              >
                <SparklesIcon className="w-5 h-5" />
                <span>Animate All</span>
              </button>
            </div>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
          {Object.entries(ANIMATIONS).map(([category, animations], index) => (
            <AnimationCategoryCard
              key={category}
              categoryName={category}
              animations={animations}
              animatedText={animatedText}
              colorTheme={COLOR_THEMES[index % COLOR_THEMES.length]}
            />
          ))}
        </div>
      </main>

      <footer className="w-full p-4 text-center text-gray-500 text-sm mt-8">
        <div className="container mx-auto flex items-center justify-center gap-4">
            <span>Built with React, Tailwind CSS, and Animate.css</span>
            <a href="https://github.com/animate-css/animate.css" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <GithubIcon className="w-5 h-5" />
            </a>
        </div>
      </footer>
    </div>
  );
};

export default App;