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
  DateContextProvider,
  DateField,
  DateUtils,
  stringifyDate,
} from '@superdispatch/dates';
import React, { useMemo, useState } from 'react';

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

export default function DateFieldDemo() {
  const [date, setDate] = useState<undefined | Date>();
  const [timeZoneOffset, setTimeZoneOffset] = useState<number>(0);
  const [disabled, setDisabled] = useState(false);
  const [hasClear, setHasClear] = useState(false);
  const [hasAdornment, setHasAdornment] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);

  const dateUtils = useMemo(() => new DateUtils({ timeZoneOffset }), [
    timeZoneOffset,
  ]);

  const today = dateUtils.startOf(Date.now(), 'day');

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
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <DateContextProvider timeZoneOffset={timeZoneOffset}>
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
          </DateContextProvider>
        </Grid>
        <Grid item={true} xs={12}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">UTC</TableCell>
                <TableCell>
                  {date && (
                    <>
                      {utcDateUtils.formatDateTime(date)} (
                      {stringifyDate(date, 'DateTimeISO')})
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
                    {date && dateUtils.formatDateTime(date)}
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
