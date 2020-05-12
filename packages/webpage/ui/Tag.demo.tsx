import { Inline, Stack, Tag, TagProps } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React from 'react';

const colors: Array<TagProps['color']> = [
  'grey',
  'blue',
  'green',
  'purple',
  'red',
  'teal',
  'yellow',
];
const variants: Array<TagProps['variant']> = ['subtle', 'bold'];

export default function TagDemo() {
  return (
    <Stack space={2}>
      {colors.map((color) => (
        <Inline key={color} space={2}>
          {variants.map((variant) => (
            <Tag key={variant} color={color} variant={variant}>
              {startCase(variant)} {startCase(color)}
            </Tag>
          ))}
        </Inline>
      ))}
    </Stack>
  );
}
