import { Color } from '@superdispatch/ui';
import React, { CSSProperties, ReactNode } from 'react';

export interface PlaceholderProps {
  code?: string;
  text?: ReactNode;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
}

export function Placeholder({
  code,
  text,
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
      {code ? (
        <strong
          style={{
            color: Color.Grey100,
            padding: '8px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <pre style={{ margin: 0 }}>{code}</pre>
        </strong>
      ) : text ? (
        <strong
          style={{
            color: Color.Grey100,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {text}
        </strong>
      ) : (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <line
            x2="100%"
            y2="100%"
            strokeWidth="2px"
            stroke={Color.Silver400}
          />
          <line
            x1="100%"
            y2="100%"
            strokeWidth="2px"
            stroke={Color.Silver400}
          />
        </svg>
      )}
    </div>
  );
}
