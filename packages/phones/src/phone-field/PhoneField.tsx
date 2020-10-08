import { BaseTextFieldProps, TextField } from '@material-ui/core';
import { mergeRefs } from '@superdispatch/ui';
import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { PhoneRegionCode } from '../data/PhoneRegionCode';
import {
  formatPhoneNumber,
  getExamplePhoneNumber,
  parsePhoneNumber,
} from '../data/PhoneUtils';
import { PhoneFieldMenu } from './PhoneFieldMenu';
import { PhoneFieldStartAdornment } from './PhoneFieldStartAdornment';

function normalizeValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

interface State {
  value: string;
  nationalNumber: string;
  region: PhoneRegionCode;
}

function createState(value: string): State {
  const [region, nationalNumber] = parsePhoneNumber(value);

  return { value, region, nationalNumber };
}

export interface PhoneFieldProps
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
  value?: null | string;
  onBlur?: (value: string) => void;
  onFocus?: (value: string) => void;
  onChange?: (value: string) => void;
}

export const PhoneField = forwardRef<HTMLDivElement, PhoneFieldProps>(
  ({ value: valueProp, onBlur, onFocus, onChange, ...props }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLDivElement>(null);

    const value = useMemo(() => normalizeValue(valueProp), [valueProp]);
    const [{ region, nationalNumber }, setValue] = useState(() =>
      createState(value),
    );

    const placeholder = useMemo(
      () => formatPhoneNumber(getExamplePhoneNumber(region), 'national'),
      [region],
    );

    const handleChange = (
      fn: undefined | ((value: string) => void),
      nextRegion: PhoneRegionCode,
      nextNationalNumber: string,
    ) => {
      if (fn) {
        const nextValue = formatPhoneNumber([nextRegion, nextNationalNumber]);

        setValue({
          value: nextValue,
          region: nextRegion,
          nationalNumber: nextNationalNumber,
        });

        fn(nextValue);
      }
    };

    const handleChangeEvent = (
      fn: undefined | ((value: string) => void),
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (fn) {
        handleChange(
          fn,
          region,
          formatPhoneNumber([region, event.target.value], 'national'),
        );
      }
    };

    useEffect(() => {
      setValue((prev) =>
        // Ignore `props.value` changes when they were performed from inside.
        prev.value === value ? prev : createState(value),
      );
    }, [value]);

    return (
      <>
        <PhoneFieldMenu
          value={region}
          anchorEl={menuAnchor}
          onClose={() => {
            setMenuAnchor(null);
          }}
          onChange={(nextRegion) => {
            handleChange(onChange, nextRegion, nationalNumber);
          }}
        />

        <TextField
          {...props}
          type="tel"
          variant="outlined"
          autoComplete="off"
          value={nationalNumber}
          placeholder={placeholder}
          ref={mergeRefs(ref, rootRef)}
          inputRef={inputRef}
          onBlur={(event) => {
            handleChangeEvent(onBlur, event);
          }}
          onFocus={(event) => {
            handleChangeEvent(onFocus, event);
          }}
          onChange={(event) => {
            handleChangeEvent(onChange, event);
          }}
          InputProps={{
            startAdornment: (
              <PhoneFieldStartAdornment
                region={region}
                isExpanded={!!menuAnchor}
                onClick={() => {
                  // `FocusTrap` inside of `Menu` will restore focus to
                  // the last focused element. We want to manually focus input
                  // to trick the `FocusTrap`.
                  inputRef.current?.focus();
                  setMenuAnchor(rootRef.current);
                }}
              />
            ),
          }}
        />
      </>
    );
  },
);
