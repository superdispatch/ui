import {
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@material-ui/core';
import {
  CheckboxField,
  CheckboxGroupField,
  GridStack,
  RadioField,
} from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { useState } from 'react';

const options = ['one', 'two', 'three'];

export default function CheckboxDemo() {
  const [selected, setSelected] = useState(new Set<string>());
  const errorMessage =
    selected.size === 0
      ? undefined
      : !selected.has('two')
      ? 'It’s not two'
      : selected.size > 1
      ? 'It’s not only two'
      : undefined;

  const [isChecked, setIsChecked] = useState(false);

  return (
    <GridStack spacing={2}>
      <CheckboxGroupField label="Label Position" FormGroupProps={{ row: true }}>
        <CheckboxField label="Right Label" />

        <CheckboxField
          label="Left Label"
          FormControlLabelProps={{ labelPlacement: 'start' }}
        />
      </CheckboxGroupField>

      <CheckboxGroupField label="Readonly" FormGroupProps={{ row: true }}>
        <CheckboxField checked={true} label="On" />

        <CheckboxField checked={false} label="Off" />

        <CheckboxField
          checked={true}
          label="Indeterminate"
          indeterminate={true}
        />
      </CheckboxGroupField>

      <CheckboxGroupField label="Disabled" FormGroupProps={{ row: true }}>
        <CheckboxField label="On" checked={true} disabled={true} />

        <CheckboxField label="Off" checked={false} disabled={true} />

        <CheckboxField
          checked={true}
          disabled={true}
          label="Indeterminate"
          indeterminate={true}
        />
      </CheckboxGroupField>

      <CheckboxGroupField
        label="Vertical"
        error={!!errorMessage}
        helperText={errorMessage || 'Select two'}
      >
        {options.map((option) => (
          <CheckboxField
            key={option}
            label={startCase(option)}
            checked={selected.has(option)}
            onChange={(_, checked) =>
              setSelected((prev) => {
                const next = new Set<string>(prev);
                if (checked) {
                  next.add(option);
                } else {
                  next.delete(option);
                }
                return next;
              })
            }
          />
        ))}
      </CheckboxGroupField>

      <CheckboxGroupField label="Inline Form" FormGroupProps={{ row: true }}>
        <FormGroup row={true}>
          <RadioField
            label="Radio"
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />
          <CheckboxField
            label="Checkbox"
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />
          <FormControlLabel
            label="Switch"
            control={<Switch />}
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
          />

          <TextField placeholder="Text Field" />
        </FormGroup>
      </CheckboxGroupField>
    </GridStack>
  );
}
