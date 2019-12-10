import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from '@material-ui/core';
import {
  PhoneField,
  PhoneNumber,
  PhonePossibility,
} from '@superdispatch/phones';
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
    <Box padding={2}>
      <Grid container={true} spacing={2}>
        <Grid item={true}>
          <TextField
            label="Raw"
            value={raw}
            onChange={event => setRaw(event.target.value)}
          />
        </Grid>

        <Grid item={true}>
          <FormControlLabel
            checked={showValidationMessage}
            label="Show Validation Message"
            control={<Switch />}
            onChange={(_, checked) => setShowValidationMessage(checked)}
          />
        </Grid>

        <Grid item={true} xs={true}>
          <PhoneField
            label="Formatted"
            value={phone}
            onChange={setPhone}
            error={!!errorMessage}
            helperText={errorMessage}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
