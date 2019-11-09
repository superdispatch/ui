import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Switch,
} from '@material-ui/core';
import { MoreHoriz, Save, Send } from '@material-ui/icons';
import { startCase } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';

import { Button, ButtonProps } from './Button';

type State = 'stale' | 'disabled' | 'active' | 'loading';
const states: State[] = ['stale', 'disabled', 'active', 'loading'];
const colors: Array<ButtonProps['color']> = ['primary', 'success', 'error'];

const sizes: Array<ButtonProps['size']> = ['small', 'medium', 'large'];
const variants: Array<ButtonProps['variant']> = ['text', 'contained', 'outlined'];

export default function ButtonDemo() {
  const [state, setState] = useState<State>('stale');
  const [color, setColor] = useState<ButtonProps['color']>('primary');
  const [lastClicked, setLastClicked] = useState(0);
  const [hasEndIcon, setHasEndIcon] = useState(false);
  const [hasStartIcon, setHasStartIcon] = useState(false);

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
              <FormLabel component="legend">Content</FormLabel>
              <FormGroup row={true}>
                <FormControlLabel
                  value={hasStartIcon}
                  label="Has Start Icon"
                  control={<Switch />}
                  onChange={(_, checked) => setHasStartIcon(checked)}
                />

                <FormControlLabel
                  value={hasEndIcon}
                  label="Has End Icon"
                  control={<Switch />}
                  onChange={(_, checked) => setHasEndIcon(checked)}
                />
              </FormGroup>
            </FormControl>
          </Grid>

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
                onChange={(_, value) => setColor(value as ButtonProps['color'])}
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
                  <Grid container={true} spacing={1}>
                    <Grid item={true}>
                      <Button
                        size={size}
                        color={color}
                        variant={variant}
                        disabled={state === 'disabled'}
                        isActive={state === 'active'}
                        isLoading={state === 'loading'}
                        startIcon={hasStartIcon && <Save />}
                        endIcon={hasEndIcon && <Send />}
                        onClick={() => setLastClicked(Date.now())}
                      >
                        Button
                      </Button>
                    </Grid>

                    <Grid item={true}>
                      <Button
                        size={size}
                        color={color}
                        variant={variant}
                        disabled={state === 'disabled'}
                        isActive={state === 'active'}
                        isLoading={state === 'loading'}
                        onClick={() => setLastClicked(Date.now())}
                      >
                        <MoreHoriz />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
      </Box>
    </>
  );
}
