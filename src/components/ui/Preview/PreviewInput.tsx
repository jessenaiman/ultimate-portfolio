'use client';

import React from 'react';
import { Input } from "@/components/ui/input";

interface PreviewInputProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const PreviewInput: React.FC<PreviewInputProps> = ({
  title,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{title}</label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
};

export default PreviewInput;