import { Portal, Snackbar as MaterialSnackbar, Theme, useMediaQuery } from '@material-ui/core';
import { SnackbarProps as MaterialSnackbarProps } from '@material-ui/core/Snackbar';
import React, { forwardRef, ReactNode } from 'react';
import { useEventCallback } from 'utility-hooks';

import { SnackbarContent, SnackbarVariant } from './SnackbarContent';
import { useSnackbarStack } from './SnackbarStack';

type SnackbarCloseReason = 'timeout' | 'explicit';

export interface SnackbarProps extends Omit<MaterialSnackbarProps, 'onClose' | 'message'> {
  children?: ReactNode;
  variant?: SnackbarVariant;
  hasCloseButton?: boolean;
  onClose?: (reason: SnackbarCloseReason) => void;
}

export const Snackbar = forwardRef(
  (
    {
      open,
      action,
      variant,
      onClose,
      children,
      onEnter,
      onExit,
      ContentProps,
      hasCloseButton = onClose != null,
      ...props
    }: SnackbarProps,
    ref,
  ) => {
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
    const { addBelowElement, removeBelowElement } = useSnackbarStack();

    const handleClose = (reason: string | SnackbarCloseReason) => {
      if (reason !== 'clickaway') {
        // TODO: Enable after https://github.com/typescript-eslint/typescript-eslint/pull/1169 release
        // eslint-disable-next-line no-unused-expressions
        onClose?.(reason === 'timeout' ? 'timeout' : 'explicit');
      }
    };

    const handleSnackbarClose = useEventCallback((_: React.SyntheticEvent, reason: string) =>
      handleClose(reason),
    );

    const handleEnter = useEventCallback((node: HTMLElement, isAppearing: boolean) => {
      // TODO: Enable after https://github.com/typescript-eslint/typescript-eslint/pull/1169 release
      // eslint-disable-next-line no-unused-expressions
      onEnter?.(node, isAppearing);
      addBelowElement(node);
    });

    const handleExit = useEventCallback((node: HTMLElement) => {
      // TODO: Enable after https://github.com/typescript-eslint/typescript-eslint/pull/1169 release
      // eslint-disable-next-line no-unused-expressions
      onExit?.(node);
      removeBelowElement(node);
    });

    return (
      <Portal>
        <MaterialSnackbar
          {...props}
          ref={ref}
          open={open}
          key={`${isMobile}`}
          onExit={handleExit}
          onEnter={handleEnter}
          onClose={handleSnackbarClose}
        >
          <SnackbarContent
            {...ContentProps}
            action={action}
            variant={variant}
            onClose={!hasCloseButton ? undefined : () => handleClose('explicit')}
          >
            {children}
          </SnackbarContent>
        </MaterialSnackbar>
      </Portal>
    );
  },
);
if (process.env.NODE_ENV !== 'production') {
  Snackbar.displayName = 'Snackbar';
}
