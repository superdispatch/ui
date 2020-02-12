import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

const useStyles = makeStyles<
  SuperDispatchTheme,
  'appBar' | 'toolbar' | 'startAction' | 'endAction'
>(
  theme => ({
    appBar: {
      '&&': {
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
      },
    },
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
  ({ title, subtitle, startAction, endAction, className, ...props }, ref) => {
    const styles = useStyles();

    return (
      <AppBar
        {...props}
        ref={ref}
        position="sticky"
        className={clsx(styles.appBar, className)}
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
    );
  },
);
