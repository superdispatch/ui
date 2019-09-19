import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Check } from '@material-ui/icons';
import { startCase } from 'lodash';
import React, { useState } from 'react';

import { ThemeProvider } from '../theme/ThemeProvider';

type State = 'stale' | 'disabled';
const states: State[] = ['stale', 'disabled'];
const colors: Array<IconButtonProps['color']> = ['primary', 'secondary', 'inherit'];

const sizes: Array<IconButtonProps['size']> = ['small', 'medium'];

export function IconButtonDemo() {
  const [state, setState] = useState<State>('stale');
  const [color, setColor] = useState<IconButtonProps['color']>('primary');

  return (
    <ThemeProvider>
      <Box padding={2}>
        <Grid container={true} spacing={1}>
          <Grid item={true} sm={true} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">State</FormLabel>
              <RadioGroup
                row={true}
                value={state}
                name="state"
                onChange={(_, value) => setState(value as State)}
              >
                {states.map(x => (
                  <FormControlLabel key={x} value={x} control={<Radio />} label={startCase(x)} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item={true} sm={true} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Color</FormLabel>
              <RadioGroup
                row={true}
                name="color"
                value={color}
                onChange={(_, value) => setColor(value as IconButtonProps['color'])}
              >
                {colors.map(x => (
                  <FormControlLabel key={x} value={x} control={<Radio />} label={startCase(x)} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box padding={2}>
        <Grid container={true} spacing={1}>
          {sizes.map(size => (
            <Grid item={true} key={size} sm={2} xs={12}>
              <IconButton size={size} color={color} disabled={state === 'disabled'}>
                <Check />
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
