import { Drawer as MuiDrawer, DrawerProps } from '@material-ui/core';
import React, { forwardRef } from 'react';

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({
    disableAutoFocus = true,
    disableEnforceFocus = true,
    disableRestoreFocus = true,
    ...props
  }) => (
    <MuiDrawer
      {...props}
      disableAutoFocus={disableAutoFocus}
      disableEnforceFocus={disableEnforceFocus}
      disableRestoreFocus={disableRestoreFocus}
    />
  ),
);
