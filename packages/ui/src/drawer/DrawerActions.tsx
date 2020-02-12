import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes } from 'react';

import { VisibilityObserver } from '..';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

const useStyles = makeStyles<
  SuperDispatchTheme,
  'appBar' | 'appBarSticky' | 'toolbar'
>(
  theme => ({
    appBar: {
      '&&': {
        bottom: 0,
        top: 'auto',
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        transition: theme.transitions.create(['border-color']),

        '&:not($appBarSticky)': {
          borderTopColor: Color.Transparent,
        },
      },
    },
    appBarSticky: {},
    toolbar: {
      '&&': {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },
  }),
  { name: 'SuperDispatchDrawerActions' },
);

export type DrawerActionsProps = Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

export const DrawerActions = forwardRef<HTMLDivElement, DrawerActionsProps>(
  ({ children, className, ...props }, appBarRef) => {
    const styles = useStyles();

    return (
      <VisibilityObserver
        render={({ ref, visibility }) => (
          <>
            <AppBar
              {...props}
              ref={appBarRef}
              position="sticky"
              className={clsx(className, styles.appBar, {
                [styles.appBarSticky]: visibility === 'invisible',
              })}
            >
              <Toolbar className={styles.toolbar}>{children}</Toolbar>
            </AppBar>

            <div ref={ref} />
          </>
        )}
      />
    );
  },
);
