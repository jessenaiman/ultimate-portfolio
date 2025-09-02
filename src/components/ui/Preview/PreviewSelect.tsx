'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreviewSelectProps {
  title: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  width?: number;
}

const PreviewSelect: React.FC<PreviewSelectProps> = ({
  title,
  options,
  value,
  onChange,
  width = 150,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{title}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger style={{ width }}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PreviewSelect;