import React, { useState } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

const ColorPickerHero: React.FC = () => {
  const [color, setColor] = useState('#3B82F6');

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-base-300/50 rounded-2xl border border-base-300 flex flex-col p-6 gap-4">
          <div className="text-center space-y-1">
            <p className="font-medium text-lg">Try it yourself!</p>
            <p className="text-sm opacity-70">Click the input below to choose a color</p>
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer bg-transparent hover:scale-[1.02] transition-transform"
          />
          <div
            style={{ backgroundColor: color }}
            className="w-full h-20 rounded-lg shadow-inner border border-black/10"
          />
          <div className="text-center">
            <p className="text-sm opacity-70">Selected color: <span className="font-mono p-1 bg-base-100 rounded-md">{color}</span></p>
          </div>
        </div>
      </motion.div>
    </LazyMotion>
  );
};

export default ColorPickerHero;
