import { ClassNameMap, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, {
  Children,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react';

import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { CloneableReactNode, HorizontalAlign } from '../theme/types';

type StackClassKey =
  | 'root'
  | 'item'
  | 'alignRight'
  | 'alignCenter'
  | 'space1'
  | 'space2'
  | 'space3'
  | 'space4'
  | 'space5'
  | 'space6'
  | 'space7'
  | 'space8'
  | 'space9'
  | 'space10';

const useStyles = makeStyles<SuperDispatchTheme, {}, StackClassKey>(
  (theme) => ({
    root: {},
    item: { '&:last-child': { paddingBottom: 0 } },
    alignRight: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'column',
    },
    alignCenter: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },

    space1: { paddingBottom: theme.spacing(1) },
    space2: { paddingBottom: theme.spacing(2) },
    space3: { paddingBottom: theme.spacing(3) },
    space4: { paddingBottom: theme.spacing(4) },
    space5: { paddingBottom: theme.spacing(5) },
    space6: { paddingBottom: theme.spacing(6) },
    space7: { paddingBottom: theme.spacing(7) },
    space8: { paddingBottom: theme.spacing(8) },
    space9: { paddingBottom: theme.spacing(9) },
    space10: { paddingBottom: theme.spacing(10) },
  }),
  { name: 'SuperDispatchStack' },
);

export type StackSpacing = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    RefAttributes<HTMLDivElement> {
  space: StackSpacing;
  align?: HorizontalAlign;
  children?: CloneableReactNode;
  classes?: Partial<ClassNameMap<StackClassKey>>;
}

export const Stack: ForwardRefExoticComponent<StackProps> = forwardRef(
  ({ space, classes, children, align, className, ...props }, ref) => {
    const styles = useStyles({ classes });

    return (
      <div {...props} ref={ref} className={clsx(className, styles.root)}>
        {Children.map(children, (child, idx) => (
          <div
            key={idx}
            className={clsx(styles.item, {
              [styles.alignRight]: align === 'right',
              [styles.alignCenter]: align === 'center',

              [styles.space1]: space === 1,
              [styles.space2]: space === 2,
              [styles.space3]: space === 3,
              [styles.space4]: space === 4,
              [styles.space5]: space === 5,
              [styles.space6]: space === 6,
              [styles.space7]: space === 7,
              [styles.space8]: space === 8,
              [styles.space9]: space === 9,
              [styles.space10]: space === 10,
            })}
          >
            {child}
          </div>
        ))}
      </div>
    );
  },
);
