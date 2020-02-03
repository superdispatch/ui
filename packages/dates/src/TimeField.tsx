import { BaseTextFieldProps, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete/useAutocomplete';
import { DateTime, FixedOffsetZone } from 'luxon';
import React, { useMemo } from 'react';
import { usePureMemo } from 'utility-hooks';

import { useDateUtils } from './DateContext';
import {
  DateLike,
  DateUtils,
  isSameDate,
  isValidDate,
  toDate,
} from './DateUtils';

const timeFormats = ['h:mm a', 'h:mma', 'H:mm', 'h:mm', 'hmm', 'Hmm', 'h', 'H'];

interface TimeFieldOption {
  value: number;
  label: string;
  pattern: RegExp;
}

function toTimeFieldOption(utils: DateUtils, value: Date): TimeFieldOption {
  const dateTime = DateTime.fromJSDate(value).toUTC(utils.timeZoneOffset);

  return {
    value: value.getTime(),
    label: utils.formatTime(value),
    pattern: new RegExp(
      `^(${timeFormats.map(format => dateTime.toFormat(format)).join('|')})`,
      'i',
    ),
  };
}

function getOptions(utils: DateUtils, initialDate: Date): TimeFieldOption[] {
  return Array.from<undefined, TimeFieldOption>({ length: 96 }, (_, idx) =>
    toTimeFieldOption(
      utils,
      utils.update(initialDate, { hour: 0, minute: idx * 15 }),
    ),
  );
}

function normalizeInputValue(inputValue: string): string {
  return inputValue.replace(/[\s]/g, '').toLowerCase();
}

const optionsFilterCache = new Map<string, TimeFieldOption[]>();

function filterOptions(
  options: TimeFieldOption[],
  { inputValue }: FilterOptionsState,
): TimeFieldOption[] {
  const filter = normalizeInputValue(inputValue);

  if (!filter) {
    return options;
  }

  const cached = optionsFilterCache.get(inputValue);

  if (cached) {
    return cached;
  }

  const filtered = options.filter(option => option.pattern.test(filter));

  optionsFilterCache.set(inputValue, filtered);

  return filtered;
}

export interface TimeFieldProps
  extends Omit<BaseTextFieldProps, 'type' | 'variant'> {
  value?: DateLike;
  onChange?: (value: undefined | Date) => void;
}

export function TimeField({ value, onChange, ...props }: TimeFieldProps) {
  const utils = useDateUtils();
  const selectedDate = usePureMemo(
    () => {
      const nextSelectedDate = toDate(value);

      return !isValidDate(nextSelectedDate) ? undefined : nextSelectedDate;
    },
    [value],
    isSameDate,
  );
  const initialDate = useMemo(
    () => utils.startOf(selectedDate || Date.now(), 'day'),
    [selectedDate, utils],
  );
  const selectedOption = useMemo(
    () => (!selectedDate ? undefined : toTimeFieldOption(utils, selectedDate)),
    [selectedDate, utils],
  );

  const options = useMemo(() => getOptions(utils, initialDate), [
    initialDate,
    utils,
  ]);

  const [inputValue, setInputValue] = React.useState('');
  const handleStringValue = (nextInputValue: string) => {
    const nextFilter = normalizeInputValue(nextInputValue);

    for (const timeFormat of timeFormats) {
      const dateTime = DateTime.fromFormat(nextFilter, timeFormat, {
        zone: FixedOffsetZone.instance(utils.timeZoneOffset),
      });

      if (dateTime.isValid) {
        const nextDate = dateTime.toJSDate();

        if (!selectedOption || !isSameDate(nextDate, selectedOption.value)) {
          onChange?.(nextDate);
        }

        return;
      }
    }

    if (selectedOption) {
      setInputValue(selectedOption.label);
    } else {
      setInputValue('');
    }
  };

  return (
    <Autocomplete
      freeSolo={true}
      autoComplete={true}
      value={selectedOption}
      inputValue={inputValue}
      options={options}
      includeInputInList={true}
      filterOptions={filterOptions}
      getOptionLabel={(option: string | TimeFieldOption) =>
        typeof option === 'string' ? option : option.label
      }
      onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
        handleStringValue(event.target.value);
      }}
      onChange={(_: unknown, nextValue: null | string | TimeFieldOption) => {
        if (typeof nextValue === 'string') {
          handleStringValue(nextValue);
        } else {
          onChange?.(!nextValue ? undefined : toDate(nextValue.value));
        }
      }}
      onInputChange={(_, nextInputValue) => setInputValue(nextInputValue)}
      renderInput={params => (
        <TextField variant="outlined" {...props} {...params} />
      )}
    />
  );
}
