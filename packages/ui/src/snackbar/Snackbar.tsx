import { Snackbar as MaterialSnackbar } from '@material-ui/core';
import { SnackbarProps as MaterialSnackbarProps } from '@material-ui/core/Snackbar';
import React, { ReactNode } from 'react';

import { SnackbarContent, SnackbarVariant } from './SnackbarContent';
import { useSnackbarStack } from './SnackbarStack';

type SnackbarCloseReason = 'timeout' | 'explicit';

export interface SnackbarProps extends Omit<MaterialSnackbarProps, 'onClose' | 'message'> {
  children?: ReactNode;
  variant?: SnackbarVariant;
  hasCloseButton?: boolean;
  onClose?: (reason: SnackbarCloseReason) => void;
}

export function Snackbar({
  open,
  action,
  variant,
  onClose,
  children,
  onEnter,
  onExit,
  hasCloseButton = onClose != null,
  ...props
}: SnackbarProps) {
  const { addBelowElement, removeBelowElement } = useSnackbarStack();

  const handleClose = (reason: string | SnackbarCloseReason) => {
    if (onClose && reason !== 'clickaway') {
      onClose(reason === 'timeout' ? 'timeout' : 'explicit');
    }
  };

  return (
    <MaterialSnackbar
      {...props}
      open={open}
      onClose={(_, reason) => handleClose(reason)}
      onEnter={(node, isAppearing) => {
        if (onEnter) {
          onEnter(node, isAppearing);
        }

        addBelowElement(node);
      }}
      onExit={node => {
        if (onExit) {
          onExit(node);
        }

        removeBelowElement(node);
      }}
    >
      <SnackbarContent
        action={action}
        variant={variant}
        onClose={!hasCloseButton ? undefined : () => handleClose('explicit')}
      >
        {children}
      </SnackbarContent>
    </MaterialSnackbar>
  );
}
