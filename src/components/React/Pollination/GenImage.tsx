
// React code example using usepollinationsImage hook

import React from 'react';
import { usePollinationsImage } from '@pollinations/react';

const GeneratedImageComponent = () => {
  const imageUrl = usePollinationsImage('A beautiful landscape', {
    width: 1024,
    height: 1024,
    seed: 42,
    model: 'flux',
    nologo: true
  });

  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt="Generated Image" /> : <p>Loading...</p>}
    </div>
  );
};

export default GeneratedImageComponent;