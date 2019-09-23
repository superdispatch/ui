import { Button as MaterialButton, CircularProgress } from '@material-ui/core';
import { ButtonProps as MaterialButtonProps } from '@material-ui/core/Button';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { ButtonClassNames } from './ButtonStyles';

export type ButtonColor = 'primary' | 'error' | 'success';

export interface ButtonProps extends Omit<MaterialButtonProps, 'color' | 'variant'> {
  rel?: string;
  target?: string;
  color?: ButtonColor;
  isActive?: boolean;
  isLoading?: boolean;
  variant?: 'outlined' | 'contained';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, color, variant, children, disabled, isActive, isLoading, className, ...props }, ref) => (
    <MaterialButton
      {...props}
      ref={ref}
      size={size}
      disabled={disabled || isLoading}
      color={color === 'primary' ? color : undefined}
      variant={variant === 'contained' ? variant : 'outlined'}
      className={clsx(
        ButtonClassNames.root,
        isActive && ButtonClassNames.isActive,
        isLoading && ButtonClassNames.isLoading,
        color === 'error' && ButtonClassNames.colorError,
        color === 'success' && ButtonClassNames.colorSuccess,
        className,
      )}
    >
      {!isLoading ? (
        children
      ) : (
        <>
          {children}
          <CircularProgress className={ButtonClassNames.progress} />
        </>
      )}
    </MaterialButton>
  ),
);

Button.displayName = 'Button';
