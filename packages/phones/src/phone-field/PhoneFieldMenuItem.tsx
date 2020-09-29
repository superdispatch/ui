import {
  MenuItem,
  MenuItemClassKey,
  MenuItemProps,
  Theme,
  Typography,
} from '@material-ui/core';
import { ClassNameMap, makeStyles } from '@material-ui/styles';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useMemo,
} from 'react';

import { getPhoneCountryCode } from '..';
import { PHONE_FIELD_COUNTRIES } from '../data/PhoneMetadata';
import { PhoneRegionCode } from '../data/PhoneRegionCode';
import { PhoneFieldFlag } from './PhoneFieldFlag';

export type PhoneFieldMenuItemClassKey = MenuItemClassKey | 'flag';

const useStyles = makeStyles<
  Theme,
  { classes?: Partial<ClassNameMap<PhoneFieldMenuItemClassKey>> },
  PhoneFieldMenuItemClassKey
>(
  (theme) => ({
    dense: {},
    gutters: {},
    root: {},
    selected: {},
    flag: { marginRight: theme.spacing(1) },
  }),
  { name: 'SD-PhoneFieldMenuItem' },
);

export interface PhoneFieldMenuItemProps
  extends RefAttributes<HTMLLIElement>,
    Omit<MenuItemProps, 'classes' | 'children'> {
  regionCode: PhoneRegionCode;
  classes?: Partial<ClassNameMap<PhoneFieldMenuItemClassKey>>;
}

export const PhoneFieldMenuItem: ForwardRefExoticComponent<PhoneFieldMenuItemProps> = forwardRef<
  HTMLLIElement,
  PhoneFieldMenuItemProps
>(({ regionCode, classes, ...props }, ref) => {
  const { flag: flagClassName, ...styles } = useStyles({ classes });
  const countryCode = useMemo(() => getPhoneCountryCode(regionCode), [
    regionCode,
  ]);

  return (
    <MenuItem {...props} ref={ref} button={true} classes={styles}>
      <PhoneFieldFlag code={regionCode} className={flagClassName} />
      {PHONE_FIELD_COUNTRIES.get(regionCode)}
      &nbsp;
      <Typography color="textSecondary">{countryCode}</Typography>
    </MenuItem>
  );
});
