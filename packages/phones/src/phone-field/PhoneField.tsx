import {
  ButtonBase,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { OutlinedInputClassKey } from '@material-ui/core/OutlinedInput';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { Color } from '@superdispatch/ui';
import { CountryCode } from 'libphonenumber-js';
import React, { useRef, useState } from 'react';

import { PhoneData } from '../PhoneHelpers';
import { PhoneFieldFlag } from './PhoneFieldFlag';
import { PhoneFieldMenu } from './PhoneFieldMenu';

const useStyles = makeStyles<Theme, {}>(
  theme => ({
    selectButton: {
      color: Color.Blue300,
      padding: theme.spacing(0.5, 0.5, 0.5, 1),
      '&:hover, &:focus': { backgroundColor: Color.Blue50 },
    },

    selectButtonIcon: {
      color: Color.Grey200,
    },
  }),
  { name: 'SuperDispatchPhoneField' },
);

const useInputStyles = makeStyles<Theme, {}, OutlinedInputClassKey>(
  {
    root: {},
    colorSecondary: {},
    focused: {},
    disabled: {},
    adornedStart: { paddingLeft: 0 },
    adornedEnd: {},
    error: {},
    marginDense: {},
    multiline: {},
    notchedOutline: {},
    input: {},
    inputMarginDense: {},
    inputMultiline: {},
    inputAdornedStart: {},
    inputAdornedEnd: {},
  },
  { name: 'SuperDispatchPhoneFieldInput' },
);

export interface PhoneFieldProps {
  value: string;
  onChange: (raw: string, data: PhoneData) => void;
}

export function PhoneField() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    selectButton: selectButtonClassName,
    selectButtonIcon: selectButtonIconClassName,
  } = useStyles();
  const inputStyles = useInputStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('US');

  return (
    <>
      <TextField
        ref={anchorRef}
        inputRef={inputRef}
        InputProps={{
          classes: inputStyles,
          startAdornment: (
            <InputAdornment position="start">
              <ButtonBase
                className={selectButtonClassName}
                onClick={() => {
                  // `FocusTrap` restores focus on `Menu` close. We're changing
                  // focus to `input`, so it will be focused instead of `button`.
                  inputRef.current?.focus();
                  setIsOpen(true);
                }}
              >
                <PhoneFieldFlag code={selectedCountry} />

                {isOpen ? (
                  <ArrowDropUp className={selectButtonIconClassName} />
                ) : (
                  <ArrowDropDown className={selectButtonIconClassName} />
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
        onSelect={nextSelectedCountry =>
          setSelectedCountry(nextSelectedCountry)
        }
      />
    </>
  );
}
