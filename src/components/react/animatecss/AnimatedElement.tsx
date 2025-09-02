
import React from 'react';

interface AnimatedElementProps {
  animationName: string;
  animationKey: number;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({ animationName, animationKey }) => {
  // The --animate-duration can be used to set animation speed.
  const style = {
    '--animate-duration': '1s',
  } as React.CSSProperties;

  return (
    <div 
      key={animationKey} 
      className="flex justify-center items-center h-full p-4"
    >
      <h1 
        style={style}
        className={`text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate__animated animate__${animationName}`}
      >
        Animate Me!
      </h1>
    </div>
  );
};

export default AnimatedElement;
