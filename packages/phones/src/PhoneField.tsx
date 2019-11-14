import { InputAdornment, Select,TextField } from '@material-ui/core';
import React from 'react';

import { usePhonesContext } from './PhonesContext';
import { PhoneData } from './PhoneHelpers';

export interface PhoneFieldProps {
  value: string;
  onChange: (raw: string, data: PhoneData) => void;
}

export function PhoneField() {
  const libPhoneNumber = usePhonesContext();
  const phoneNumberUtil = libPhoneNumber?.PhoneNumberUtil.getInstance();

  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Select disableUnderline={true} />
          </InputAdornment>
        ),
      }}
    />
  );
}
