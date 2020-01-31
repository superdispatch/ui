import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  CalendarQuickSelection,
  CalendarQuickSelectionItem,
  DateRange,
  DateRangeField,
  DateUtils,
  isSameDateRange,
  stringifyDate,
} from '@superdispatch/dates';
import React, { useEffect, useMemo, useState } from 'react';

const utcDateUtils = new DateUtils({ timeZoneOffset: 0 });

function formatUTC(offset: number): string {
  let out = 'UTC';

  if (offset > 0) {
    out += '+';
  }

  if (offset !== 0) {
    out += offset / 60;
  }

  return out;
}

const utcOptions = Array.from({ length: 24 }, (_, idx) => {
  const value = (idx - 12) * 60;
  return { value, label: formatUTC(value) };
});

export default function DateRangeFieldDemo() {
  const [range, setRange] = useState<DateRange>();
  const [timeZoneOffset, setTimeZoneOffset] = useState<number>(0);
  const [disabled, setDisabled] = useState(false);
  const [hasClear, setHasClear] = useState(false);
  const [hasAdornment, setHasAdornment] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const [hasQuickSelection, setHasQuickSelection] = useState(false);

  const dateUtils = useMemo(() => new DateUtils({ timeZoneOffset }), [
    timeZoneOffset,
  ]);

  const today = useMemo(() => dateUtils.startOf(Date.now(), 'day'), [
    dateUtils,
  ]);

  useEffect(() => {
    setRange(prev =>
      !prev
        ? prev
        : [
            prev[0] && dateUtils.startOf(prev[0], 'day'),
            prev[1] && dateUtils.endOf(prev[1], 'day'),
          ],
    );
  }, [dateUtils]);

  return (
    <Box p={2}>
      <Grid container={true} spacing={1}>
        <Grid item={true}>
          <TextField
            select={true}
            label="Time Zone"
            value={timeZoneOffset}
            onChange={event => setTimeZoneOffset(Number(event.target.value))}
          >
            {utcOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

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

              <FormControlLabel
                label="With Quick Selection"
                control={<Switch />}
                checked={hasQuickSelection}
                onChange={(_, checked) => setHasQuickSelection(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <DateRangeField
            value={range}
            onChange={setRange}
            hasClearButton={hasClear}
            renderFooter={() =>
              hasFooter && (
                <Typography color="textSecondary">
                  Selected date range allows preferred carriers to instantly
                  book loads inside the Super Loadboard.
                  <br />
                  Dates out of selected range will still be available to
                  request.
                </Typography>
              )
            }
            renderQuickSelection={({ change }) =>
              hasQuickSelection && (
                <CalendarQuickSelection>
                  {Array.from({ length: 5 }, (_, idx) => {
                    const targetRange: [Date, Date] = [
                      today,
                      dateUtils.plus(today, { day: idx + 1 }),
                    ];

                    return (
                      <CalendarQuickSelectionItem
                        key={idx}
                        onClick={() => change(targetRange)}
                        selected={isSameDateRange(range, targetRange)}
                      >
                        {idx + 2} days
                      </CalendarQuickSelectionItem>
                    );
                  })}
                </CalendarQuickSelection>
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

        <Grid item={true} xs={12}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">UTC</TableCell>
                <TableCell>
                  {range?.[0] && (
                    <>
                      {utcDateUtils.formatDateTime(range[0])}
                      <br />
                      {stringifyDate(range[0], 'DateTimeISO')}
                    </>
                  )}
                </TableCell>

                <TableCell>
                  {range?.[1] && (
                    <>
                      {utcDateUtils.formatDateTime(range[1])}
                      <br />
                      {stringifyDate(range[1], 'DateTimeISO')}
                    </>
                  )}
                </TableCell>
              </TableRow>

              {timeZoneOffset !== 0 && (
                <TableRow>
                  <TableCell variant="head">
                    {formatUTC(timeZoneOffset)}
                  </TableCell>

                  <TableCell>
                    {range?.[0] && dateUtils.formatDateTime(range[0])}
                  </TableCell>

                  <TableCell>
                    {range?.[1] && dateUtils.formatDateTime(range[1])}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Box>
  );
}
