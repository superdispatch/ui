import { InputAdornment, Select, TextField } from '@material-ui/core';
import React from 'react';

import { PhoneData } from './PhoneHelpers';
import { usePhonesContext } from './PhonesContext';

export interface PhoneFieldProps {
  value: string;
  onChange: (raw: string, data: PhoneData) => void;
}

export function PhoneField() {
  const { lib, util } = usePhonesContext();

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
