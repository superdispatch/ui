import React, { forwardRef } from 'react';
import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';

interface SuperTextProps extends Omit<TypographyProps, 'variant' | 'innerRef' | 'variantMapping'> {
  variant?:
    | 'Header1'
    | 'Header2'
    | 'Header3'
    | 'Header4'
    | 'Header5'
    | 'Header6'
    | 'Body'
    | 'BodySemibold'
    | 'Caption';
}

export const SuperText = forwardRef(({ variant, ...props }: SuperTextProps, ref) => (
  <Typography
    ref={ref}
    {...props}
    variant={
      variant === 'Header1'
        ? 'h1'
        : variant === 'Header2'
        ? 'h2'
        : variant === 'Header3'
        ? 'h3'
        : variant === 'Header4'
        ? 'h4'
        : variant === 'Header5'
        ? 'h5'
        : variant === 'Header6'
        ? 'h6'
        : variant === 'Body'
        ? 'body2'
        : variant === 'BodySemibold'
        ? 'body1'
        : variant === 'Caption'
        ? 'caption'
        : undefined
    }
  />
));

SuperText.displayName = 'SuperText';
