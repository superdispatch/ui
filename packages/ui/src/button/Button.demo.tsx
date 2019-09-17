import { Box, FormControlLabel, Grid, MenuItem, Switch, TextField } from '@material-ui/core';
import { startCase } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';

import { ButtonColor, ThemeProvider } from '..';
import { Button, ButtonProps } from './Button';

const colors: Array<ButtonProps['color']> = ['blue', 'red', 'green'];
const sizes: Array<ButtonProps['size']> = ['small', 'medium', 'large'];
const variants: Array<ButtonProps['variant']> = ['contained', 'outlined'];

export function ButtonDemo() {
  const [color, setColor] = useState<ButtonColor>('blue');
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [lastClicked, setLastClicked] = useState(0);

  useEffect(() => {
    if (!lastClicked) {
      return;
    }

    setIsLoading(true);

    const timeout = setTimeout(() => {
      setLastClicked(0);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [lastClicked]);

  return (
    <ThemeProvider>
      <Box padding={2}>
        <Grid container={true} spacing={1}>
          <Grid item={true} sm={true} xs={12}>
            <TextField
              select={true}
              value={color}
              fullWidth={true}
              onChange={event => setColor(event.target.value as ButtonColor)}
            >
              {colors.map(x => (
                <MenuItem key={x} value={x}>
                  {startCase(x)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item={true} sm={true} xs={12}>
            <FormControlLabel
              label="Disabled"
              control={
                <Switch
                  value={disabled}
                  checked={disabled}
                  onChange={(_, checked) => setDisabled(checked)}
                />
              }
            />
          </Grid>

          <Grid item={true} sm={true} xs={12}>
            <FormControlLabel
              label="Loading"
              control={
                <Switch
                  value={isLoading}
                  checked={isLoading}
                  onChange={(_, checked) => setIsLoading(checked)}
                />
              }
            />
          </Grid>
          <Grid item={true} sm={true} xs={12}>
            <FormControlLabel
              label="Active"
              control={
                <Switch
                  value={isActive}
                  checked={isActive}
                  onChange={(_, checked) => setIsActive(checked)}
                />
              }
            />
          </Grid>
        </Grid>
      </Box>

      <Box padding={2}>
        <Grid container={true} spacing={1}>
          {variants.map(variant => (
            <Fragment key={variant}>
              {sizes.map(size => (
                <Grid item={true} key={variant} sm={4} xs={12}>
                  <Button
                    size={size}
                    color={color}
                    variant={variant}
                    disabled={disabled}
                    isActive={isActive}
                    isLoading={isLoading}
                    onClick={() => setLastClicked(Date.now())}
                  >
                    Stale
                  </Button>
                </Grid>
              ))}
            </Fragment>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
