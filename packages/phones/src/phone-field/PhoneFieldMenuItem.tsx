import {
  makeStyles,
  MenuItem,
  MenuItemClassKey,
  MenuItemProps,
  Theme,
  Typography,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import PhoneNumber from 'awesome-phonenumber';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useMemo,
} from 'react';

import { phoneFieldCountries, RegionCode } from '../PhoneMetadata';
import { PhoneFieldFlag } from './PhoneFieldFlag';

export type PhoneFieldMenuItemClassKey = MenuItemClassKey | 'flag';

const useStyles = makeStyles<Theme, {}, PhoneFieldMenuItemClassKey>(theme => ({
  dense: {},
  gutters: {},
  root: {},
  selected: {},
  flag: { marginRight: theme.spacing(1) },
}));

export interface PhoneFieldMenuItemProps
  extends RefAttributes<HTMLLIElement>,
    Omit<MenuItemProps, 'classes' | 'children'> {
  country: RegionCode;
  classes?: Partial<ClassNameMap<PhoneFieldMenuItemClassKey>>;
}

export const PhoneFieldMenuItem: ForwardRefExoticComponent<PhoneFieldMenuItemProps> = forwardRef<
  HTMLLIElement,
  PhoneFieldMenuItemProps
>(({ country, classes, ...props }, ref) => {
  const { flag: flagClassName, ...styles } = useStyles({ classes });
  const countryCode = useMemo(() => {
    try {
      return `+${PhoneNumber.getCountryCodeForRegionCode(country)}`;
    } catch (e) {
      return null;
    }
  }, [country]);

  return (
    <MenuItem {...props} ref={ref} button={true} classes={styles}>
      <PhoneFieldFlag code={country} className={flagClassName} />
      {phoneFieldCountries.get(country)}
      &nbsp;
      <Typography color="textSecondary">{countryCode}</Typography>
    </MenuItem>
  );
});

if (process.env.NODE_ENV !== 'production') {
  PhoneFieldMenuItem.displayName = 'PhoneFieldMenuItem';
}
