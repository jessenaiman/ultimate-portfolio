'use client';

import React from 'react';
import { Switch } from "@/components/ui/switch";

interface PreviewSwitchProps {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const PreviewSwitch: React.FC<PreviewSwitchProps> = ({
  title,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm font-medium text-foreground">{title}</label>
      <Switch
        checked={value}
        onCheckedChange={onChange}
      />
    </div>
  );
};

export default PreviewSwitch;