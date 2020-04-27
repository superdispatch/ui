import { Color } from '@superdispatch/ui';
import React, { CSSProperties } from 'react';

export interface PlaceholderProps {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export function Placeholder({
  width = 'auto',
  height = 'auto',
}: PlaceholderProps) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: Color.Silver200,
        border: `2px solid ${Color.Silver500}`,
      }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <line x2="100%" y2="100%" strokeWidth="2px" stroke={Color.Silver400} />
        <line x1="100%" y2="100%" strokeWidth="2px" stroke={Color.Silver400} />
      </svg>
    </div>
  );
}
