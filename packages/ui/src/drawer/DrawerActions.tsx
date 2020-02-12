import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

const useStyles = makeStyles<SuperDispatchTheme, 'appBar' | 'toolbar'>(
  theme => ({
    appBar: {
      '&&': {
        bottom: 0,
        top: 'auto',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: 'none',
      },
    },
    toolbar: {
      '&&': {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },
  }),
);

export type DrawerActionsProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

export const DrawerActions = forwardRef<HTMLDivElement, DrawerActionsProps>(
  ({ children, className, ...props }, ref) => {
    const styles = useStyles();

    return (
      <AppBar
        {...props}
        ref={ref}
        position="sticky"
        className={clsx(className, styles.appBar)}
      >
        <Toolbar className={styles.toolbar}>{children}</Toolbar>
      </AppBar>
    );
  },
);
