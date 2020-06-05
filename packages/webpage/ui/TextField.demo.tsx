import {
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { AccountCircle, Close } from '@material-ui/icons';
import { boolean, select } from '@storybook/addon-knobs';
import { Stack } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { useState } from 'react';

const subscriptionTypes = ['starter', 'pro', 'enterprise'];

export default function TextFieldDemo() {
  const disabled = boolean('Disabled', false);
  const hasLabel = boolean('Has Label', false);
  const hasError = boolean('Has Error', false);
  const isFullWidth = boolean('Full Width', false);
  const isMultiline = boolean('Multiline', false);
  const hasHelperText = boolean('Has Helper Text', false);

  const startIcon = select(
    'Start Icon',
    { None: 'none', Small: 'small', Default: 'default' },
    'none',
  );

  const endIcon = select(
    'End Icon',
    { None: 'none', Small: 'small', Default: 'default' },
    'none',
  );

  const [text, setText] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');

  return (
    <Stack space={2}>
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
          !hasHelperText
            ? undefined
            : hasError
            ? 'Invalid Email'
            : 'Enter your email'
        }
        InputProps={{
          startAdornment: startIcon !== 'none' && (
            <InputAdornment position="start">
              <AccountCircle color="action" fontSize={startIcon} />
            </InputAdornment>
          ),
          endAdornment: endIcon !== 'none' && (
            <InputAdornment position="end">
              <IconButton size="small">
                <Close color="action" fontSize={endIcon} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

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
        SelectProps={{
          startAdornment: startIcon !== 'none' && (
            <InputAdornment position="start">
              <AccountCircle color="action" fontSize={startIcon} />
            </InputAdornment>
          ),
        }}
      >
        {subscriptionTypes.map((x) => (
          <MenuItem key={x} value={x}>
            {startCase(x)}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
