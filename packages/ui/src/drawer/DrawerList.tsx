import { List, ListProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

const useStyles = makeStyles<SuperDispatchTheme, 'root'>(
  theme => ({
    root: {
      '& .MuiListItem-gutters': {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),

        '&.MuiListItem-secondaryAction': {
          paddingRight: theme.spacing(8),
        },
      },

      '& .MuiListItemSecondaryAction-root': {
        right: theme.spacing(4),

        '& .MuiIconButton-edgeEnd': {
          marginRight: theme.spacing(-2),
        },
      },
    },
  }),
  { name: 'SuperDispatchDrawerList' },
);

export interface DrawerListProps
  extends RefAttributes<HTMLDivElement>,
    Omit<ListProps<'div'>, 'component'> {}

export const DrawerList: ForwardRefExoticComponent<DrawerListProps> = forwardRef(
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
