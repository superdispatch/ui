import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { DateTime } from 'luxon';
import React from 'react';

import { isSameDate } from './DateUtils';

const timeFormats = ['h:mm a', 'h:mma', 'H:mm', 'h:mm', 'hmm', 'Hmm', 'h', 'H'];

interface TimeFieldOption {
  value: number;
  label: string;
  pattern: RegExp;
}

function toTimeFieldOption(value: Date): TimeFieldOption {
  const dateTime = DateTime.fromJSDate(value);

  return {
    value: value.getTime(),
    label: dateTime.toFormat('t'),
    pattern: new RegExp(
      `^(${timeFormats.map(format => dateTime.toFormat(format)).join('|')})`,
      'i',
    ),
  };
}

const options = Array.from<undefined, TimeFieldOption>(
  { length: 96 },
  (_, idx) => toTimeFieldOption(new Date(2020, 4, 24, 0, idx * 15)),
);

function normalizeInputValue(inputValue: string): string {
  return inputValue.replace(/[\s]/g, '').toLowerCase();
}

const optionsFilterCache = new Map<string, TimeFieldOption[]>();

function filterOptions(inputValue: string): TimeFieldOption[] {
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

export function TimeField() {
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState<null | TimeFieldOption>(null);

  const handleStringValue = (nextInputValue: string) => {
    const nextFilter = normalizeInputValue(nextInputValue);

    for (const timeFormat of timeFormats) {
      const dateTime = DateTime.fromFormat(nextFilter, timeFormat);

      if (dateTime.isValid) {
        const nextValue = dateTime.toJSDate();

        return setValue(prev =>
          isSameDate(prev?.value, nextValue)
            ? prev
            : toTimeFieldOption(nextValue),
        );
      }
    }

    if (value) {
      setInputValue(value.label);
    } else {
      setInputValue('');
    }
  };

  return (
    <Autocomplete
      size="small"
      freeSolo={true}
      autoComplete={true}
      disableClearable={true}
      value={value}
      inputValue={inputValue}
      options={options}
      filterOptions={(_, state) => filterOptions(state.inputValue)}
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
          setValue(nextValue);
        }
      }}
      onInputChange={(_, nextInputValue) => setInputValue(nextInputValue)}
      renderInput={params => <TextField {...params} fullWidth={true} />}
    />
  );
}
