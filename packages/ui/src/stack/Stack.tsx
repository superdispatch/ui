import { ClassNameMap, CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import {
  ResponsiveProp,
  useResponsiveProp,
} from '../responsive/ResponsiveProp';
import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { HorizontalAlign } from '../theme/types';

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

function spaceVariant(theme: SuperDispatchTheme, space: number): CSSProperties {
  return { paddingBottom: theme.spacing(space) };
}

function alignVariant(align: HorizontalAlign): CSSProperties {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems:
      align === 'right'
        ? 'flex-end'
        : align === 'center'
        ? 'center'
        : undefined,
  };
}

const useStyles = makeStyles<
  SuperDispatchTheme,
  { classes?: Partial<ClassNameMap<StackClassKey>> },
  StackClassKey
>(
  (theme) => ({
    root: {
      '& > $item': {
        '&:last-child': { paddingBottom: 0 },
      },

      '&$space1 > $item': spaceVariant(theme, 1),
      '&$space2 > $item': spaceVariant(theme, 2),
      '&$space3 > $item': spaceVariant(theme, 3),
      '&$space4 > $item': spaceVariant(theme, 4),
      '&$space5 > $item': spaceVariant(theme, 5),
      '&$space6 > $item': spaceVariant(theme, 6),
      '&$space7 > $item': spaceVariant(theme, 7),
      '&$space8 > $item': spaceVariant(theme, 8),
      '&$space9 > $item': spaceVariant(theme, 9),
      '&$space10 > $item': spaceVariant(theme, 10),

      '&$alignRight > $item': alignVariant('right'),
      '&$alignCenter > $item': alignVariant('center'),
    },

    space1: {},
    space2: {},
    space3: {},
    space4: {},
    space5: {},
    space6: {},
    space7: {},
    space8: {},
    space9: {},
    space10: {},

    alignRight: {},
    alignCenter: {},

    item: {},
  }),
  { name: 'SD-Stack' },
);

export type StackSpace = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    RefAttributes<HTMLDivElement> {
  children?: ReactNode;
  classes?: Partial<ClassNameMap<StackClassKey>>;

  space?: ResponsiveProp<StackSpace>;
  align?: ResponsiveProp<HorizontalAlign>;
}

export const Stack: ForwardRefExoticComponent<StackProps> = forwardRef(
  (
    {
      classes,
      children,
      className,
      space: spaceProp = 1,
      align: alignProp = 'left',
      ...props
    },
    ref,
  ) => {
    const styles = useStyles({ classes });
    const align = useResponsiveProp(alignProp);
    const space = useResponsiveProp(spaceProp);

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(className, styles.root, {
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

          [styles.alignRight]: align === 'right',
          [styles.alignCenter]: align === 'center',
        })}
      >
        {flattenChildren(children).map((child, idx) => (
          <div key={idx} className={clsx(styles.item)}>
            {child}
          </div>
        ))}
      </div>
    );
  },
);
