import { makeStyles, Theme, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { CountryCode } from 'libphonenumber-js';
import React, { forwardRef, ImgHTMLAttributes, Ref, useState } from 'react';

const useStyles = makeStyles<Theme>(
  theme => ({ root: { minHeight: theme.spacing(2), minWidth: theme.spacing(2.75) } }),
  { name: 'SuperDispatchPhoneFieldFlag' },
);

export interface PhoneFieldFlagProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  code: CountryCode;
}

export const PhoneFieldFlag = forwardRef<HTMLElement, PhoneFieldFlagProps>(
  ({ code, alt = code, className, ...props }, ref) => {
    const styles = useStyles();
    const [failedCode, setFailedCode] = useState<CountryCode>();

    if (failedCode === code) {
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
        onError={() => setFailedCode(code)}
        src={`https://cdn.jsdelivr.net/gh/madebybowtie/FlagKit@2.2/Assets/SVG/${code}.svg`}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  PhoneFieldFlag.displayName = 'PhoneFieldFlag';
}
