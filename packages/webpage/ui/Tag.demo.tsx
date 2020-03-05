import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { GridStack, InlineGrid, Tag, TagProps } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { useState } from 'react';

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
  const [color, setColor] = useState<TagProps['color']>('blue');

  return (
    <GridStack spacing={2}>
      <FormControl>
        <FormLabel>Color</FormLabel>
        <RadioGroup
          row={true}
          name="color"
          value={color}
          onChange={(_, value) => setColor(value as TagProps['color'])}
        >
          {colors.map(x => (
            <FormControlLabel
              key={x}
              value={x}
              control={<Radio />}
              label={startCase(x)}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <InlineGrid spacing={2}>
        {variants.map(variant => (
          <Tag key={variant} color={color} variant={variant}>
            {startCase(variant)} {startCase(color)}
          </Tag>
        ))}
      </InlineGrid>
    </GridStack>
  );
}
