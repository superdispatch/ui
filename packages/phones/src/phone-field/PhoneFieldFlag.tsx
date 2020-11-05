import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, ImgHTMLAttributes, Ref } from 'react';

import { CountryISO } from '../country-code-metadata/CountryCodeMetadata';

const useStyles = makeStyles<Theme>(
  (theme) => ({
    root: { minHeight: theme.spacing(2), minWidth: theme.spacing(2.75) },
  }),
  { name: 'SD-PhoneFieldFlag' },
);

export interface PhoneFieldFlagProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  country: CountryISO;
}

export const PhoneFieldFlag = forwardRef<HTMLElement, PhoneFieldFlagProps>(
  ({ country, alt = country, className, ...props }, ref) => {
    const styles = useStyles();

    if (
      country === 'AC' ||
      country === 'BQ' ||
      country === 'EH' ||
      country === 'TA'
    ) {
      return (
        <Typography
          ref={ref}
          variant="h6"
          align="center"
          component="span"
          color="textSecondary"
          className={clsx(styles.root, className)}
        >
          {country}
        </Typography>
      );
    }

    return (
      <img
        {...props}
        alt={alt}
        ref={ref as Ref<HTMLImageElement>}
        className={clsx(styles.root, className)}
        src={`https://cdn.jsdelivr.net/gh/madebybowtie/FlagKit@2.2/Assets/SVG/${country}.svg`}
      />
    );
  },
);
