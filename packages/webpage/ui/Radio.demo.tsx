import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  TextField,
} from '@material-ui/core';
import {
  CheckboxField,
  GridStack,
  RadioField,
  RadioGroupField,
} from '@superdispatch/ui';
import React, { useState } from 'react';

export default function RadioDemo() {
  const [selected, setSelected] = useState<string>();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <GridStack spacing={2}>
      <FormControl>
        <FormLabel>Label Position</FormLabel>
        <FormGroup row={true}>
          <RadioField label="Right Label" />

          <RadioField
            label="Left Label"
            FormControlLabelProps={{ labelPlacement: 'start' }}
          />
        </FormGroup>
      </FormControl>

      <RadioGroupField label="Readonly" RadioGroupProps={{ row: true }}>
        <RadioField checked={true} label="On" />

        <RadioField checked={false} label="Off" />
      </RadioGroupField>

      <RadioGroupField label="Disabled" RadioGroupProps={{ row: true }}>
        <RadioField label="On" checked={true} disabled={true} />

        <RadioField label="Off" checked={false} disabled={true} />
      </RadioGroupField>

      <RadioGroupField
        label="Vertical"
        value={selected}
        onChange={({ target }) => setSelected(target.value)}
      >
        <RadioField label="One" value="1" />
        <RadioField label="Two" value="2" />
        <RadioField label="Three" value="3" />
      </RadioGroupField>

      <FormControl>
        <FormLabel>Inline Form</FormLabel>
        <FormGroup row={true}>
          <CheckboxField
            label="Checkbox"
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />
          <FormControlLabel
            label="Switch"
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
            control={<Switch />}
          />
          <RadioField
            label="Radio"
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />

          <TextField placeholder="Text Field" />
        </FormGroup>
      </FormControl>
    </GridStack>
  );
}
