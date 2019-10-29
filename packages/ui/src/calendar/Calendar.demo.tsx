import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
} from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';

import { Calendar } from '..';

export function CalendarDemo() {
  const [disabled, setDisabled] = useState(false);
  const today = moment()
    .startOf('day')
    .toDate();

  return (
    <Box p={2}>
      <Grid container={true} spacing={1}>
        <Grid item={true} sm={true} xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">State</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel
                label="Disabled"
                control={<Switch />}
                checked={disabled}
                onChange={(_, checked) => setDisabled(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Calendar disabledDays={!disabled ? undefined : { before: today }} />
    </Box>
  );
}
