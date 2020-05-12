import { SvgIconProps } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { Inline, Stack } from '@superdispatch/ui';
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
    <Stack space={2}>
      {colors.map((color) => (
        <Inline key={color} space={2}>
          {fontSizes.map((fontSize) => (
            <Check key={fontSize} color={color} fontSize={fontSize} />
          ))}
        </Inline>
      ))}
    </Stack>
  );
}
