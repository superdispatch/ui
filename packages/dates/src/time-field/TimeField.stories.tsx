import { InputAdornment } from '@material-ui/core';
import React from 'react';

import { TimeField } from './TimeField.playroom';

export default { title: 'Dates/TimeField', component: TimeField };

export const basic = () => <TimeField />;

export const advanced = () => (
  <TimeField label="Label" placeholder="Placeholder" helperText="Helper Text" />
);

export const errorState = () => (
  <TimeField
    label="Label"
    error={true}
    placeholder="Placeholder"
    helperText="Error Text"
  />
);

export const adornment = () => (
  <TimeField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Start Adornment:</InputAdornment>
      ),
    }}
  />
);

export const disabled = () => <TimeField disabled={true} />;
