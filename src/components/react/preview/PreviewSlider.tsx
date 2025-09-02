'use client';

import React from 'react';
import { Slider } from "@/components/ui/slider";

interface PreviewSliderProps {
  title: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

const PreviewSlider: React.FC<PreviewSliderProps> = ({
  title,
  min,
  max,
  step,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-foreground">{title}</label>
        <span className="text-sm text-muted-foreground">{value}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        className="w-full"
      />
    </div>
  );
};

export default PreviewSlider;