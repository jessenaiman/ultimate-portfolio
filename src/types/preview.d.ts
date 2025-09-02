// Preview system shared types

export type ControlType = 'slider' | 'select' | 'switch' | 'input';

export interface BaseControl<TType extends ControlType, TValue> {
  id: string;
  label: string;
  type: TType;
  defaultValue: TValue;
  description?: string;
  category?: string;
  var?: string; // css variable token (without prefix)
}

export interface SliderControl extends BaseControl<'slider', number> {
  min: number;
  max: number;
  step?: number;
  toCSSVar?: (value: number) => string;
}

export interface SelectOption { value: string; label: string; }

export interface SelectControl extends BaseControl<'select', string> {
  options: SelectOption[];
  toCSSVar?: (value: string) => string;
}

export interface SwitchControl extends BaseControl<'switch', boolean> {
  toCSSVar?: (value: boolean) => string;
}

export interface InputControl extends BaseControl<'input', string> {
  inputType?: string;
  placeholder?: string;
  toCSSVar?: (value: string) => string;
}

export type ControlConfig = SliderControl | SelectControl | SwitchControl | InputControl;

export type ControlValueMap = Record<string, string | number | boolean>;

export interface PreviewContextValue {
  values: ControlValueMap;
  update: <T extends string | number | boolean>(id: string, value: T) => void;
  reset: () => void;
  config: ControlConfig[];
  instanceId: string;
}

declare module '*.astro' {}