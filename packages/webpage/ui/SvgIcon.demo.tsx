import { SvgIconProps } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { GridStack, InlineGrid } from '@superdispatch/ui';
import React from 'react';

const colors: Array<SvgIconProps['color']> = [
  'inherit',
  'primary',
  'action',
  'disabled',
  'error',
];
const fontSizes: Array<SvgIconProps['fontSize']> = [
  'small',
  'default',
  'large',
];

export default function SvgIconDemo() {
  return (
    <GridStack spacing={2}>
      {colors.map((color) => (
        <InlineGrid key={color} spacing={2}>
          {fontSizes.map((fontSize) => (
            <Check key={fontSize} color={color} fontSize={fontSize} />
          ))}
        </InlineGrid>
      ))}
    </GridStack>
  );
}
