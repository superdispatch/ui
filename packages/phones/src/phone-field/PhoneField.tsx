import { BaseTextFieldProps, TextField } from '@material-ui/core';
import { mergeRefs } from '@superdispatch/ui';
import {
  ChangeEvent,
  forwardRef,
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CountryISO } from '../country-code-metadata/CountryCodeMetadata';
import { usePhoneService } from '../phone-service/PhoneService';
import { PhoneFieldMenu } from './PhoneFieldMenu';
import { PhoneFieldStartAdornment } from './PhoneFieldStartAdornment';

function normalizeValue(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

interface State {
  value: string;
  nationalNumber: string;
  country: CountryISO;
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

    const phoneService = usePhoneService();
    const createState = useCallback(
      (value: string): State => ({ value, ...phoneService.getInfo(value) }),
      [phoneService],
    );

    const value = useMemo(() => normalizeValue(valueProp), [valueProp]);
    const [{ country, nationalNumber }, setValue] = useState(() =>
      createState(value),
    );

    const placeholder = useMemo(
      () => phoneService.APN.getExample(country).getNumber('national'),
      [country, phoneService.APN],
    );

    function handleChange(
      fn: undefined | ((value: string) => void),
      nextCountry: CountryISO,
      nextNationalNumber: string,
    ): void {
      if (fn) {
        const nextValue = phoneService.format(nextNationalNumber, {
          country: nextCountry,
        });

        setValue({
          value: nextValue,
          country: nextCountry,
          nationalNumber: nextNationalNumber,
        });

        fn(nextValue);
      }
    }

    function handleChangeEvent(
      fn: undefined | ((value: string) => void),
      {
        target: { value: nextValue },
      }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void {
      if (fn) {
        handleChange(
          fn,
          country,
          phoneService.format(nextValue, { country, format: 'national' }),
        );
      }
    }

    useEffect(() => {
      setValue((prev) =>
        // Ignore `props.value` changes when they were performed from inside.
        prev.value === value ? prev : createState(value),
      );
    }, [value, createState]);

    return (
      <>
        <PhoneFieldMenu
          value={country}
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
                country={country}
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

export interface SuspendedPhoneFieldProps extends PhoneFieldProps {
  suspenseFallback?: ReactNode;
}

export const SuspendedPhoneField = forwardRef<
  HTMLDivElement,
  SuspendedPhoneFieldProps
>(
  (
    {
      label,
      fullWidth,
      helperText,
      suspenseFallback = (
        <TextField
          disabled={true}
          label={label}
          fullWidth={fullWidth}
          helperText={helperText}
          placeholder="Loading…"
        />
      ),
      ...props
    },
    ref,
  ) => (
    <Suspense fallback={suspenseFallback}>
      <PhoneField
        {...props}
        ref={ref}
        label={label}
        fullWidth={fullWidth}
        helperText={helperText}
      />
    </Suspense>
  ),
);
