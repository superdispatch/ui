import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { Check } from '@material-ui/icons';
import { GridStack, InlineGrid } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { useState } from 'react';

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
  const [color, setColor] = useState<SvgIconProps['color']>('primary');

  return (
    <GridStack spacing={2}>
      <FormControl>
        <FormLabel>Color</FormLabel>
        <RadioGroup
          row={true}
          name="color"
          value={color}
          onChange={(_, value) => setColor(value as SvgIconProps['color'])}
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
        {fontSizes.map(fontSize => (
          <Check key={fontSize} color={color} fontSize={fontSize} />
        ))}
      </InlineGrid>
    </GridStack>
  );
}
