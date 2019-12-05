import {
  makeStyles,
  MenuItem,
  MenuItemClassKey,
  MenuItemProps,
  Theme,
} from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { CountryCode } from 'libphonenumber-js';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';

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
  label: ReactNode;
  country: CountryCode;
  classes?: Partial<ClassNameMap<PhoneFieldMenuItemClassKey>>;
}

export const PhoneFieldMenuItem: ForwardRefExoticComponent<PhoneFieldMenuItemProps> = forwardRef<
  HTMLLIElement,
  PhoneFieldMenuItemProps
>(({ label, country, classes, ...props }, ref) => {
  const { flag: flagClassName, ...styles } = useStyles({ classes });

  return (
    <MenuItem {...props} ref={ref} button={true} classes={styles}>
      <PhoneFieldFlag code={country} className={flagClassName} />

      {label}
    </MenuItem>
  );
});

if (process.env.NODE_ENV !== 'production') {
  PhoneFieldMenuItem.displayName = 'PhoneFieldMenuItem';
}
