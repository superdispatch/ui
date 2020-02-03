import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
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
  DateRange,
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
  const [hasStartIcon, setHasStartIcon] = useState(false);
  const [hasEndIcon, setHasEndIcon] = useState(false);

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
                label="Has Label"
                control={<Switch />}
                checked={hasLabel}
                onChange={(_, checked) => setHasLabel(checked)}
              />

              <FormControlLabel
                label="Has Error"
                control={<Switch />}
                checked={hasError}
                onChange={(_, checked) => setHasError(checked)}
              />

              <FormControlLabel
                label="Has Helper Text"
                control={<Switch />}
                checked={hasHelperText}
                onChange={(_, checked) => setHasHelperText(checked)}
              />

              <FormControlLabel
                label="Has Start Icon"
                control={<Switch />}
                checked={hasStartIcon}
                onChange={(_, checked) => setHasStartIcon(checked)}
              />

              <FormControlLabel
                label="Has End Icon"
                control={<Switch />}
                checked={hasEndIcon}
                onChange={(_, checked) => setHasEndIcon(checked)}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <DateContextProvider timeZoneOffset={timeZoneOffset}>
          <Grid item={true} xs={12}>
            <Typography variant="h3">Date Field</Typography>
          </Grid>
          <Grid item={true} xs={12}></Grid>

          <Grid item={true} xs={12}>
            <Typography variant="h3">Date Range Field</Typography>
          </Grid>
          <Grid item={true} xs={12}></Grid>

          <Grid item={true} xs={12}>
            <Typography variant="h3">Time Field</Typography>
          </Grid>

          <Grid item={true} xs={12}>
            <TimeField
              id="time"
              value={range[0]}
              onChange={value => setRange(toDateRange([value, range[1]]))}
              error={hasError}
              fullWidth={isFullWidth}
              disabled={disabled}
              label={hasLabel && 'Time'}
              helperText={
                !hasHelperText
                  ? undefined
                  : hasError
                  ? 'Invalid Email'
                  : 'Enter your email'
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
                  {range[0] && utcDateUtils.formatDateTime(range[0])}
                </TableCell>

                <TableCell>
                  {range[1] && utcDateUtils.formatDateTime(range[1])}
                </TableCell>
              </TableRow>

              {timeZoneOffset !== 0 && (
                <TableRow>
                  <TableCell variant="head">
                    {formatUTC(timeZoneOffset)}
                  </TableCell>
                  <TableCell>
                    {range[0] && utils.formatDateTime(range[0])}
                  </TableCell>

                  <TableCell>
                    {range[1] && utils.formatDateTime(range[1])}
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
