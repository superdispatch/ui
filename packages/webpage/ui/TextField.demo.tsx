import { InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { boolean } from '@storybook/addon-knobs';
import { GridStack } from '@superdispatch/ui';
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
  const hasStartIcon = boolean('Has Start Icon', false);
  const hasEndIcon = boolean('Has End Icon', false);

  const [text, setText] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');

  return (
    <GridStack spacing={2}>
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
          startAdornment: hasStartIcon && (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
          endAdornment: hasEndIcon && (
            <InputAdornment position="end">
              <AccountCircle />
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
        InputProps={{
          startAdornment: hasStartIcon && (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      >
        {subscriptionTypes.map(x => (
          <MenuItem key={x} value={x}>
            {startCase(x)}
          </MenuItem>
        ))}
      </TextField>
    </GridStack>
  );
}
