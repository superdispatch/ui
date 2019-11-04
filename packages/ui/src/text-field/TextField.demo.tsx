import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
} from '@material-ui/core';
import { startCase } from 'lodash';
import React, { useState } from 'react';

const subscriptionTypes = ['starter', 'pro', 'enterprise'];

export function TextFieldDemo() {
  const [text, setText] = useState('');
  const [subscriptionType, setSubscriptionType] = useState<null | string>(null);
  const [disabled, setDisabled] = useState(false);
  const [hasLabel, setHasLabel] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [isMultiline, setIsMultiline] = useState(false);
  const [hasHelperText, setHasHelperText] = useState(false);

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
          <Grid item={true} sm={3} xs={12}>
            <TextField
              id="email"
              value={text}
              onChange={({ target: { value } }) => setText(value)}
              error={hasError}
              fullWidth={isFullWidth}
              disabled={disabled}
              label={hasLabel && 'Email'}
              multiline={isMultiline}
              helperText={
                !hasHelperText ? undefined : hasError ? 'Invalid Email' : 'Enter your email'
              }
            />
          </Grid>

          <Grid item={true} sm={3} xs={12}>
            <TextField
              id="subscription"
              select={true}
              value={subscriptionType}
              fullWidth={isFullWidth}
              error={hasError}
              disabled={disabled}
              label={hasLabel && 'Subscription Type'}
              onChange={({ target: { value } }) => setSubscriptionType(value)}
              helperText={
                !hasHelperText
                  ? undefined
                  : hasError
                  ? 'Invalid subscription type'
                  : 'Choose subscription type'
              }
            >
              {subscriptionTypes.map(x => (
                <MenuItem key={x} value={x}>
                  {startCase(x)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
