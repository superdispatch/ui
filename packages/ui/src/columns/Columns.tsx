import { ClassNameMap, CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from 'react';

import { SuperDispatchTheme, VerticalAlign } from '..';

type ColumnsClassKey =
  | 'root'
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
  | 'column'
  | 'columnContent'
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

function spaceVariant(theme: SuperDispatchTheme, space: number): CSSProperties {
  const gap = theme.spacing(space);

  return {
    marginLeft: -gap,

    '& > $column > $columnContent': {
      paddingLeft: gap,
    },
  };
}

function widthVariant(scale: number): CSSProperties {
  return {
    flex: `0 0 ${scale * 100}%`,
  };
}

const useStyles = makeStyles<
  SuperDispatchTheme,
  { classes?: Partial<ClassNameMap<ColumnsClassKey>> },
  ColumnsClassKey
>(
  (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },

    space1: spaceVariant(theme, 1),
    space2: spaceVariant(theme, 2),
    space3: spaceVariant(theme, 3),
    space4: spaceVariant(theme, 4),
    space5: spaceVariant(theme, 5),
    space6: spaceVariant(theme, 6),
    space7: spaceVariant(theme, 7),
    space8: spaceVariant(theme, 8),
    space9: spaceVariant(theme, 9),
    space10: spaceVariant(theme, 10),

    alignCenter: { alignItems: 'center' },
    alignBottom: { alignItems: 'flex-end' },

    column: { minWidth: 0 },
    columnContent: {},

    widthFluid: { width: '100%' },
    widthContent: { flexShrink: 0 },

    width1of2: widthVariant(1 / 2),
    width1of3: widthVariant(1 / 3),
    width2of3: widthVariant(2 / 3),
    width1of4: widthVariant(1 / 4),
    width3of4: widthVariant(3 / 4),
    width1of5: widthVariant(1 / 5),
    width2of5: widthVariant(2 / 5),
    width3of5: widthVariant(3 / 5),
    width4of5: widthVariant(4 / 5),
  }),
  { name: 'SuperDispatchColumns' },
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

export interface ColumnProps
  extends HTMLAttributes<HTMLDivElement>,
    RefAttributes<HTMLDivElement> {
  width?: ColumnWidth;
}

export const Column: ForwardRefExoticComponent<ColumnProps> = forwardRef(
  ({ children, className, width = 'fluid', ...props }, ref) => {
    const styles = useStyles({});

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(className, styles.column, {
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

export interface ColumnsProps
  extends HTMLAttributes<HTMLDivElement>,
    RefAttributes<HTMLDivElement> {
  space: ColumnsSpace;
  align?: VerticalAlign;
}

export const Columns: ForwardRefExoticComponent<ColumnsProps> = forwardRef(
  ({ space, className, align, ...props }, ref) => {
    const styles = useStyles({});

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

          [styles.alignCenter]: align === 'center',
          [styles.alignBottom]: align === 'bottom',
        })}
      />
    );
  },
);
