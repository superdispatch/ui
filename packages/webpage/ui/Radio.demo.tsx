import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from '@material-ui/core';
import { GridStack } from '@superdispatch/ui';
import React, { useState } from 'react';

export default function RadioDemo() {
  const [selected, setSelected] = useState<string>();
  const [isChecked, setIsChecked] = useState(false);

  return (
    <GridStack spacing={2}>
      <FormControl>
        <FormLabel>Label Position</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel label="Right Label" control={<Radio />} />

          <FormControlLabel
            label="Left Label"
            labelPlacement="start"
            control={<Radio />}
          />
        </FormGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Readonly</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel checked={true} label="On" control={<Radio />} />

          <FormControlLabel checked={false} label="Off" control={<Radio />} />
        </FormGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Disabled</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            label="On"
            checked={true}
            disabled={true}
            control={<Radio />}
          />

          <FormControlLabel
            label="Off"
            checked={false}
            disabled={true}
            control={<Radio />}
          />
        </FormGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Vertical</FormLabel>

        <RadioGroup
          name="vertical"
          value={selected}
          onChange={({ target }) => setSelected(target.value)}
        >
          <FormControlLabel label="One" value="1" control={<Radio />} />
          <FormControlLabel label="Two" value="2" control={<Radio />} />
          <FormControlLabel label="Three" value="3" control={<Radio />} />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Inline Form</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            label="Checkbox"
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
            control={<Checkbox />}
          />
          <FormControlLabel
            label="Switch"
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
            control={<Switch />}
          />
          <FormControlLabel
            label="Radio"
            checked={isChecked}
            onChange={(_, checked) => setIsChecked(checked)}
            control={<Radio />}
          />

          <TextField placeholder="Text Field" />
        </FormGroup>
      </FormControl>
    </GridStack>
  );
}
