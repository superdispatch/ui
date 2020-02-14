import { Button as MaterialButton, CircularProgress } from '@material-ui/core';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

export interface ButtonProps
  extends RefAttributes<HTMLButtonElement>,
    Omit<MuiButtonProps, 'color' | 'variant'> {
  rel?: string;
  target?: string;
  isActive?: boolean;
  isLoading?: boolean;
  color: 'primary' | 'error' | 'success' | 'white';
  variant: 'text' | 'outlined' | 'contained';
}

export const Button: ForwardRefExoticComponent<ButtonProps> = forwardRef(
  ({ size, color, children, disabled, isActive, isLoading, ...props }, ref) => (
    <MaterialButton
      {...props}
      ref={ref}
      size={size}
      data-color={color}
      aria-busy={isLoading}
      aria-expanded={isActive}
      disabled={disabled || isLoading}
      color={color === 'primary' ? color : undefined}
    >
      {!isLoading ? (
        children
      ) : (
        <>
          {children}
          <CircularProgress size="1em" color="inherit" />
        </>
      )}
    </MaterialButton>
  ),
);
