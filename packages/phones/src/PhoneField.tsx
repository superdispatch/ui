

import { ButtonBase, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';
import { OutlinedInputClassKey } from '@material-ui/core/OutlinedInput';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { Color } from '@superdispatch/ui';
import React, { useRef, useState } from 'react';

import { PhoneFieldFlag } from './PhoneFieldFlag';
import { PhoneFieldMenu } from './PhoneFieldMenu';
import { PhoneData } from './PhoneHelpers';

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
    inputSelect: {},
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
  const anchorRef = useRef<null | HTMLDivElement>(null);
  const {
    selectButton: selectButtonClassName,
    selectButtonIcon: selectButtonIconClassName,
  } = useStyles();
  const inputStyles = useInputStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TextField
        ref={anchorRef}
        InputProps={{
          classes: inputStyles,
          startAdornment: (
            <InputAdornment position="start">
              <ButtonBase
                className={selectButtonClassName}
                onClick={() => setIsOpen(prev => !prev)}
              >
                <PhoneFieldFlag code="US" />

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
        selected="US"
        onClose={() => setIsOpen(false)}
        anchorEl={!isOpen ? undefined : anchorRef.current}
      />
    </>
  );
}
