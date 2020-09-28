import { Divider, Menu, MenuProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SuperDispatchTheme } from '@superdispatch/ui';
import React, { forwardRef } from 'react';

import { PHONE_FIELD_COUNTRIES } from '../data/PhoneMetadata';
import { PhoneRegionCode } from '../data/PhoneRegionCode';
import { PhoneFieldMenuItem } from './PhoneFieldMenuItem';

const COUNTRIES: readonly PhoneRegionCode[] = Array.from(
  PHONE_FIELD_COUNTRIES.keys(),
);

const useStyles = makeStyles<SuperDispatchTheme, 'paper'>(
  (theme) => ({
    paper: {
      maxHeight: theme.spacing(30),
    },
  }),
  { name: 'SD-PhoneFieldMenu' },
);

export interface PhoneFieldMenuProps extends Pick<MenuProps, 'anchorEl'> {
  onClose: () => void;
  value: PhoneRegionCode;
  onChange: (region: PhoneRegionCode) => void;
}

export const PhoneFieldMenu = forwardRef<unknown, PhoneFieldMenuProps>(
  ({ anchorEl, value, onClose, onChange }, ref) => {
    const styles = useStyles();

    return (
      <Menu
        ref={ref}
        open={!!anchorEl}
        onClose={onClose}
        anchorEl={anchorEl}
        classes={{ paper: styles.paper }}
      >
        {COUNTRIES.map((country) => [
          <PhoneFieldMenuItem
            key={country}
            regionCode={country}
            selected={country === value}
            onClick={() => {
              onChange(country);
              onClose();
            }}
          />,
          country === 'NZ' && <Divider key="divider" />,
        ])}
      </Menu>
    );
  },
);
