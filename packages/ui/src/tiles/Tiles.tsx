import { ClassNameMap, CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import { InlineSpace, ResponsiveProp, useResponsiveProp } from '..';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

const PREVENT_COLLAPSE = 1;

type TilesClassKey =
  | 'root'
  | 'container'
  | 'child'
  | 'childContainer'
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
  | 'columns1'
  | 'columns2'
  | 'columns3'
  | 'columns4'
  | 'columns5'
  | 'columns6';
export type TilesSpace = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type TilesColumns = 1 | 2 | 3 | 4 | 5 | 6;

function spaceVariant(
  theme: SuperDispatchTheme,
  space: TilesSpace,
): CSSProperties {
  const gap = theme.spacing(space);

  return {
    '&:before': {
      marginTop: -gap - PREVENT_COLLAPSE,
    },

    '& > $container': {
      marginLeft: -gap,

      '& > $child > $childContainer': {
        marginTop: gap,
        marginLeft: gap,
      },
    },
  };
}

function columnVariant(columns: TilesColumns): CSSProperties {
  return {
    flex: `0 0 ${100 / columns}%`,
  };
}

const useStyles = makeStyles<
  SuperDispatchTheme,
  { classes?: Partial<ClassNameMap<TilesClassKey>> },
  TilesClassKey
>(
  (theme) => ({
    root: {
      paddingTop: PREVENT_COLLAPSE,

      '&:before': {
        content: '""',
        display: 'block',
        marginTop: -PREVENT_COLLAPSE,
      },
    },

    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },

    child: {
      minWidth: 0,
    },

    childContainer: {
      height: '100%',
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

    columns1: columnVariant(1),
    columns2: columnVariant(2),
    columns3: columnVariant(3),
    columns4: columnVariant(4),
    columns5: columnVariant(5),
    columns6: columnVariant(6),
  }),
  { name: 'SD-Tiles' },
);

export interface TilesProps {
  children?: ReactNode;
  space?: ResponsiveProp<InlineSpace>;
  columns?: ResponsiveProp<TilesColumns>;
}

export const Tiles = forwardRef<HTMLDivElement, TilesProps>(
  ({ children, space: spaceProp = 1, columns: columnsProp = 1 }, ref) => {
    const styles = useStyles({});
    const space = useResponsiveProp(spaceProp);
    const columns = useResponsiveProp(columnsProp);

    return (
      <div
        ref={ref}
        className={clsx(styles.root, {
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
        <div className={styles.container}>
          {flattenChildren(children).map((child, idx) => (
            <div
              key={idx}
              className={clsx(styles.child, {
                [styles.columns1]: columns === 1,
                [styles.columns2]: columns === 2,
                [styles.columns3]: columns === 3,
                [styles.columns4]: columns === 4,
                [styles.columns5]: columns === 5,
                [styles.columns6]: columns === 6,
              })}
            >
              <div className={styles.childContainer}>{child}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
