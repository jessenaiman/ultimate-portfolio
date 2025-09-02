'use client';

import React from 'react';

interface CustomizeProps {
  children: React.ReactNode;
  className?: string;
}

const Customize: React.FC<CustomizeProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`space-y-4 p-4 bg-muted rounded-lg ${className}`}>
      <h3 className="text-lg font-semibold text-foreground">Customize</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

export default Customize;