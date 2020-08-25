import { Dialog as MuiDialog, DialogProps } from '@material-ui/core';
import React, { forwardRef } from 'react';

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open = true,
      disableAutoFocus = true,
      disableEnforceFocus = true,
      disableRestoreFocus = true,
      ...props
    },
    ref,
  ) => (
    <MuiDialog
      {...props}
      ref={ref}
      open={open}
      disableAutoFocus={disableAutoFocus}
      disableEnforceFocus={disableEnforceFocus}
      disableRestoreFocus={disableRestoreFocus}
    />
  ),
);
