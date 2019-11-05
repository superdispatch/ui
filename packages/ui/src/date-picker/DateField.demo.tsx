import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  Switch,
  Typography,
} from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import moment from 'moment';
import React, { useState } from 'react';

import { DateField, DatePickerValue } from '..';

export function DateFieldDemo() {
  const [date, setDate] = useState<DatePickerValue>();
  const [disabled, setDisabled] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
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

              <FormControlLabel
                label="With Footer"
                control={<Switch />}
                checked={hasFooter}
                onChange={(_, checked) => setHasFooter(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>

      <DateField
        value={date}
        onChange={setDate}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <DateRange color="action" />
            </InputAdornment>
          ),
        }}
        CalendarProps={{
          fromMonth: !disabled ? undefined : today,
          disabledDays: !disabled ? undefined : { before: today },
          footer: hasFooter && <Typography color="textSecondary">Footer helper text</Typography>,
        }}
      />
    </Box>
  );
}
