import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

const useStyles = makeStyles<SuperDispatchTheme, 'root'>(
  theme => ({
    root: {
      padding: theme.spacing(2, 4),
    },
  }),
  { name: 'SuperDispatchDrawerContent' },
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
