import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import React, { forwardRef, ImgHTMLAttributes } from 'react';

const useStyles = makeStyles<Theme>(
  theme => ({ root: { minHeight: theme.spacing(2), minWidth: theme.spacing(2.75) } }),
  { name: 'SuperDispatchPhoneFieldFlag' },
);

export interface PhoneFieldFlagProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  code: string;
}

export const PhoneFieldFlag = forwardRef<HTMLImageElement, PhoneFieldFlagProps>(
  ({ code, alt = code, className, ...props }) => {
    const styles = useStyles();

    return (
      <img
        {...props}
        alt={alt}
        className={clsx(styles.root, className)}
        src={`https://cdn.jsdelivr.net/gh/madebybowtie/FlagKit@2.2/Assets/SVG/${code}.svg`}
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  PhoneFieldFlag.displayName = 'PhoneFieldFlag';
}
