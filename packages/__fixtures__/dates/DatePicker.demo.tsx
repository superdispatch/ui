import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';
import {
  DatePicker,
  DatePickerProps,
  DatePickerValue,
  useDateUtils,
} from '@superdispatch/dates';
import React, { useState } from 'react';

const DateInputComponent: DatePickerProps['InputComponent'] = ({
  value,
  ...props
}) => {
  const utils = useDateUtils();
  return <input value={!value ? '' : utils.formatDate(value)} {...props} />;
};

export default function DatePickerDemo() {
  const utils = useDateUtils();
  const [date, setDate] = useState<DatePickerValue>();
  const [disabled, setDisabled] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const today = utils.startOf(Date.now(), 'day');

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

      <DatePicker
        value={date}
        onChange={setDate}
        fromMonth={!disabled ? undefined : today}
        disabledDays={!disabled ? undefined : { before: today }}
        InputComponent={DateInputComponent}
        footer={
          hasFooter && (
            <Typography color="textSecondary">Footer helper text</Typography>
          )
        }
      />

      <pre>{JSON.stringify({ date }, null, 2)}</pre>
    </Box>
  );
}
