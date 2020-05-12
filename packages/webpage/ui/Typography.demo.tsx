import { Typography, TypographyProps } from '@material-ui/core';
import { Stack } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React from 'react';

const colors: Array<TypographyProps['color']> = [
  'textPrimary',
  'textSecondary',
  'primary',
  'error',
];

const variants: Array<TypographyProps['variant']> = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
];

export default function TypographyDemo() {
  return (
    <Stack space={2}>
      {colors.map((color) => (
        <Stack key={color} space={1}>
          {variants.map((variant) => (
            <Typography key={variant} color={color} variant={variant}>
              <code>{variant}</code> {startCase(color)}
            </Typography>
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
