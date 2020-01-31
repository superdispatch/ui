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
  DateRangePicker,
  DateRangePickerProps,
  DateRangePickerQuickSelectionItem,
  DateRangePickerValue,
  toDateRange,
  useDateUtils,
} from '@superdispatch/dates';
import React, { useMemo, useState } from 'react';

const DateRangeInputComponent: DateRangePickerProps['InputComponent'] = ({
  value,
  ...props
}) => {
  const utils = useDateUtils();
  const range = toDateRange(value);
  return <input value={utils.formatDateRange(range)} {...props} />;
};

export default function DateRangePickerDemo() {
  const utils = useDateUtils();
  const [range, setRange] = useState<DateRangePickerValue>();
  const [disabled, setDisabled] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const [hasQuickSelection, setHasQuickSelection] = useState(false);

  const today = useMemo(() => utils.startOf(Date.now(), 'day'), [utils]);

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

              <FormControlLabel
                label="With Quick Selection"
                control={<Switch />}
                checked={hasQuickSelection}
                onChange={(_, checked) => setHasQuickSelection(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>

      <DateRangePicker
        value={range}
        onChange={setRange}
        numberOfMonths={2}
        fromMonth={!disabled ? undefined : today}
        disabledDays={!disabled ? undefined : { before: today }}
        quickSelectionItems={
          !hasQuickSelection
            ? undefined
            : Array.from(
                { length: 8 },
                (_, idx): DateRangePickerQuickSelectionItem => ({
                  label: `${idx + 2} days`,
                  value: [today, utils.plus(today, { day: idx + 1 })],
                }),
              )
        }
        InputComponent={DateRangeInputComponent}
        footer={
          hasFooter && (
            <Typography color="textSecondary">
              Selected date range allows preferred carriers to instantly book
              loads inside the Super Loadboard.
              <br />
              Dates out of selected range will still be available to request.
            </Typography>
          )
        }
      />

      <pre>{JSON.stringify({ range }, null, 2)}</pre>
    </Box>
  );
}
