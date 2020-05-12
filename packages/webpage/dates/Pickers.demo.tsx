import {
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { boolean, select } from '@storybook/addon-knobs';
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
import { Stack } from '@superdispatch/ui';
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

const offsetOptions = Array.from({ length: 22 }).reduce<Record<string, number>>(
  (acc, _, idx) => {
    const offset = (idx - 11) * 60;

    acc[formatUTC(offset)] = offset;

    return acc;
  },
  {},
);

export default function PickersDemo() {
  const timeZoneOffset = select<number>('Time Zone Offset', offsetOptions, 0);

  const disabled = boolean('Disabled', false);
  const hasLabel = boolean('Has Label', false);
  const hasError = boolean('Has Error', false);
  const isFullWidth = boolean('Has Full Width', false);
  const hasHelperText = boolean('Has Helper Text', false);
  const hasClear = boolean('Clearable', false);
  const hasAdornment = boolean('With Adornment', false);
  const disableCloseOnSelect = boolean('Disable Close on Select', false);

  const [range, setRange] = useState<DateRange>([]);
  const utils = useMemo(() => new DateUtils({ timeZoneOffset }), [
    timeZoneOffset,
  ]);

  return (
    <DateContextProvider timeZoneOffset={timeZoneOffset}>
      <Stack space={2}>
        <Stack space={1}>
          <Typography variant="h3">Date Field</Typography>

          <DateField
            value={range[0]}
            disabled={disabled}
            onChange={(value) => setRange(toDateRange([value, range[1]]))}
            hasClearButton={hasClear}
            disableCloseOnSelect={disableCloseOnSelect}
            fullWidth={isFullWidth}
            InputProps={{
              startAdornment: hasAdornment && (
                <InputAdornment position="start">Date:</InputAdornment>
              ),
            }}
            error={hasError}
            label={hasLabel && 'Date'}
            helperText={
              !hasHelperText
                ? undefined
                : hasError
                ? 'Invalid Date'
                : 'Pick Date'
            }
          />
        </Stack>

        <Stack space={1}>
          <Typography variant="h3">Date Range Field</Typography>

          <DateRangeField
            value={range}
            disabled={disabled}
            onChange={(value) => setRange(toDateRange(value))}
            hasClearButton={hasClear}
            disableCloseOnSelect={disableCloseOnSelect}
            fullWidth={isFullWidth}
            InputProps={{
              startAdornment: hasAdornment && (
                <InputAdornment position="start">Date:</InputAdornment>
              ),
            }}
            error={hasError}
            label={hasLabel && 'Date Range'}
            helperText={
              !hasHelperText
                ? undefined
                : hasError
                ? 'Invalid Rate Range'
                : 'Pick Date Range'
            }
          />
        </Stack>

        <Stack space={1}>
          <Typography variant="h3">Time Field</Typography>

          <TimeField
            id="time"
            value={range[0]}
            disabled={disabled}
            onChange={(value) => setRange(toDateRange([value, range[1]]))}
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
        </Stack>

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
      </Stack>
    </DateContextProvider>
  );
}
