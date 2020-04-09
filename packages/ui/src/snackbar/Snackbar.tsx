import {
  Portal,
  Slide,
  Snackbar as MaterialSnackbar,
  SnackbarCloseReason as MaterialSnackbarCloseReason,
  SnackbarProps as MaterialSnackbarProps,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { forwardRef, ForwardRefExoticComponent, ReactNode } from 'react';

import { SnackbarContent, SnackbarVariant } from './SnackbarContent';

function SlideTransition(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

export type SnackbarCloseReason = 'timeout' | 'explicit';

export interface SnackbarProps
  extends Omit<MaterialSnackbarProps, 'onClose' | 'message' | 'children'> {
  children?: ReactNode;
  variant?: SnackbarVariant;
  hasCloseButton?: boolean;
  onClose?: (reason: SnackbarCloseReason) => void;
}

export const Snackbar: ForwardRefExoticComponent<SnackbarProps> = forwardRef(
  (
    {
      open,
      action,
      variant,
      onClose,
      children,
      ContentProps,
      hasCloseButton = onClose != null,
      TransitionComponent = SlideTransition,
      ...props
    },
    ref,
  ) => {
    const handleClose = (
      reason: SnackbarCloseReason | MaterialSnackbarCloseReason,
    ) => {
      if (reason !== 'clickaway') {
        onClose?.(reason === 'timeout' ? 'timeout' : 'explicit');
      }
    };

    return (
      <Portal>
        <MaterialSnackbar
          {...props}
          ref={ref}
          open={open}
          TransitionComponent={TransitionComponent}
          onClose={(_, reason) => {
            handleClose(reason);
          }}
        >
          <SnackbarContent
            {...ContentProps}
            action={action}
            variant={variant}
            onClose={
              !hasCloseButton
                ? undefined
                : () => {
                    handleClose('explicit');
                  }
            }
          >
            {children}
          </SnackbarContent>
        </MaterialSnackbar>
      </Portal>
    );
  },
);
