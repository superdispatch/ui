import { BaseTextFieldProps, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete/useAutocomplete';
import { DateTime, FixedOffsetZone } from 'luxon';
import React, { useEffect, useMemo } from 'react';

import { useDateUtils } from './DateContext';
import {
  DateLike,
  DateUtils,
  isValidDate,
  NullableDateLike,
  toDate,
} from './DateUtils';
import { useDate } from './internal/useDate';

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
    label: utils.format(value, 'time'),
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

export function TimeField({
  onChange,
  value: valueProp,
  ...props
}: TimeFieldProps) {
  const utils = useDateUtils();
  const value = useDate(valueProp, 'second');
  const initialDate = useMemo(
    () => utils.startOf(isValidDate(value) ? value : Date.now(), 'day'),
    [utils, value],
  );
  const selectedOption = useMemo(
    () => (!isValidDate(value) ? null : toTimeFieldOption(utils, value)),
    [utils, value],
  );
  const options = useMemo(() => getOptions(utils, initialDate), [
    initialDate,
    utils,
  ]);

  const [inputValue, setInputValue] = React.useState('');

  const handleDateValue = (nextValue: NullableDateLike) => {
    if (nextValue == null) {
      onChange?.(undefined);
    } else {
      onChange?.(toDate(nextValue));
    }
  };

  const handleStringValue = (nextInputValue: string) => {
    const nextFilter = normalizeInputValue(nextInputValue);

    for (const timeFormat of timeFormats) {
      const dateTime = DateTime.fromFormat(nextFilter, timeFormat, {
        locale: utils.locale,
        zone: FixedOffsetZone.instance(utils.timeZoneOffset),
      });

      if (dateTime.isValid) {
        const nextDate = utils.update(initialDate, {
          hour: dateTime.hour,
          minute: dateTime.minute,
          second: dateTime.second,
          millisecond: dateTime.millisecond,
        });

        if (!utils.isSameDate(nextDate, value, 'minute')) {
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

  useEffect(() => {
    if (isValidDate(value)) {
      setInputValue(utils.format(value, 'time'));
    } else {
      setInputValue('');
    }
  }, [utils, value]);

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
          handleDateValue(nextValue?.value);
        }
      }}
      onInputChange={(_, nextInputValue) => setInputValue(nextInputValue)}
      renderInput={params => (
        <TextField variant="outlined" {...props} {...params} />
      )}
    />
  );
}
