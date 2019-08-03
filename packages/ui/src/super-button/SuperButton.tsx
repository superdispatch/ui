import React, { forwardRef, ComponentType, ElementType } from 'react';
import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';

export interface SuperButtonProps extends Omit<ButtonProps, 'variant'> {
  component?: ElementType | ComponentType;
}

export const SuperButton = forwardRef<HTMLButtonElement, SuperButtonProps>((props, ref) => (
  <Button {...props} ref={ref} variant="outlined" />
));

SuperButton.displayName = 'SuperButton';
