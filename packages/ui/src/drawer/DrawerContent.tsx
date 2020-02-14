import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react';

import { SuperDispatchTheme } from '../theme/ThemeProvider';

const useStyles = makeStyles<SuperDispatchTheme, 'root'>(
  theme => ({
    root: {
      padding: theme.spacing(2, 4),
    },
  }),
  { name: 'SuperDispatchDrawerContent' },
);

export interface DrawerContentProps
  extends RefAttributes<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {}

export const DrawerContent: ForwardRefExoticComponent<DrawerContentProps> = forwardRef(
  ({ className, ...props }, ref) => {
    const styles = useStyles();

    return (
      <div {...props} ref={ref} className={clsx(styles.root, className)} />
    );
  },
);
