import {
  ButtonBase,
  InputAdornment,
  makeStyles,
  OutlinedTextFieldProps,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { Color } from '@superdispatch/ui';
import PhoneNumber from 'awesome-phonenumber';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  MutableRefObject,
  Ref,
  RefAttributes,
  useMemo,
  useRef,
  useState,
} from 'react';

import { RegionCode } from '../PhoneMetadata';
import { PhoneFieldFlag } from './PhoneFieldFlag';
import { PhoneFieldMenu } from './PhoneFieldMenu';

function mergeRefs<T>(
  ...refs: Array<undefined | Ref<T>>
): (instance: T | null) => void {
  return instance => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = instance;
      }
    });
  };
}

const useStyles = makeStyles<Theme>(
  theme => ({
    inputAdornedStart: { marginLeft: theme.spacing(-1), marginRight: 0 },
    selectButton: {
      color: Color.Blue300,
      padding: theme.spacing(0.5, 0.5, 0.5, 1),
      borderRadius: theme.spacing(0.5, 0, 0, 0.5),
      '&:hover, &:focus': { backgroundColor: Color.Blue50 },
    },
  }),
  { name: 'SuperDispatchPhoneField' },
);

export interface PhoneFieldValue {
  region: RegionCode;
  regionalNumber?: string;
}

export interface PhoneFieldProps
  extends RefAttributes<HTMLDivElement>,
    Omit<
      OutlinedTextFieldProps,
      'value' | 'variant' | 'onChange' | 'InputProps'
    > {
  value: PhoneFieldValue;
  onChange?: (value: PhoneFieldValue) => void;
}

export const PhoneField: ForwardRefExoticComponent<PhoneFieldProps> = forwardRef<
  HTMLDivElement,
  PhoneFieldProps
>(({ value, onChange, inputRef: inputRefProp, ...props }, ref) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const inputValue = useMemo(() => {
    const ayt = PhoneNumber.getAsYouType(value.region);
    ayt.reset(value.regionalNumber);

    return ayt.getPhoneNumber().getNumber('national') || ayt.number();
  }, [value.region, value.regionalNumber]);

  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [countryCode, placeholder] = useMemo(() => {
    try {
      const phoneNumber = PhoneNumber.getExample(value.region);

      return [phoneNumber.getCountryCode(), phoneNumber.getNumber('national')];
    } catch (e) {}

    return [0, undefined];
  }, [value.region]);

  return (
    <>
      <TextField
        {...props}
        variant="outlined"
        value={inputValue}
        onChange={event =>
          onChange?.({
            region: value.region,
            regionalNumber: event.target.value,
          })
        }
        placeholder={placeholder}
        ref={mergeRefs(ref, anchorRef)}
        inputRef={mergeRefs(inputRefProp, inputRef)}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              className={styles.inputAdornedStart}
            >
              <ButtonBase
                className={styles.selectButton}
                onClick={() => {
                  // `FocusTrap` restores focus on `Menu` close. We're changing
                  // focus to `input`, so it will be focused instead of `button`.
                  inputRef.current?.focus();
                  setIsOpen(true);
                }}
              >
                <PhoneFieldFlag code={value.region} />

                {isOpen ? (
                  <ArrowDropUp htmlColor={Color.Grey200} />
                ) : (
                  <ArrowDropDown htmlColor={Color.Grey200} />
                )}

                <Typography color="textPrimary">+{countryCode}</Typography>
              </ButtonBase>
            </InputAdornment>
          ),
        }}
      />

      <PhoneFieldMenu
        onClose={() => setIsOpen(false)}
        anchorEl={!isOpen ? undefined : anchorRef.current}
        selectedCountry={value.region}
        onSelect={next =>
          onChange?.({ region: next, regionalNumber: value.regionalNumber })
        }
      />
    </>
  );
});

if (process.env.NODE_ENV !== 'production') {
  PhoneField.displayName = 'PhoneField';
}
