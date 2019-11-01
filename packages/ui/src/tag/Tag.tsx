import { Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import cx from 'clsx';
import React, { forwardRef } from 'react';

import { ColorVariant } from '../theme/Color';
import { ButtonClassKey, useTagStyles } from './TagStyles';

export type TagColor = Exclude<ColorVariant, 'silver'>;
export type TagVariant = 'subtle' | 'bold';

export interface TagProps extends Omit<TypographyProps, 'classes' | 'color' | 'variant'> {
  classes?: ClassNameMap<ButtonClassKey>;

  color: TagColor;
  variant: TagVariant;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ color, variant, children, classes, className, ...props }, ref) => {
    const styles = useTagStyles({ classes });

    return (
      <Typography
        {...props}
        ref={ref}
        variant="body1"
        component="span"
        className={cx(
          styles.root,
          color === 'grey' && styles.colorGrey,
          color === 'blue' && styles.colorBlue,
          color === 'green' && styles.colorGreen,
          color === 'purple' && styles.colorPurple,
          color === 'red' && styles.colorRed,
          color === 'teal' && styles.colorTeal,
          color === 'yellow' && styles.colorYellow,
          variant === 'subtle' && styles.variantSubtle,
          variant === 'bold' && styles.variantBold,
          className,
        )}
      >
        {children}
      </Typography>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}
