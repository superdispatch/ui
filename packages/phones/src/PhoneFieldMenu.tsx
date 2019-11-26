import { Divider, Menu, MenuItem } from '@material-ui/core';
import { MenuProps } from '@material-ui/core/Menu';
import { CountryCode } from 'libphonenumber-js';
import { getCountries } from 'libphonenumber-js/max';
import React, { forwardRef } from 'react';

import { countryNames } from './CountryNames';
import { PhoneFieldFlag } from './PhoneFieldFlag';

export interface PhoneFieldMenuProps
  extends Omit<MenuProps, 'open' | 'children' | 'onClose' | 'onSelect'> {
  selectedCountry: CountryCode;
  onClose: () => void;
  onSelect: (country: CountryCode) => void;
}

const countries = (() => {
  const main: CountryCode[] = ['US', 'CA', 'AU', 'NZ'];
  const result: CountryCode[] = getCountries().filter(
    country => country !== '001' && !main.includes(country),
  );
  return [...main, null, ...result];
})();

export const PhoneFieldMenu = forwardRef<unknown, PhoneFieldMenuProps>(
  ({ anchorEl, selectedCountry, onClose, onSelect, ...props }, ref) => (
    <Menu
      {...props}
      ref={ref}
      anchorEl={anchorEl}
      onClose={onClose}
      open={!!anchorEl}
      PaperProps={{ style: { maxHeight: 30 * 8 } }}
    >
      {countries.map(country =>
        country == null ? (
          <Divider key="divider" />
        ) : (
          <MenuItem
            key={country}
            selected={country === selectedCountry}
            onClick={() => {
              onSelect(country);
              onClose();
            }}
          >
            <PhoneFieldFlag code={country} />
            {countryNames[country]}
          </MenuItem>
        ),
      )}
    </Menu>
  ),
);

if (process.env.NODE_ENV !== 'production') {
  PhoneFieldMenu.displayName = 'PhoneFieldMenu';
}
