import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { VisibilityObserver } from '../utils/VisibilityObserver';

const useStyles = makeStyles<
  SuperDispatchTheme,
  'appBar' | 'appBarSticky' | 'toolbar' | 'startAction' | 'endAction'
>(
  theme => ({
    appBar: {
      '&&': {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        transition: theme.transitions.create(['border-color']),

        '&:not($appBarSticky)': {
          borderBottomColor: Color.Transparent,
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
    startAction: {
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(0.5),
    },
    endAction: {
      marginRight: theme.spacing(-2),
      marginLeft: theme.spacing(0.5),
    },
  }),
  { name: 'SuperDispatchDrawerTitle' },
);

export interface DrawerTitleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'title'> {
  children?: ReactNode;

  title: ReactNode;
  subtitle?: ReactNode;
  startAction?: ReactNode;
  endAction?: ReactNode;
}

export const DrawerTitle = forwardRef<HTMLDivElement, DrawerTitleProps>(
  (
    { title, subtitle, startAction, endAction, className, ...props },
    appBarRef,
  ) => {
    const styles = useStyles();

    return (
      <VisibilityObserver
        render={({ ref, visibility }) => (
          <>
            <div ref={ref} />

            <AppBar
              {...props}
              ref={appBarRef}
              position="sticky"
              className={clsx(styles.appBar, className, {
                [styles.appBarSticky]: visibility === 'invisible',
              })}
            >
              <Toolbar className={styles.toolbar}>
                <Grid container={true} alignItems="center">
                  {!!startAction && (
                    <Grid item={true} className={styles.startAction}>
                      {startAction}
                    </Grid>
                  )}

                  <Grid item={true} xs={true}>
                    <Typography variant="h3">{title}</Typography>

                    {!!subtitle && (
                      <Typography variant="body2">{subtitle}</Typography>
                    )}
                  </Grid>

                  {!!endAction && (
                    <Grid item={true} className={styles.endAction}>
                      {endAction}
                    </Grid>
                  )}
                </Grid>
              </Toolbar>
            </AppBar>
          </>
        )}
      />
    );
  },
);
