import {
  Divider,
  makeStyles,
  Menu,
  MenuClassKey,
  Theme,
} from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';
import React, { forwardRef } from 'react';

import { PhoneCountryCode, phoneFieldCountries } from '../PhoneMetadata';
import { PhoneFieldMenuItem } from './PhoneFieldMenuItem';

const useStyles = makeStyles<Theme, {}, MenuClassKey>(
  theme => ({
    list: {},
    paper: { maxHeight: theme.spacing(30) },
  }),
  { name: 'SuperDispatchPhoneFieldMenu' },
);

export interface PhoneFieldMenuProps
  extends Omit<MenuProps, 'open' | 'children' | 'onClose' | 'onSelect'> {
  onClose: () => void;
  selectedCountry: PhoneCountryCode;
  onSelect: (country: PhoneCountryCode) => void;
}

export const PhoneFieldMenu = forwardRef<unknown, PhoneFieldMenuProps>(
  (
    { anchorEl, classes, selectedCountry, onClose, onSelect, ...props },
    ref,
  ) => {
    const styles = useStyles({ classes });

    return (
      <Menu
        {...props}
        ref={ref}
        classes={styles}
        open={!!anchorEl}
        onClose={onClose}
        anchorEl={anchorEl}
      >
        {Array.from(phoneFieldCountries.keys(), country => [
          <PhoneFieldMenuItem
            key={country}
            country={country}
            selected={country === selectedCountry}
            onClick={() => {
              onSelect(country);
              onClose();
            }}
          />,
          country === 'NZ' && <Divider key="divider" />,
        ])}
      </Menu>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  PhoneFieldMenu.displayName = 'PhoneFieldMenu';
}
