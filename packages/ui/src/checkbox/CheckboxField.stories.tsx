import {
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@material-ui/core';
import React from 'react';

import { RadioField } from '..';
import { CheckboxField } from './CheckboxField';
import { CheckboxGroupField } from './CheckboxGroudField';

export default { title: 'Inputs/CheckboxField', component: CheckboxField };

export const basic = () => (
  <CheckboxField label="Label" helperText="Helper Text" />
);

export const error = () => (
  <CheckboxField label="Label" helperText="Error Text" error={true} />
);

export const indeterminate = () => (
  <CheckboxField indeterminate={true} label="Label" />
);

export const disabled = () => (
  <CheckboxGroupField label="Disabled">
    <CheckboxField label="Checked" checked={true} disabled={true} />
    <CheckboxField label="Unchecked" checked={false} disabled={true} />
    <CheckboxField
      checked={true}
      disabled={true}
      indeterminate={true}
      label="Checked and Indeterminate"
    />

    <CheckboxField
      checked={false}
      disabled={true}
      indeterminate={true}
      label="Unchecked and Indeterminate"
    />
  </CheckboxGroupField>
);

export const labelPlacement = () => (
  <CheckboxField
    label="Label"
    FormControlLabelProps={{ labelPlacement: 'start' }}
  />
);

export const inlineForm = () => (
  <CheckboxGroupField FormGroupProps={{ row: true }}>
    <FormGroup row={true}>
      <RadioField label="Radio" />
      <CheckboxField label="Checkbox" />
      <FormControlLabel label="Switch" control={<Switch />} />
      <TextField placeholder="Text Field" />
    </FormGroup>
  </CheckboxGroupField>
);
