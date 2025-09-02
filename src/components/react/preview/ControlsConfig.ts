e/**
 * Canonical controls configuration for Preview system (initial stub).
 *
 * Each control object:
 *  - id: stable unique key (kebab-case)
 *  - type: 'slider' | 'select' | 'switch' | 'input'
 *  - label: UI label
 *  - defaultValue: initial value
 *  - (type-specific props) e.g. min/max/step/options
 *  - toCSSVar?: transform from raw value to CSS custom property value string
 *  - var?: custom token name (without leading --). If omitted: pv-[id]-[controlId]
 *
 * NOTE: This file is framework-agnostic except for TypeScript types imported.
 * Avoid importing React here. Pure data + transforms only.
 */
import type {
  ControlConfig,
  SliderControl,
  SelectControl,
  SwitchControl,
} from '@/types/preview';

const durationSlider: SliderControl = {
  id: 'duration',
  type: 'slider',
  label: 'Duration',
  description: 'Transition duration in milliseconds',
  defaultValue: 300,
  min: 100,
  max: 1000,
  step: 50,
  toCSSVar: (value) => `${value}ms`,
};

const timingFunctionSelect: SelectControl = {
  id: 'timing-function',
  type: 'select',
  label: 'Timing Function',
  description: 'CSS easing function',
  defaultValue: 'ease-linear',
  options: [
    { label: 'ease-linear', value: 'ease-linear' },
    { label: 'ease-in', value: 'ease-in' },
    { label: 'ease-out', value: 'ease-out' },
    { label: 'ease-in-out', value: 'ease-in-out' },
  ],
  toCSSVar: (value) => value,
};

const animationEnabledSwitch: SwitchControl = {
  id: 'animation-enabled',
  type: 'switch',
  label: 'Enable Animation',
  description: 'Toggle animation on/off',
  defaultValue: true,
  toCSSVar: (value) => (value ? '1' : '0'),
};

/**
 * Exported grouped configuration.
 * Later we can export different sets per demo: e.g. transitions vs animations.
 * For now provide a base union used by PreviewWrapper prototype.
 */
export const baseControlsConfig: ControlConfig[] = [
  durationSlider,
  timingFunctionSelect,
  animationEnabledSwitch,
];

/**
 * Helper to filter a subset by ids (future usage).
 */
export function pickControls(ids: string[]): ControlConfig[] {
  const map = new Map(baseControlsConfig.map(c => [c.id, c]));
  return ids.map(id => map.get(id)).filter(Boolean) as ControlConfig[];
}