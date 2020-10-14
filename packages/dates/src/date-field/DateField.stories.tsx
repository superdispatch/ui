import { InputAdornment } from '@material-ui/core';
import { Meta } from '@storybook/react';
import React from 'react';

import { DateField } from './DateField.playroom';

export default {
  title: 'Dates/DateField',
  component: DateField,
} as Meta;

export const basic = () => <DateField />;

export const advanced = () => (
  <DateField label="Label" placeholder="Placeholder" helperText="Helper Text" />
);

export const errorState = () => (
  <DateField
    label="Label"
    error={true}
    placeholder="Placeholder"
    helperText="Error Text"
  />
);

export const adornment = () => (
  <DateField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Start Adornment:</InputAdornment>
      ),
    }}
  />
);

export const fullWidth = () => <DateField fullWidth={true} />;

export const disabled = () => <DateField disabled={true} />;

export const enableClearable = () => <DateField enableClearable={true} />;

export const disableCloseOnSelect = () => (
  <DateField disableCloseOnSelect={true} />
);

export const customEmptyText = () => (
  <DateField fallback="Never" enableClearable={true} />
);
