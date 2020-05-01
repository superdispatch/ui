import { Card, CardContent, Typography } from '@material-ui/core';
import { number, select } from '@storybook/addon-knobs';
import { Color, Inline, InlineSpacing } from '@superdispatch/ui';
import React from 'react';

import { Placeholder } from '../internal/Placeholder';

export default function InlineDemo() {
  const space = number('Spacing', 1, {
    min: 1,
    max: 10,
    step: 1,
    range: true,
  }) as InlineSpacing;
  const verticalAlign = select(
    'Vertical Align',
    { None: undefined, Top: 'top', Center: 'center', Bottom: 'bottom' },
    undefined,
  );
  const horizontalAlign = select(
    'Horizontal Align',
    { None: undefined, Left: 'left', Center: 'center', Right: 'right' },
    undefined,
  );

  return (
    <div>
      <Typography>Align: {horizontalAlign}</Typography>
      <Typography>Space: {space}</Typography>

      <Card>
        <CardContent>
          <Inline
            space={space}
            verticalAlign={verticalAlign}
            horizontalAlign={horizontalAlign}
            style={{ maxWidth: '224px', backgroundColor: Color.Grey100 }}
          >
            {!verticalAlign
              ? Array.from({ length: 10 }, (_, idx) => (
                  <Placeholder key={idx} width={48} height={48} />
                ))
              : Array.from({ length: 4 }, (_, idx) => (
                  <Placeholder key={idx} width={48} height={48 + 24 * idx} />
                ))}
          </Inline>
        </CardContent>
      </Card>
    </div>
  );
}
