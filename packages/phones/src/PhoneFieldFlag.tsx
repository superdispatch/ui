import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, ImgHTMLAttributes, Ref } from 'react';

import { PhoneRegionCode } from './data/PhoneNumber';

const useStyles = makeStyles<Theme>(
  (theme) => ({
    root: { minHeight: theme.spacing(2), minWidth: theme.spacing(2.75) },
  }),
  { name: 'SD-PhoneFieldFlag' },
);

export interface PhoneFieldFlagProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  code: PhoneRegionCode;
}

export const PhoneFieldFlag = forwardRef<HTMLElement, PhoneFieldFlagProps>(
  ({ code, alt = code, className, ...props }, ref) => {
    const styles = useStyles();

    if (code === 'AC' || code === 'BQ' || code === 'EH' || code === 'TA') {
      return (
        <Typography
          ref={ref}
          variant="h6"
          align="center"
          component="span"
          color="textSecondary"
          className={clsx(styles.root, className)}
        >
          {code}
        </Typography>
      );
    }

    return (
      <img
        {...props}
        alt={alt}
        ref={ref as Ref<HTMLImageElement>}
        className={clsx(styles.root, className)}
        src={`https://cdn.jsdelivr.net/gh/madebybowtie/FlagKit@2.2/Assets/SVG/${code}.svg`}
      />
    );
  },
);
