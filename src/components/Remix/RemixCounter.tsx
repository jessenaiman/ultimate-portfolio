import { useState } from 'react';

export function RemixCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold">Remix Counter</h2>
      <p className="text-lg">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="btn btn-primary"
      >
        Increment
      </button>
    </div>
  );
}