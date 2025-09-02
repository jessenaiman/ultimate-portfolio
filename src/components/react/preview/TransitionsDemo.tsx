'use client';

import React, { useState, useCallback } from 'react';
import PreviewWrapper from './PreviewWrapper';

interface TransitionsDemoProps {
  title: string;
  description?: string;
  initialDemo: React.ReactNode;
  controls?: {
    controlType: 'select' | 'slider' | 'switch' | 'input';
    title: string;
    options?: { value: string; label: string }[];
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
    inputType?: string;
    initialValue: any;
    onChange: (value: any) => void;
  }[];
  onRefresh?: () => void;
}

const TransitionsDemo: React.FC<TransitionsDemoProps> = ({
  title,
  description,
  initialDemo,
  controls = [],
  onRefresh,
}) => {
  const [demoKey, setDemoKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setDemoKey(prev => prev + 1);
    onRefresh?.();
  }, [onRefresh]);

  return (
    <PreviewWrapper onRefresh={handleRefresh} controls={controls}>
      <div key={demoKey} className="text-center">
        {initialDemo}
      </div>
    </PreviewWrapper>
  );
};

export default TransitionsDemo;