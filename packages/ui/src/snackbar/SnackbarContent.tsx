import { IconButton, SnackbarContent as MaterialSnackbarContent } from '@material-ui/core';
import { SnackbarContentProps as MaterialSnackbarContentProps } from '@material-ui/core/SnackbarContent';
import { CheckCircle, Close, SvgIconComponent, Warning } from '@material-ui/icons';
import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';

import { SnackbarClassNames } from './SnackbarStyles';

export type SnackbarVariant = 'default' | 'error' | 'success';

export interface SnackbarContentProps extends Omit<MaterialSnackbarContentProps, 'message'> {
  children?: ReactNode;
  onClose?: () => void;
  variant?: SnackbarVariant;
}

const iconVariant: Record<SnackbarVariant, undefined | SvgIconComponent> = {
  default: undefined,
  error: Warning,
  success: CheckCircle,
};

export const SnackbarContent = forwardRef(
  ({ action, variant, children, onClose, className, ...props }: SnackbarContentProps, ref) => {
    const Icon = (variant && iconVariant[variant]) || iconVariant.default;

    return (
      <MaterialSnackbarContent
        {...props}
        ref={ref}
        className={clsx(
          variant === 'error'
            ? SnackbarClassNames.Error
            : variant === 'success'
            ? SnackbarClassNames.Success
            : SnackbarClassNames.Default,
          className,
        )}
        message={
          <>
            {Icon && <Icon className={SnackbarClassNames.Icon} />}
            {children}
          </>
        }
        action={
          !action && !onClose ? null : (
            <>
              {action}
              {onClose && (
                <IconButton color="inherit" onClick={onClose}>
                  <Close />
                </IconButton>
              )}
            </>
          )
        }
      />
    );
  },
);
if (process.env.NODE_ENV !== 'production') {
  SnackbarContent.displayName = 'SnackbarContent';
}
