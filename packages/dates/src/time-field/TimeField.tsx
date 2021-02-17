import {
  BaseTextFieldProps,
  InputBaseProps,
  TextField,
} from '@material-ui/core';
import { Autocomplete, FilterOptionsState } from '@material-ui/lab';
import { DateTime } from 'luxon';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import {
  DateConfig,
  DateFormat,
  useDateConfig,
} from '../date-config/DateConfig';
import {
  DatePayload,
  formatDate,
  NullableDateInput,
  toDatePayload,
} from '../date-time-utils/DateTimeUtils';
import { useDateTime } from '../use-date-time/useDateTime';

const TIME_MATCH_FORMATS = [
  'h:mm a',
  'h:mma',
  'H:mm',
  'h:mm',
  'hmm',
  'Hmm',
  'h',
  'H',
];

interface TimeFieldOption {
  value: number;
  label: string;
  pattern: RegExp;
}

function toTimeFieldOption(
  date: DateTime,
  config: DateConfig,
): TimeFieldOption {
  return {
    value: date.valueOf(),
    label: formatDate(date, { variant: 'Time' }, config),
    pattern: new RegExp(
      `^(${TIME_MATCH_FORMATS.map((format) => date.toFormat(format)).join(
        '|',
      )})`,
      'i',
    ),
  };
}

function normalizeInputValue(inputValue: string): string {
  return inputValue.replace(/[\s]/g, '').toLowerCase();
}

function makeOptions(
  config: DateConfig,
): [
  options: TimeFieldOption[],
  filterOptions: (
    options: TimeFieldOption[],
    state: FilterOptionsState<TimeFieldOption>,
  ) => TimeFieldOption[],
] {
  const options: TimeFieldOption[] = [];
  const now = DateTime.local().startOf('day');

  for (let i = 0; i < 96; i++) {
    options.push(toTimeFieldOption(now.set({ minute: i * 15 }), config));
  }

  const cache = new Map<string, TimeFieldOption[]>();

  return [
    options,
    (_, { inputValue }) => {
      const query = normalizeInputValue(inputValue);

      if (!query) {
        return options;
      }

      let filtered = cache.get(query);

      if (!filtered) {
        filtered = options.filter((option) => option.pattern.test(query));
        cache.set(query, filtered);
      }

      return filtered;
    },
  ];
}

export interface TimeFieldProps
  extends Pick<
    BaseTextFieldProps,
    | 'disabled'
    | 'error'
    | 'fullWidth'
    | 'helperText'
    | 'id'
    | 'label'
    | 'name'
    | 'placeholder'
    | 'required'
  > {
  format?: DateFormat;
  value?: NullableDateInput;
  onChange?: (value: DatePayload) => void;

  InputProps?: Pick<InputBaseProps, 'startAdornment'>;
}

export const TimeField = forwardRef<HTMLDivElement, TimeFieldProps>(
  (
    {
      disabled,
      onChange,

      value: valueProp,
      format: formatProp,
      ...props
    },
    ref,
  ) => {
    const config = useDateConfig({ format: formatProp });
    const date = useDateTime(valueProp, config);
    const selectedOption = useMemo(
      () => (!date.isValid ? undefined : toTimeFieldOption(date, config)),
      [date, config],
    );
    const [options, filterOptions] = useMemo(() => makeOptions(config), [
      config,
    ]);

    const [inputValue, setInputValue] = useState('');

    function handleChange(nextValue: NullableDateInput): void {
      if (onChange) {
        onChange(toDatePayload(nextValue, config));
      }
    }

    function handleType(text: string): void {
      text = normalizeInputValue(text);

      for (const timeFormat of TIME_MATCH_FORMATS) {
        let nextDate = DateTime.fromFormat(text, timeFormat);

        if (nextDate.isValid) {
          if (onChange) {
            if (date.isValid) {
              nextDate = nextDate.set({
                year: date.year,
                month: date.month,
                day: date.day,
              });
            }

            onChange(toDatePayload(nextDate, config));
          }

          return;
        }
      }

      setInputValue(selectedOption?.label || '');
    }

    useEffect(() => {
      if (!date.isValid) {
        setInputValue('');
      } else {
        setInputValue(formatDate(date, { variant: 'Time' }, config));
      }
    }, [date, config]);

    return (
      <Autocomplete
        ref={ref}
        disabled={disabled}
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
          handleType(event.target.value);
        }}
        onChange={(_: unknown, nextValue: null | string | TimeFieldOption) => {
          if (typeof nextValue === 'string') {
            handleType(nextValue);
          } else {
            handleChange(nextValue?.value);
          }
        }}
        onInputChange={(_, nextInputValue) => {
          setInputValue(nextInputValue);
        }}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...props}
            {...params}
            InputProps={params.InputProps}
          />
        )}
      />
    );
  },
);
