import { List, ListProps } from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

const useStyles = makeStyles<SuperDispatchTheme, 'root'>(
  (theme) => {
    const md = theme.breakpoints.up('md');

    const listItemOverrides = (space: number): CSSProperties => ({
      '& .MuiListItem-gutters': {
        paddingLeft: theme.spacing(space),
        paddingRight: theme.spacing(space),

        '&.MuiListItem-secondaryAction': {
          paddingRight: theme.spacing(space * 2),
        },

        '& .MuiListItemSecondaryAction-root': {
          right: theme.spacing(space),

          '& .MuiIconButton-edgeEnd': {
            marginRight: theme.spacing(-(space / 2)),
          },
        },
      },
    });

    return {
      root: {
        minWidth: '100%',
        ...listItemOverrides(3),

        [md]: {
          ...listItemOverrides(4),
          minWidth: theme.spacing(54),
        },
      },
    };
  },
  { name: 'SD-DrawerList' },
);

export type DrawerListProps = Omit<ListProps<'div'>, 'component'>;

export const DrawerList = forwardRef<HTMLDivElement, DrawerListProps>(
  ({ className, ...props }, ref) => {
    const styles = useStyles();

    return (
      <List
        {...props}
        ref={ref}
        component="div"
        className={clsx(className, styles.root)}
      />
    );
  },
);
