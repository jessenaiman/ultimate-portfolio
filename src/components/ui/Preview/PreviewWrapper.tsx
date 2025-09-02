'use client';

import React, { useState } from 'react';
import PreviewSelect from './PreviewSelect';
import PreviewSlider from './PreviewSlider';
import PreviewSwitch from './PreviewSwitch';
import PreviewInput from './PreviewInput';
import RefreshButton from './RefreshButton';
import Customize from './Customize';

interface PreviewWrapperProps {
  children: React.ReactNode;
  onRefresh?: () => void;
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
}

const PreviewWrapper: React.FC<PreviewWrapperProps> = ({
  children,
  onRefresh,
  controls = [],
}) => {
  const [controlValues, setControlValues] = useState<Record<string, any>>(
    controls.reduce((acc, control, index) => {
      acc[`control_${index}`] = control.initialValue;
      return acc;
    }, {} as Record<string, any>)
  );

  const handleControlChange = (index: number, value: any) => {
    setControlValues(prev => ({
      ...prev,
      [`control_${index}`]: value
    }));
    
    // Call the original onChange handler
    controls[index].onChange(value);
  };

  return (
    <div className="preview-wrapper space-y-6">
      {/* Preview Area */}
      <div className="preview-area relative min-h-[300px] bg-background border rounded-lg p-6 flex items-center justify-center">
        {children}
        {onRefresh && (
          <div className="absolute top-4 right-4">
            <RefreshButton onClick={onRefresh} />
          </div>
        )}
      </div>

      {/* Controls */}
      {controls.length > 0 && (
        <Customize>
          {controls.map((control, index) => {
            const value = controlValues[`control_${index}`];
            
            switch (control.controlType) {
              case 'select':
                return (
                  <PreviewSelect
                    key={index}
                    title={control.title}
                    options={control.options || []}
                    value={value}
                    onChange={(val) => handleControlChange(index, val)}
                  />
                );
              
              case 'slider':
                return (
                  <PreviewSlider
                    key={index}
                    title={control.title}
                    min={control.min || 0}
                    max={control.max || 100}
                    step={control.step || 1}
                    value={value}
                    onChange={(val) => handleControlChange(index, val)}
                  />
                );
              
              case 'switch':
                return (
                  <PreviewSwitch
                    key={index}
                    title={control.title}
                    value={value}
                    onChange={(val) => handleControlChange(index, val)}
                  />
                );
              
              case 'input':
                return (
                  <PreviewInput
                    key={index}
                    title={control.title}
                    value={value}
                    onChange={(val) => handleControlChange(index, val)}
                    placeholder={control.placeholder}
                    type={control.inputType}
                  />
                );
              
              default:
                return null;
            }
          })}
        </Customize>
      )}
    </div>
  );
};

export default PreviewWrapper;