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
import { DateField, DatePickerValue } from '@superdispatch/dates';
import moment from 'moment';
import React, { useState } from 'react';

export default function DateFieldDemo() {
  const [date, setDate] = useState<DatePickerValue>();
  const [disabled, setDisabled] = useState(false);
  const [hasClear, setHasClear] = useState(false);
  const [hasAdornment, setHasAdornment] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const today = moment()
    .startOf('day')
    .toDate();

  return (
    <Box p={2}>
      <Grid container={true} spacing={1}>
        <Grid item={true}>
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
                label="Clearable"
                control={<Switch />}
                checked={hasClear}
                onChange={(_, checked) => setHasClear(checked)}
              />

              <FormControlLabel
                label="Has Adornment"
                control={<Switch />}
                checked={hasAdornment}
                onChange={(_, checked) => setHasAdornment(checked)}
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

        <Grid item={true} xs={12}>
          <DateField
            value={date}
            onChange={setDate}
            hasClearButton={hasClear}
            renderFooter={() =>
              hasFooter && (
                <Typography color="textSecondary">
                  Footer helper text
                </Typography>
              )
            }
            InputProps={{
              startAdornment: hasAdornment && (
                <InputAdornment position="start">Date:</InputAdornment>
              ),
            }}
            CalendarProps={{
              fromMonth: !disabled ? undefined : today,
              disabledDays: !disabled ? undefined : { before: today },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
