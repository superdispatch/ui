import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
} from '@material-ui/core';
import { TimeField } from '@superdispatch/dates';
import React, { useState } from 'react';

export default function TimeFieldDemo() {
  const [value, setValue] = useState<Date>();
  const [disabled, setDisabled] = useState(false);
  const [hasLabel, setHasLabel] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [hasHelperText, setHasHelperText] = useState(false);
  const [hasStartIcon, setHasStartIcon] = useState(false);
  const [hasEndIcon, setHasEndIcon] = useState(false);

  return (
    <>
      <Box padding={2}>
        <Grid container={true} spacing={1}>
          <Grid item={true} sm={true} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Visual</FormLabel>

              <FormGroup row={true}>
                <FormControlLabel
                  label="Disabled"
                  control={<Switch />}
                  checked={disabled}
                  onChange={(_, checked) => setDisabled(checked)}
                />

                <FormControlLabel
                  label="Full width"
                  control={<Switch />}
                  checked={isFullWidth}
                  onChange={(_, checked) => setIsFullWidth(checked)}
                />

                <FormControlLabel
                  label="Has Label"
                  control={<Switch />}
                  checked={hasLabel}
                  onChange={(_, checked) => setHasLabel(checked)}
                />

                <FormControlLabel
                  label="Has Error"
                  control={<Switch />}
                  checked={hasError}
                  onChange={(_, checked) => setHasError(checked)}
                />

                <FormControlLabel
                  label="Has Helper Text"
                  control={<Switch />}
                  checked={hasHelperText}
                  onChange={(_, checked) => setHasHelperText(checked)}
                />

                <FormControlLabel
                  label="Has Start Icon"
                  control={<Switch />}
                  checked={hasStartIcon}
                  onChange={(_, checked) => setHasStartIcon(checked)}
                />

                <FormControlLabel
                  label="Has End Icon"
                  control={<Switch />}
                  checked={hasEndIcon}
                  onChange={(_, checked) => setHasEndIcon(checked)}
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box padding={2}>
        <Grid container={true} spacing={2}>
          <Grid item={true} sm={3} xs={12}>
            <TimeField
              id="time"
              value={value}
              onChange={setValue}
              error={hasError}
              fullWidth={isFullWidth}
              disabled={disabled}
              label={hasLabel && 'Email'}
              helperText={
                !hasHelperText
                  ? undefined
                  : hasError
                  ? 'Invalid Email'
                  : 'Enter your email'
              }
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
