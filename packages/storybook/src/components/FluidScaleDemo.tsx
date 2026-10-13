import React, { useEffect, useState } from 'react';

/**
 * Laat live zien waar de huidige viewport op de fluid schaal zit, en wat de
 * fluid tokens daar opleveren. Maak het venster breder of smaller (of gebruik
 * de viewport-knop in de toolbar) en de waarden bewegen mee.
 *
 * De waarden komen uit getComputedStyle op een meetelement, dus ze volgen de
 * density en het theme die in de toolbar gekozen zijn.
 */

const SAMPLES = [
  {
    label: 'Font size md',
    cssVar: '--dsn-text-font-size-md',
    property: 'font-size',
  },
  {
    label: 'Font size 2xl',
    cssVar: '--dsn-text-font-size-2xl',
    property: 'font-size',
  },
  {
    label: 'Space block md',
    cssVar: '--dsn-space-block-md',
    property: 'padding-top',
  },
  {
    label: 'Space row 3xl',
    cssVar: '--dsn-space-row-3xl',
    property: 'padding-top',
  },
  { label: 'Icon size md', cssVar: '--dsn-icon-size-md', property: 'width' },
  {
    label: 'Pointer target',
    cssVar: '--dsn-pointer-target-min-block-size',
    property: 'width',
  },
] as const;

const cellStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: '1px solid var(--dsn-color-neutral-border-subtle, #e0e0e0)',
  fontSize: '13px',
  fontFamily: 'var(--dsn-text-font-family-monospace, monospace)',
  textAlign: 'start',
};

function readPx(value: string): number {
  return Number.parseFloat(value) || 0;
}

function measure() {
  const root = getComputedStyle(document.documentElement);
  const min = readPx(root.getPropertyValue('--dsn-viewport-min-inline-size'));
  const max = readPx(root.getPropertyValue('--dsn-viewport-max-inline-size'));
  const width = document.documentElement.clientWidth;
  const progress =
    max > min ? Math.min(1, Math.max(0, (width - min) / (max - min))) : 0;

  const probe = document.createElement('div');
  document.body.appendChild(probe);
  const values = SAMPLES.map((sample) => {
    probe.style.cssText = `position:absolute;visibility:hidden;${sample.property}:var(${sample.cssVar})`;
    const computed = getComputedStyle(probe).getPropertyValue(sample.property);
    return { ...sample, px: Math.round(readPx(computed) * 10) / 10 };
  });
  probe.remove();

  return { min, max, width, progress, values };
}

export function FluidScaleDemo() {
  const [state, setState] = useState<ReturnType<typeof measure> | null>(null);

  useEffect(() => {
    const update = () => setState(measure());
    update();
    // De token-CSS wordt asynchroon geladen; meet opnieuw als die binnen is.
    const timer = window.setTimeout(update, 500);
    window.addEventListener('resize', update);
    window.addEventListener('storybook-globals-updated', update);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', update);
      window.removeEventListener('storybook-globals-updated', update);
    };
  }, []);

  if (!state) return null;

  const percentage = Math.round(state.progress * 100);

  return (
    <div style={{ marginBlock: '16px' }}>
      <p
        style={{
          fontFamily: 'var(--dsn-text-font-family-default, sans-serif)',
          fontSize: '14px',
        }}
      >
        Viewport: <strong>{state.width}px</strong>. Fluid range: {state.min}px →{' '}
        {state.max}px. Position on the scale: <strong>{percentage}%</strong>.
      </p>
      <div
        role="img"
        aria-label={`Position on the fluid scale: ${percentage}%`}
        style={{
          blockSize: '8px',
          borderRadius: '4px',
          background: 'var(--dsn-color-neutral-bg-subtle, #eee)',
          overflow: 'hidden',
          marginBlockEnd: '16px',
        }}
      >
        <div
          style={{
            blockSize: '100%',
            inlineSize: `${percentage}%`,
            background: 'var(--dsn-color-accent-1-color-default, #1b59a4)',
          }}
        />
      </div>
      <table style={{ borderCollapse: 'collapse', inlineSize: '100%' }}>
        <thead>
          <tr>
            <th style={cellStyle}>Token</th>
            <th style={cellStyle}>CSS variable</th>
            <th style={cellStyle}>Current value</th>
          </tr>
        </thead>
        <tbody>
          {state.values.map((value) => (
            <tr key={value.cssVar}>
              <td style={cellStyle}>{value.label}</td>
              <td style={cellStyle}>
                <code>{value.cssVar}</code>
              </td>
              <td style={cellStyle}>{value.px}px</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
