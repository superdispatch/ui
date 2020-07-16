import {
  ButtonBase,
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Color, mergeRefs } from '@superdispatch/ui';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useMemo,
  useRef,
  useState,
} from 'react';

import { PhoneNumber } from './data/PhoneNumber';
import { PhoneFieldFlag } from './PhoneFieldFlag';
import { PhoneFieldMenu } from './PhoneFieldMenu';

const useStyles = makeStyles<Theme>(
  (theme) => ({
    inputAdornedStart: { marginLeft: theme.spacing(-1), marginRight: 0 },
    selectButton: {
      color: Color.Blue300,
      padding: theme.spacing(0.5, 0.5, 0.5, 1),
      borderRadius: theme.spacing(0.5, 0, 0, 0.5),
      '&:hover, &:focus': { backgroundColor: Color.Blue50 },
    },
  }),
  { name: 'SD-PhoneField' },
);

export interface PhoneFieldProps
  extends RefAttributes<HTMLDivElement>,
    Omit<
      OutlinedTextFieldProps,
      'value' | 'variant' | 'onChange' | 'onBlur' | 'InputProps'
    > {
  value?: PhoneNumber;
  onBlur?: (value: PhoneNumber) => void;
  onChange?: (value: PhoneNumber) => void;
}

export const PhoneField: ForwardRefExoticComponent<PhoneFieldProps> = forwardRef<
  HTMLDivElement,
  PhoneFieldProps
>(({ value, onBlur, onChange, inputRef: inputRefProp, ...props }, ref) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const currentRegion = value?.region || 'US';
  const currentNumber = value?.nationalNumber;

  const countryCode = useMemo(() => PhoneNumber.getCountryCode(currentRegion), [
    currentRegion,
  ]);
  const inputText = useMemo(
    () =>
      PhoneNumber.toNational({
        region: currentRegion,
        nationalNumber: currentNumber,
      }) ?? '',
    [currentRegion, currentNumber],
  );
  const placeholder = useMemo(
    () => PhoneNumber.getExample(currentRegion).nationalNumber,
    [currentRegion],
  );

  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <TextField
        {...props}
        variant="outlined"
        value={inputText}
        placeholder={placeholder}
        ref={mergeRefs(ref, anchorRef)}
        inputRef={mergeRefs(inputRefProp, inputRef)}
        onBlur={(event) =>
          onBlur?.({
            region: currentRegion,
            nationalNumber: event.target.value,
          })
        }
        onChange={(event) =>
          onChange?.({
            region: currentRegion,
            nationalNumber: event.target.value,
          })
        }
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
                <PhoneFieldFlag code={currentRegion} />

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
        selectedCountry={currentRegion}
        onSelect={(next) =>
          onChange?.({ region: next, nationalNumber: currentNumber })
        }
      />
    </>
  );
});
