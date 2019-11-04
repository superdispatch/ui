import { Button as MaterialButton, CircularProgress } from '@material-ui/core';
import { ButtonProps as MaterialButtonProps } from '@material-ui/core/Button';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { ButtonClassNames } from './ButtonStyles';

export interface ButtonProps extends Omit<MaterialButtonProps, 'color' | 'variant'> {
  rel?: string;
  target?: string;
  isActive?: boolean;
  isLoading?: boolean;
  color: 'primary' | 'error' | 'success';
  variant: 'text' | 'outlined' | 'contained';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size, color, children, disabled, isActive, isLoading, className, ...props }, ref) => (
    <MaterialButton
      {...props}
      ref={ref}
      size={size}
      disabled={disabled || isLoading}
      color={color === 'primary' ? color : undefined}
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

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
