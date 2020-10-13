import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';

import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

const useStyles = makeStyles<SuperDispatchTheme, 'root'>(
  (theme) => ({
    root: {
      maxWidth: '100%',
      padding: theme.spacing(2, 3),

      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(2, 4),
      },
    },
  }),
  { name: 'SD-DrawerContent' },
);

export type DrawerContentProps = HTMLAttributes<HTMLDivElement>;

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, ...props }, ref) => {
    const styles = useStyles();

    return (
      <div {...props} ref={ref} className={clsx(styles.root, className)} />
    );
  },
);
