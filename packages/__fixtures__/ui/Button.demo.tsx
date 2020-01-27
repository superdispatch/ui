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
import { Button, ButtonProps, Color } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { Fragment, MouseEvent, useEffect, useState } from 'react';

type State = 'stale' | 'disabled' | 'active' | 'loading';
const states: State[] = ['stale', 'disabled', 'active', 'loading'];
const colors: Array<ButtonProps['color']> = [
  'primary',
  'success',
  'error',
  'white',
];

const sizes: Array<ButtonProps['size']> = ['small', 'medium', 'large'];
const variants: Array<ButtonProps['variant']> = [
  'text',
  'outlined',
  'contained',
];

export default function ButtonDemo() {
  const [buttonStateMap, setButtonStateMap] = useState<Map<string, State>>(
    new Map(),
  );
  const [globalState, setGlobalState] = useState<State>('stale');
  const [color, setColor] = useState<ButtonProps['color']>('primary');
  const [hasEndIcon, setHasEndIcon] = useState(false);
  const [hasStartIcon, setHasStartIcon] = useState(false);

  useEffect(() => {
    if (buttonStateMap.size === 0) {
      return;
    }

    const timeout = setTimeout(() => setButtonStateMap(new Map()), 1000);
    return () => clearTimeout(timeout);
  }, [buttonStateMap]);

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
                value={globalState}
                name="state"
                onChange={(_, value) => setGlobalState(value as State)}
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
                  <FormControlLabel
                    key={x}
                    value={x}
                    control={<Radio />}
                    label={startCase(x)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box padding={2} bgcolor={color === 'white' ? Color.Grey500 : undefined}>
        <Grid container={true} spacing={1}>
          {variants.map(variant => (
            <Fragment key={variant}>
              {sizes.map(size => {
                const buttonKey = `${variant}-${size}`;
                const buttonState =
                  buttonStateMap.get(buttonKey) || globalState;
                const props: ButtonProps = {
                  size,
                  color,
                  variant,
                  disabled: buttonState === 'disabled',
                  isActive: buttonState === 'active',
                  isLoading: buttonState === 'loading',
                  onClick: (event: MouseEvent) => {
                    if (event.shiftKey) {
                      return;
                    }

                    setButtonStateMap(prev =>
                      new Map(prev).set(
                        buttonKey,
                        event.altKey ? 'disabled' : 'loading',
                      ),
                    );
                  },
                };

                return (
                  <Grid item={true} key={size} sm={4} xs={12}>
                    <Grid container={true} spacing={1}>
                      <Grid item={true}>
                        <Button
                          {...props}
                          startIcon={hasStartIcon && <Save />}
                          endIcon={hasEndIcon && <Send />}
                        >
                          Button
                        </Button>
                      </Grid>

                      <Grid item={true}>
                        <Button {...props}>
                          <MoreHoriz />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Fragment>
          ))}
        </Grid>
      </Box>
    </>
  );
}
