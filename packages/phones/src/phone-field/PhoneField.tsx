import {
  ButtonBase,
  InputAdornment,
  makeStyles,
  OutlinedTextFieldProps,
  TextField,
  Theme,
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

import { PhoneData } from '../PhoneHelpers';
import { PhoneCountryCode } from '../PhoneMetadata';
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

export interface PhoneFieldProps
  extends RefAttributes<HTMLDivElement>,
    Omit<
      OutlinedTextFieldProps,
      'value' | 'variant' | 'onChange' | 'InputProps'
    > {
  value: string;
  onChange?: (raw: string, data: PhoneData) => void;
}

export const PhoneField: ForwardRefExoticComponent<PhoneFieldProps> = forwardRef<
  HTMLDivElement,
  PhoneFieldProps
>(({ value, onChange, inputRef: inputRefProp, ...props }, ref) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<PhoneCountryCode>(
    'US',
  );
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const placeholder = useMemo(() => {
    if (selectedCountry) {
      try {
        return !selectedCountry
          ? ''
          : PhoneNumber.getExample(selectedCountry).getNumber('international');
      } catch (e) {
        return '';
      }
    }

    return '';
  }, [selectedCountry]);

  return (
    <>
      <TextField
        {...props}
        variant="outlined"
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
                <PhoneFieldFlag code={selectedCountry} />

                {isOpen ? (
                  <ArrowDropUp htmlColor={Color.Grey200} />
                ) : (
                  <ArrowDropDown htmlColor={Color.Grey200} />
                )}
              </ButtonBase>
            </InputAdornment>
          ),
        }}
      />

      <PhoneFieldMenu
        onClose={() => setIsOpen(false)}
        anchorEl={!isOpen ? undefined : anchorRef.current}
        selectedCountry={selectedCountry}
        onSelect={next => setSelectedCountry(next)}
      />
    </>
  );
});

if (process.env.NODE_ENV !== 'production') {
  PhoneField.displayName = 'PhoneField';
}
