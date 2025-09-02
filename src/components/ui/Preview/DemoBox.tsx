'use client';

import React from 'react';

interface DemoBoxProps {
  className?: string;
  children?: React.ReactNode;
}

const DemoBox: React.FC<DemoBoxProps> = ({ className = '', children }) => {
  return (
    <div className={`demo-box ${className}`}>
      {children}
    </div>
  );
};

export default DemoBox;