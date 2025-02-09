// types/math.ts
export interface MathEquation {
    name: string;
    value: string;
    category: string;
    description?: string;
  }
  
  export interface ChartConfig {
    xRange: { min: number; max: number };
    yRange: { min: number; max: number };
    gridLines: number;
  }