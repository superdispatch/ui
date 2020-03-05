import { Typography, TypographyProps } from '@material-ui/core';
import { GridStack } from '@superdispatch/ui';
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
    <GridStack spacing={2}>
      {colors.map(color => (
        <GridStack key={color} spacing={1}>
          {variants.map(variant => (
            <Typography key={variant} color={color} variant={variant}>
              <code>{variant}</code> {startCase(color)}
            </Typography>
          ))}
        </GridStack>
      ))}
    </GridStack>
  );
}
