import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { startCase } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';

import { ButtonColor } from '..';
import { Button, ButtonProps } from './Button';

type State = 'stale' | 'disabled' | 'active' | 'loading';
const states: State[] = ['stale', 'disabled', 'active', 'loading'];
const colors: Array<ButtonProps['color']> = ['primary', 'success', 'error'];

const sizes: Array<ButtonProps['size']> = ['small', 'medium', 'large'];
const variants: Array<ButtonProps['variant']> = ['contained', 'outlined'];

export function ButtonDemo() {
  const [state, setState] = useState<State>('stale');
  const [color, setColor] = useState<ButtonColor>('primary');
  const [lastClicked, setLastClicked] = useState(0);

  useEffect(() => {
    if (!lastClicked) {
      return;
    }

    setState('loading');

    const timeout = setTimeout(() => {
      setState('stale');
      setLastClicked(0);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [lastClicked]);

  return (
    <>
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
                onChange={(_, value) => setColor(value as ButtonColor)}
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
          {variants.map(variant => (
            <Fragment key={variant}>
              {sizes.map(size => (
                <Grid item={true} key={size} sm={4} xs={12}>
                  <Button
                    size={size}
                    color={color}
                    variant={variant}
                    disabled={state === 'disabled'}
                    isActive={state === 'active'}
                    isLoading={state === 'loading'}
                    onClick={() => setLastClicked(Date.now())}
                  >
                    Button
                  </Button>
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
      </Box>
    </>
  );
}
