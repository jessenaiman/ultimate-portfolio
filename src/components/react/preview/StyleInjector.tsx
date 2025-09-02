'use client';

import React from 'react';

interface StyleInjectorProps {
  instanceId: string;
  /**
   * Map of css variable (WITHOUT leading --) to value (already serialized)
   * Example: { 'pv-abc-duration': '300ms' }
   */
  variables: Record<string, string | number>;
  /**
   * Optional extra selector to narrow scope. If omitted we scope to [data-pv="instanceId"]
   */
  scopeSelector?: string;
}

/**
 * Generates a scoped <style> block that assigns CSS custom properties
 * for a specific preview instance, preventing collisions across multiple
 * previews on the same page.
 *
 * Strategy:
 *  - Container element must include: data-pv="{instanceId}"
 *  - We output a selector: [data-pv="{instanceId}"] { --var: value; }
 *  - Variable names are expected already namespaced (ex: pv-{id}-{token})
 */
const StyleInjector: React.FC<StyleInjectorProps> = ({
  instanceId,
  variables,
  scopeSelector,
}) => {
  const selector = scopeSelector || `[data-pv="${instanceId}"]`;

  const cssBody = Object.entries(variables)
    .map(([k, v]) => {
      const valueStr = typeof v === 'number' ? String(v) : v;
      return `  --${k}: ${valueStr};`;
    })
    .join('\n');

  const css = `${selector} {\n${cssBody}\n}`;

  return <style data-pv-style={instanceId} dangerouslySetInnerHTML={{ __html: css }} />;
};

export default StyleInjector;