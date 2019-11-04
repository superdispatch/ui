import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
  TextField,
} from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import React, { useCallback, useState } from 'react';

export function TextFieldDemo() {
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [hasLabel, setHasLabel] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMultiline, setIsMultiline] = useState(false);
  const [hasHelperText, setHasHelperText] = useState(false);

  const handleChange = useCallback<NonNullable<TextFieldProps['onChange']>>(
    ({ target: { value } }) => setText(value),
    [],
  );

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
                  label="Multiline"
                  control={<Switch />}
                  checked={isMultiline}
                  onChange={(_, checked) => setIsMultiline(checked)}
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
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box padding={2}>
        <Grid container={true} spacing={2}>
          <Grid item={true} xs={12}>
            <TextField
              key={String(isMultiline)}
              id="email"
              value={text}
              onChange={handleChange}
              error={hasError}
              disabled={disabled}
              label={hasLabel && 'Email'}
              multiline={isMultiline}
              helperText={
                !hasHelperText ? undefined : hasError ? 'Invalid Email' : 'Enter your email'
              }
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
