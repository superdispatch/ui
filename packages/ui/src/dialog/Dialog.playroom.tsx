import { Dialog as MuiDialog, DialogProps } from '@material-ui/core';
import React, { forwardRef } from 'react';

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open = true,
      disableAutoFocus = true,
      disableRestoreFocus = true,
      disableEnforceFocus = true,
      ...props
    },
    ref,
  ) => <MuiDialog {...props} ref={ref} open={open} />,
);
