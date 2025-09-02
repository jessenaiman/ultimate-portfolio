'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
  onClick: () => void;
  className?: string;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  onClick,
  className = "",
}) => {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onClick}
      className={className}
      title="Refresh preview"
    >
      <RefreshCw className="h-4 w-4" />
    </Button>
  );
};

export default RefreshButton;