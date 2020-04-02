import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  TextField,
} from '@material-ui/core';
import {
  PhoneField,
  PhoneNumber,
  PhonePossibility,
} from '@superdispatch/phones';
import { GridStack } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

export default function PhoneFieldDemo() {
  const [raw, setRaw] = useState('+1');
  const [phone, setPhone] = useState(() => PhoneNumber.fromInternational(raw));
  const [showValidationMessage, setShowValidationMessage] = useState(true);
  const possibility = useMemo<PhonePossibility>(
    () =>
      !showValidationMessage ? 'is-possible' : PhoneNumber.validate(phone),
    [phone, showValidationMessage],
  );
  const errorMessage =
    possibility === 'is-possible'
      ? undefined
      : `Invalid phone number (${startCase(possibility)})`;

  useEffect(() => setPhone(PhoneNumber.fromInternational(raw)), [raw]);

  return (
    <GridStack spacing={2}>
      <TextField
        label="Raw"
        value={raw}
        onChange={(event) => setRaw(event.target.value)}
      />

      <FormControl>
        <FormLabel>Visibility</FormLabel>
        <FormGroup row={true}>
          <FormControlLabel
            checked={showValidationMessage}
            label="Show Validation Message"
            control={<Switch />}
            onChange={(_, checked) => setShowValidationMessage(checked)}
          />
        </FormGroup>
      </FormControl>

      <PhoneField
        label="Formatted"
        value={phone}
        onChange={setPhone}
        error={!!errorMessage}
        helperText={errorMessage}
      />
    </GridStack>
  );
}
