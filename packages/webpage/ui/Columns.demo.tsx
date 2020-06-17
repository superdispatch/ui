import { Card, CardContent, Typography } from '@material-ui/core';
import { number, select } from '@storybook/addon-knobs';
import {
  Column,
  Columns,
  ColumnsSpace,
  ColumnWidth,
  Stack,
} from '@superdispatch/ui';
import React from 'react';

import { Placeholder } from '../internal/Placeholder';

const widths: ColumnWidth[] = [
  'content',
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '3/4',
  '1/5',
  '2/5',
  '3/5',
  '4/5',
];

export default function ColumnsDemo() {
  const space = number('Spacing', 1, {
    min: 0,
    max: 10,
    step: 1,
    range: true,
  }) as ColumnsSpace;
  const align = select(
    'Align',
    { None: undefined, Top: 'top', Center: 'center', Bottom: 'bottom' },
    undefined,
  );

  return (
    <div>
      <Typography>Align: {align}</Typography>
      <Typography>Space: {space}</Typography>

      <Card>
        <CardContent>
          <Stack space={1}>
            {widths.map((width) => (
              <Columns key={width} space={space} align={align}>
                <Column width={width}>
                  <Placeholder
                    height={48}
                    width={width === 'content' ? 128 : 'auto'}
                    text={width === 'content' ? 'Content' : width}
                  />
                </Column>

                <Column>
                  <Placeholder height={!align ? 48 : 64} text="Fluid" />
                </Column>
              </Columns>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
