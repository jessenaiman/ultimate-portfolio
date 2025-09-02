'use client';

import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from 'react';
import PreviewSelect from './PreviewSelect';
import PreviewSlider from './PreviewSlider';
import PreviewSwitch from './PreviewSwitch';
import PreviewInput from './PreviewInput';
import RefreshButton from './RefreshButton';
import Customize from './Customize';
import StyleInjector from './StyleInjector';

// NOTE: Temporary dual model:
//  - Existing ad-hoc `controls` prop (legacy usage on transitions page)
//  - Future config-driven system (will replace ad-hoc after page refactor)
//
// This wrapper now:
//  1. Centralizes control state
//  2. Generates namespaced CSS variables for each control
//  3. Exposes context (values/update/reset) for future refactored controls

interface AdHocControl {
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
}

interface PreviewWrapperProps {
  children: React.ReactNode;
  onRefresh?: () => void;
  controls?: AdHocControl[];
}

interface PreviewRuntimeContext {
  values: Record<string, any>;
  update: (id: string, value: any) => void;
  reset: () => void;
  instanceId: string;
  ids: string[];
}

const PreviewContext = createContext<PreviewRuntimeContext | null>(null);

export const usePreviewContext = () => {
  const ctx = useContext(PreviewContext);
  if (!ctx) {
    throw new Error('usePreviewContext must be used within PreviewWrapper');
  }
  return ctx;
};

let instanceCounter = 0;
function nextInstanceId() {
  instanceCounter += 1;
  return instanceCounter.toString(36);
}

function slugify(title: string, fallback: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || fallback
  );
}

const PreviewWrapper: React.FC<PreviewWrapperProps> = ({
  children,
  onRefresh,
  controls = [],
}) => {
  // Stable instance id
  const instanceIdRef = useRef<string>(nextInstanceId());

  // Derive a stable id per control
  const controlIds = useMemo(
    () =>
      controls.map((c, i) => {
        return `control_${i}_${slugify(c.title, i.toString())}`;
      }),
    [controls]
  );

  // Build initial state once
  const initialStateRef = useRef<Record<string, any>>(
    controls.reduce((acc, control, idx) => {
      acc[controlIds[idx]] = control.initialValue;
      return acc;
    }, {} as Record<string, any>)
  );

  const [values, setValues] = useState<Record<string, any>>(
    initialStateRef.current
  );

  const update = useCallback(
    (id: string, value: any) => {
      setValues((prev) => {
        if (prev[id] === value) return prev;
        return { ...prev, [id]: value };
      });
      // Fire original callback (match by index)
      const index = controlIds.indexOf(id);
      if (index >= 0) {
        controls[index].onChange(value);
      }
    },
    [controls, controlIds]
  );

  const reset = useCallback(() => {
    setValues(initialStateRef.current);
    // Optionally call each onChange with its initial value for parity
    controls.forEach((c, i) => c.onChange(initialStateRef.current[controlIds[i]]));
  }, [controls, controlIds]);

  const ctxValue = useMemo<PreviewRuntimeContext>(
    () => ({
      values,
      update,
      reset,
      instanceId: instanceIdRef.current,
      ids: controlIds,
    }),
    [values, update, reset, controlIds]
  );

  // Build CSS variable map (namespaced)
  // Naming: pv-{instanceId}-{slug}
  const cssVarMap = useMemo(() => {
    const map: Record<string, string | number> = {};
    controls.forEach((control, i) => {
      const id = controlIds[i];
      const raw = values[id];
      const slug = id.replace(/^control_[0-9]+_/, ''); // remove prefix for readability
      let serialized: string | number = raw;

      // Simple heuristic transforms (will be replaced by config-driven toCSSVar)
      if (control.controlType === 'slider' && /duration/i.test(control.title)) {
        serialized = `${raw}ms`;
      } else if (control.controlType === 'switch') {
        serialized = raw ? '1' : '0';
      }

      const varName = `pv-${instanceIdRef.current}-${slug}`;
      map[varName] = serialized;
    });
    return map;
  }, [controls, controlIds, values]);

  return (
    <PreviewContext.Provider value={ctxValue}>
      <div
        className="preview-wrapper space-y-6"
        data-pv={ctxValue.instanceId}
      >
        <StyleInjector
          instanceId={ctxValue.instanceId}
          variables={cssVarMap}
        />
        {/* Preview Area */}
        <div className="preview-area relative min-h-[300px] bg-background border rounded-lg p-6 flex items-center justify-center">
          {children}
          {onRefresh && (
            <div className="absolute top-4 right-4">
              <RefreshButton onClick={() => { onRefresh(); reset(); }} />
            </div>
          )}
        </div>

        {/* Controls */}
        {controls.length > 0 && (
          <Customize>
            {controls.map((control, index) => {
              const id = controlIds[index];
              const value = values[id];

              switch (control.controlType) {
                case 'select':
                  return (
                    <PreviewSelect
                      key={id}
                      title={control.title}
                      options={control.options || []}
                      value={value}
                      onChange={(val) => update(id, val)}
                    />
                  );

                case 'slider':
                  return (
                    <PreviewSlider
                      key={id}
                      title={control.title}
                      min={control.min || 0}
                      max={control.max || 100}
                      step={control.step || 1}
                      value={value}
                      onChange={(val) => update(id, val)}
                    />
                  );

                case 'switch':
                  return (
                    <PreviewSwitch
                      key={id}
                      title={control.title}
                      value={value}
                      onChange={(val) => update(id, val)}
                    />
                  );

                case 'input':
                  return (
                    <PreviewInput
                      key={id}
                      title={control.title}
                      value={value}
                      onChange={(val) => update(id, val)}
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
    </PreviewContext.Provider>
  );
};

export default PreviewWrapper;