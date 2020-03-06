import { GridStack, InlineGrid, Tag, TagProps } from '@superdispatch/ui';
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
    <GridStack spacing={2}>
      {colors.map(color => (
        <InlineGrid key={color} spacing={2}>
          {variants.map(variant => (
            <Tag key={variant} color={color} variant={variant}>
              {startCase(variant)} {startCase(color)}
            </Tag>
          ))}
        </InlineGrid>
      ))}
    </GridStack>
  );
}
