
import React from 'react';
import { ANIMATIONS } from '../../../data/animation';

interface AnimationSelectorProps {
  selectedAnimation: string;
  onAnimationChange: (animation: string) => void;
}

const AnimationSelector: React.FC<AnimationSelectorProps> = ({ selectedAnimation, onAnimationChange }) => {
  return (
    <div className="relative w-full sm:w-auto">
      <select
        id="animation-select"
        value={selectedAnimation}
        onChange={(e) => onAnimationChange(e.target.value)}
        className="w-full appearance-none bg-gray-700 border border-gray-600 text-white py-3 pl-4 pr-10 rounded-lg leading-tight focus:outline-none focus:bg-gray-600 focus:border-cyan-500 transition"
      >
        {Object.entries(ANIMATIONS).map(([group, animations]) => (
          <optgroup label={group} key={group} className="bg-gray-800 text-gray-300">
            {animations.map(animation => (
              <option key={animation} value={animation}>
                {animation}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  );
};

export default AnimationSelector;
