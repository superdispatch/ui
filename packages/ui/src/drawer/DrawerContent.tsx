import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

const useStyles = makeStyles<SuperDispatchTheme, 'root'>(
  (theme) => ({
    root: {
      minWidth: '100%',
      padding: theme.spacing(2, 3),
      [theme.breakpoints.up('md')]: {
        minWidth: theme.spacing(54),
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
