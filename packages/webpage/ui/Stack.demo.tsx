import { Card, CardContent, Typography } from '@material-ui/core';
import { number, select } from '@storybook/addon-knobs';
import { Color, Stack, StackSpacing } from '@superdispatch/ui';
import React from 'react';

import { Placeholder } from '../internal/Placeholder';

export default function StackDemo() {
  const space = number('Spacing', 1, {
    min: 1,
    max: 10,
    step: 1,
    range: true,
  }) as StackSpacing;
  const align = select(
    'Alignment',
    { None: undefined, Left: 'left', Center: 'center', Right: 'right' },
    undefined,
  );

  return (
    <div>
      <Typography>Align: {align}</Typography>
      <Typography>Space: {space}</Typography>

      <Card>
        <CardContent>
          <Stack
            align={align}
            space={space}
            style={{ maxWidth: '224px', backgroundColor: Color.Grey100 }}
          >
            <Placeholder width={align ? 40 : undefined} height={40} />
            <Placeholder width={align ? 60 : undefined} height={40} />
            <Placeholder width={align ? 80 : undefined} height={40} />
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
