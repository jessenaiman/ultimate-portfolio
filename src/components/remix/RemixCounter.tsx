import { useState, useEffect } from 'react';

export function RemixCounter() {
  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold">Remix Counter</h2>
      <p className="text-lg">Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        disabled={!isClient}
        className="btn btn-primary"
      >
        Increment
      </button>
    </div>
  );
}