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
  DateRange,
  DateRangeField,
  DateUtils,
  stringifyDate,
  TimeField,
  toDateRange,
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

const offsetOptions = Array.from({ length: 10 }, (_, idx) => (idx - 6) * 60);

export default function PickersDemo() {
  const [range, setRange] = useState<DateRange>([]);
  const [timeZoneOffset, setTimeZoneOffset] = useState(0);

  const [disabled, setDisabled] = useState(false);
  const [hasLabel, setHasLabel] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [hasHelperText, setHasHelperText] = useState(false);
  const [hasClear, setHasClear] = useState(false);
  const [hasAdornment, setHasAdornment] = useState(false);
  const [disableCloseOnSelect, setDisableCloseOnSelect] = useState(false);

  const utils = useMemo(() => new DateUtils({ timeZoneOffset }), [
    timeZoneOffset,
  ]);

  return (
    <Box padding={2}>
      <Grid container={true} spacing={2}>
        <Grid item={true}>
          <TextField
            select={true}
            label="TimeZone Offset"
            value={timeZoneOffset}
            onChange={event => setTimeZoneOffset(Number(event.target.value))}
          >
            {offsetOptions.map(option => (
              <MenuItem key={option} value={option}>
                {formatUTC(option)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item={true}>
          <FormControl>
            <FormLabel>Visual</FormLabel>

            <FormGroup row={true}>
              <FormControlLabel
                label="Disabled"
                control={<Switch />}
                checked={disabled}
                onChange={(_, checked) => setDisabled(checked)}
              />

              <FormControlLabel
                label="Full width"
                control={<Switch />}
                checked={isFullWidth}
                onChange={(_, checked) => setIsFullWidth(checked)}
              />

              <FormControlLabel
                label="Label"
                control={<Switch />}
                checked={hasLabel}
                onChange={(_, checked) => setHasLabel(checked)}
              />

              <FormControlLabel
                label="Error"
                control={<Switch />}
                checked={hasError}
                onChange={(_, checked) => setHasError(checked)}
              />

              <FormControlLabel
                label="Helper Text"
                control={<Switch />}
                checked={hasHelperText}
                onChange={(_, checked) => setHasHelperText(checked)}
              />

              <FormControlLabel
                label="Clearable"
                control={<Switch />}
                checked={hasClear}
                onChange={(_, checked) => setHasClear(checked)}
              />

              <FormControlLabel
                label="Disable Close on Select"
                control={<Switch />}
                checked={disableCloseOnSelect}
                onChange={(_, checked) => setDisableCloseOnSelect(checked)}
              />

              <FormControlLabel
                label="Has Adornment"
                control={<Switch />}
                checked={hasAdornment}
                onChange={(_, checked) => setHasAdornment(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <DateContextProvider timeZoneOffset={timeZoneOffset}>
          <Grid item={true} xs={12}>
            <Typography variant="h3">Date Field</Typography>
          </Grid>
          <Grid item={true} xs={12}>
            <DateField
              value={range[0]}
              disabled={disabled}
              onChange={value => setRange(toDateRange([value, range[1]]))}
              hasClearButton={hasClear}
              disableCloseOnSelect={disableCloseOnSelect}
              fullWidth={isFullWidth}
              InputProps={{
                startAdornment: hasAdornment && (
                  <InputAdornment position="start">Date:</InputAdornment>
                ),
              }}
              label={hasLabel && 'Date'}
              helperText={
                !hasHelperText
                  ? undefined
                  : hasError
                  ? 'Invalid Date'
                  : 'Pick Date'
              }
            />
          </Grid>

          <Grid item={true} xs={12}>
            <Typography variant="h3">Date Range Field</Typography>
          </Grid>
          <Grid item={true} xs={12}>
            <DateRangeField
              value={range}
              disabled={disabled}
              onChange={value => setRange(toDateRange(value))}
              hasClearButton={hasClear}
              disableCloseOnSelect={disableCloseOnSelect}
              fullWidth={isFullWidth}
              InputProps={{
                startAdornment: hasAdornment && (
                  <InputAdornment position="start">Date:</InputAdornment>
                ),
              }}
              label={hasLabel && 'Date Range'}
              helperText={
                !hasHelperText
                  ? undefined
                  : hasError
                  ? 'Invalid Rate Range'
                  : 'Pick Date Range'
              }
            />
          </Grid>

          <Grid item={true} xs={12}>
            <Typography variant="h3">Time Field</Typography>
          </Grid>

          <Grid item={true} xs={12}>
            <TimeField
              id="time"
              value={range[0]}
              disabled={disabled}
              onChange={value => setRange(toDateRange([value, range[1]]))}
              error={hasError}
              fullWidth={isFullWidth}
              label={hasLabel && 'Time'}
              helperText={
                !hasHelperText
                  ? undefined
                  : hasError
                  ? 'Invalid Time'
                  : 'Enter Time'
              }
            />
          </Grid>
        </DateContextProvider>

        <Grid item={true} xs={12}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell variant="head">ISO</TableCell>
                <TableCell>
                  {range[0] && stringifyDate(range[0], 'DateTimeISO')}
                </TableCell>

                <TableCell>
                  {range[1] && stringifyDate(range[1], 'DateTimeISO')}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell variant="head">UTC</TableCell>
                <TableCell>
                  {range[0] && utcDateUtils.format(range[0], 'dateTime')}
                </TableCell>

                <TableCell>
                  {range[1] && utcDateUtils.format(range[1], 'dateTime')}
                </TableCell>
              </TableRow>

              {timeZoneOffset !== 0 && (
                <TableRow>
                  <TableCell variant="head">
                    {formatUTC(timeZoneOffset)}
                  </TableCell>
                  <TableCell>
                    {range[0] && utils.format(range[0], 'dateTime')}
                  </TableCell>

                  <TableCell>
                    {range[1] && utils.format(range[1], 'dateTime')}
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
