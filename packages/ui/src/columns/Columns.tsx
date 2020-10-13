import { CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';

import {
  CollapseBreakpoint,
  useCollapseBreakpoint,
} from '../responsive/CollapseBreakpoint';
import {
  ResponsiveProp,
  useResponsiveProp,
} from '../responsive/ResponsiveProp';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';
import { VerticalAlign } from '../theme/types';

type ColumnsClassKey =
  | 'root'
  | 'column'
  | 'columnContent'
  | 'layoutDefault'
  | 'layoutCollapsed'
  | 'directionDefault'
  | 'directionReversed'
  | 'space0'
  | 'space1'
  | 'space2'
  | 'space3'
  | 'space4'
  | 'space5'
  | 'space6'
  | 'space7'
  | 'space8'
  | 'space9'
  | 'space10'
  | 'alignCenter'
  | 'alignBottom'
  | 'widthContent'
  | 'widthFluid'
  | 'width1of2'
  | 'width1of3'
  | 'width2of3'
  | 'width1of4'
  | 'width3of4'
  | 'width1of5'
  | 'width2of5'
  | 'width3of5'
  | 'width4of5';

function spaceMixin(theme: SuperDispatchTheme, space: number): CSSProperties {
  const gap = theme.spacing(space);

  return {
    '&$layoutDefault': {
      marginLeft: -gap,
      width: `calc(100% + ${gap}px)`,
      '& > $column > $columnContent': {
        paddingLeft: gap,
      },
    },

    '&$layoutCollapsed > $column > $columnContent': {
      paddingBottom: gap,
    },
  };
}

function widthMixin(scale: number): CSSProperties {
  return { flex: `0 0 ${scale * 100}%` };
}

const useStyles = makeStyles<SuperDispatchTheme, ColumnsClassKey>(
  (theme) => ({
    root: {
      width: '100%',
      display: 'flex',
    },

    column: {
      minWidth: 0,
    },

    columnContent: {},

    layoutDefault: {
      flexDirection: 'row',
      '&$directionReversed': { flexDirection: 'row-reverse' },
    },

    layoutCollapsed: {
      flexDirection: 'column',

      '&$directionDefault': {
        '& > $column:last-child > $columnContent': {
          paddingBottom: 0,
        },
      },

      '&$directionReversed': {
        flexDirection: 'column-reverse',

        '& > $column:first-child > $columnContent': {
          paddingBottom: 0,
        },
      },
    },

    directionDefault: {},
    directionReversed: {},

    space0: {},
    space1: spaceMixin(theme, 1),
    space2: spaceMixin(theme, 2),
    space3: spaceMixin(theme, 3),
    space4: spaceMixin(theme, 4),
    space5: spaceMixin(theme, 5),
    space6: spaceMixin(theme, 6),
    space7: spaceMixin(theme, 7),
    space8: spaceMixin(theme, 8),
    space9: spaceMixin(theme, 9),
    space10: spaceMixin(theme, 10),

    alignCenter: { alignItems: 'center' },
    alignBottom: { alignItems: 'flex-end' },

    widthFluid: { width: '100%' },
    widthContent: { flexShrink: 0 },

    width1of2: widthMixin(1 / 2),
    width1of3: widthMixin(1 / 3),
    width2of3: widthMixin(2 / 3),
    width1of4: widthMixin(1 / 4),
    width3of4: widthMixin(3 / 4),
    width1of5: widthMixin(1 / 5),
    width2of5: widthMixin(2 / 5),
    width3of5: widthMixin(3 / 5),
    width4of5: widthMixin(4 / 5),
  }),
  { name: 'SD-Columns' },
);

export type ColumnWidth =
  | 'content'
  | 'fluid'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5';

export interface ColumnProps {
  children?: ReactNode;
  width?: ResponsiveProp<ColumnWidth>;
}

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, width: widthProp = 'fluid', ...props }, ref) => {
    const styles = useStyles();
    const width = useResponsiveProp(widthProp);

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(styles.column, {
          [styles.widthFluid]: width === 'fluid',
          [styles.widthContent]: width === 'content',
          [styles.width1of2]: width === '1/2',
          [styles.width1of3]: width === '1/3',
          [styles.width2of3]: width === '2/3',
          [styles.width1of4]: width === '1/4',
          [styles.width3of4]: width === '3/4',
          [styles.width1of5]: width === '1/5',
          [styles.width2of5]: width === '2/5',
          [styles.width3of5]: width === '3/5',
          [styles.width4of5]: width === '4/5',
        })}
      >
        <div className={styles.columnContent}>{children}</div>
      </div>
    );
  },
);

export type ColumnsSpace = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ColumnsProps {
  children?: ReactNode;
  reverse?: ResponsiveProp<boolean>;
  space?: ResponsiveProp<ColumnsSpace>;
  align?: ResponsiveProp<VerticalAlign>;
  collapseBelow?: CollapseBreakpoint;
}

export const Columns = forwardRef<HTMLDivElement, ColumnsProps>(
  (
    {
      collapseBelow,
      space: spaceProp = 0,
      align: alignProp = 'top',
      reverse: reverseProp = false,
      ...props
    },
    ref,
  ) => {
    const styles = useStyles({});
    const align = useResponsiveProp(alignProp);
    const space = useResponsiveProp(spaceProp);
    const isReversed = useResponsiveProp(reverseProp);
    const isCollapsed = useCollapseBreakpoint(collapseBelow);

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(styles.root, {
          [styles.layoutDefault]: !isCollapsed,
          [styles.layoutCollapsed]: isCollapsed,
          [styles.directionDefault]: !isReversed,
          [styles.directionReversed]: isReversed,

          [styles.space0]: space === 0,
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

          [styles.alignCenter]: align === 'center',
          [styles.alignBottom]: align === 'bottom',
        })}
      />
    );
  },
);
