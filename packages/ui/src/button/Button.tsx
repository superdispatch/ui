import {
  Button as MaterialButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@material-ui/core';
import { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react';

export interface ButtonProps
  extends RefAttributes<HTMLButtonElement>,
    Omit<MuiButtonProps, 'color'> {
  rel?: string;
  target?: string;
  isActive?: boolean;
  isLoading?: boolean;
  color?: 'primary' | 'error' | 'success' | 'white';
}

export const Button: ForwardRefExoticComponent<ButtonProps> = forwardRef(
  (
    {
      size,
      children,
      disabled,
      isActive,
      isLoading,
      color = 'primary',
      ...props
    },
    ref,
  ) => (
    <MaterialButton
      {...props}
      ref={ref}
      size={size}
      data-color={color}
      aria-busy={isLoading}
      aria-expanded={isActive}
      disabled={disabled || isLoading}
      color={color === 'primary' ? color : 'default'}
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
