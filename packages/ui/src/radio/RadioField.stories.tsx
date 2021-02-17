import {
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@material-ui/core';
import { CheckboxField, RadioField, RadioGroupField } from '..';

export default { title: 'Inputs/RadioField', component: RadioField };

export const basic = () => (
  <RadioField label="Label" helperText="Helper Text" />
);

export const error = () => (
  <RadioField label="Label" helperText="Error Text" error={true} />
);

export const disabled = () => (
  <RadioGroupField label="Disabled">
    <RadioField label="Checked" checked={true} disabled={true} />
    <RadioField label="Unchecked" checked={false} disabled={true} />
  </RadioGroupField>
);

export const labelPlacement = () => (
  <RadioField
    label="Label"
    FormControlLabelProps={{ labelPlacement: 'start' }}
  />
);

export const inlineForm = () => (
  <RadioGroupField RadioGroupProps={{ row: true }}>
    <FormGroup row={true}>
      <RadioField label="Radio" />
      <CheckboxField label="Checkbox" />
      <FormControlLabel label="Switch" control={<Switch />} />
      <TextField placeholder="Text Field" />
    </FormGroup>
  </RadioGroupField>
);
