import { List, ListProps } from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { forwardRef } from 'react';

import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';

function listItemMixins(
  theme: SuperDispatchTheme,
  space: number,
): CSSProperties {
  return {
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
  };
}

const useStyles = makeStyles(
  (theme: SuperDispatchTheme) => ({
    root: {
      maxWidth: '100%',
      ...listItemMixins(theme, 3),

      [theme.breakpoints.up('md')]: {
        ...listItemMixins(theme, 4),
      },
    },
  }),
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
