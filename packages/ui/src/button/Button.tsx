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
  color: 'primary' | 'error' | 'success';
  variant: 'text' | 'outlined' | 'contained';
}

export const Button: ForwardRefExoticComponent<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ size, color, children, disabled, isActive, isLoading, ...props }, ref) => (
  <MaterialButton
    {...props}
    ref={ref}
    size={size}
    disabled={disabled || isLoading}
    data-color={color}
    color={color === 'primary' ? color : undefined}
    aria-busy={isLoading ? 'true' : 'false'}
    aria-expanded={isActive ? 'true' : 'false'}
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
));
