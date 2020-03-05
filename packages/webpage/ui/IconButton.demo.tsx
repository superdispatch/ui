import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Check } from '@material-ui/icons';
import { GridStack, InlineGrid } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { useState } from 'react';

type State = 'stale' | 'disabled';
const states: State[] = ['stale', 'disabled'];
const colors: Array<IconButtonProps['color']> = [
  'default',
  'primary',
  'inherit',
];

const sizes: Array<IconButtonProps['size']> = ['small', 'medium'];

export default function IconButtonDemo() {
  const [state, setState] = useState<State>('stale');
  const [color, setColor] = useState<IconButtonProps['color']>('default');

  return (
    <GridStack spacing={2}>
      <FormControl>
        <FormLabel>State</FormLabel>
        <RadioGroup
          row={true}
          value={state}
          name="state"
          onChange={(_, value) => setState(value as State)}
        >
          {states.map(x => (
            <FormControlLabel
              key={x}
              value={x}
              control={<Radio />}
              label={startCase(x)}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Color</FormLabel>
        <RadioGroup
          row={true}
          name="color"
          value={color}
          onChange={(_, value) => setColor(value as IconButtonProps['color'])}
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
        {sizes.map(size => (
          <IconButton
            key={size}
            size={size}
            color={color}
            disabled={state === 'disabled'}
          >
            <Check />
          </IconButton>
        ))}
      </InlineGrid>
    </GridStack>
  );
}
