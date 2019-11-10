import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Switch,
} from '@material-ui/core';
import { Snackbar, SnackbarVariant, useSnackbarStack } from '@superdispatch/ui';
import { startCase } from 'lodash';
import { loremIpsum } from 'lorem-ipsum';
import React, { useEffect, useMemo, useState } from 'react';

const variants: SnackbarVariant[] = ['default', 'success', 'error'];

const AUTO_HIDE_DURATION = 5000;

function makeMessage(isLong: boolean) {
  return loremIpsum({ units: 'sentences', count: isLong ? 3 : 1 });
}

export default function SnackbarDemo() {
  const { addSnackbar, clearStack } = useSnackbarStack();
  const [isOpen, setIsOpen] = useState(true);
  const [isLong, setIsLong] = useState(false);
  const [hasCloseButton, setHasCloseButton] = useState(true);
  const [hasAutoHideDuration, setHasAutoHideDuration] = useState(false);
  const [hideProgress, setHideProgress] = useState(0);
  const [variant, setVariant] = useState<SnackbarVariant>('default');

  const key = `${variant}-${isLong}-${hasCloseButton}-${hasAutoHideDuration}`;
  const message = useMemo(() => makeMessage(isLong), [isLong]);

  useEffect(() => {
    if (!isOpen || !hasAutoHideDuration) {
      return;
    }

    let id: number;
    const closesAt = Date.now() + AUTO_HIDE_DURATION;

    function run() {
      const timeLeft = closesAt - Date.now();

      if (timeLeft <= 0) {
        return;
      }

      setHideProgress(100 - Math.ceil((timeLeft * 100) / AUTO_HIDE_DURATION));
      id = requestAnimationFrame(run);
    }

    run();

    return () => {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  }, [key, isOpen, hasAutoHideDuration]);

  return (
    <>
      <Box padding={2}>
        <Grid container={true} spacing={1} alignItems="center">
          <Grid item={true} sm="auto" xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Visual</FormLabel>

              <FormGroup row={true}>
                <FormControlLabel
                  label="Open"
                  control={<Switch />}
                  checked={isOpen}
                  onChange={(_, checked) => setIsOpen(checked)}
                />

                <FormControlLabel
                  label="Long"
                  control={<Switch />}
                  checked={isLong}
                  onChange={(_, checked) => setIsLong(checked)}
                />

                <FormControlLabel
                  label="Has Close Button"
                  control={<Switch />}
                  checked={hasCloseButton}
                  onChange={(_, checked) => setHasCloseButton(checked)}
                />

                <FormControlLabel
                  label="Has Auto Hide"
                  control={<Switch />}
                  checked={hasAutoHideDuration}
                  onChange={(_, checked) => setHasAutoHideDuration(checked)}
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item={true} sm="auto" xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Variant</FormLabel>
              <RadioGroup
                row={true}
                name="variant"
                value={variant}
                onChange={(_, value) => setVariant(value as SnackbarVariant)}
              >
                {variants.map(x => (
                  <FormControlLabel key={x} value={x} control={<Radio />} label={startCase(x)} />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item={true} sm="auto" xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Stack</FormLabel>

              <FormGroup row={true}>
                <Button
                  onClick={() =>
                    addSnackbar(makeMessage(isLong), {
                      variant,
                      hasCloseButton,
                      autoHideDuration: !hasAutoHideDuration ? undefined : AUTO_HIDE_DURATION,
                    })
                  }
                >
                  Add To Stack
                </Button>

                <Button onClick={() => clearStack()}>Clear Stack</Button>
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        key={key}
        open={isOpen}
        variant={variant}
        hasCloseButton={hasCloseButton}
        onClose={() => setIsOpen(false)}
        autoHideDuration={!hasAutoHideDuration ? undefined : AUTO_HIDE_DURATION}
      >
        {!hasAutoHideDuration ? (
          message
        ) : (
          <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" flexGrow={1}>
              {message}
            </Box>
            <Box display="flex" marginLeft={2} flexShrink={0}>
              <CircularProgress
                color="inherit"
                value={hideProgress}
                variant={hideProgress <= 1 ? 'indeterminate' : 'static'}
              />
            </Box>
          </Box>
        )}
      </Snackbar>
    </>
  );
}
