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
import { HorizontalAlign, VerticalAlign } from '../theme/types';

type InlineClassKey =
  | 'root'
  | 'container'
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
  | 'verticalBottom'
  | 'verticalCenter'
  | 'horizontalRight'
  | 'horizontalCenter'
  | 'item';

function spaceVariant(theme: SuperDispatchTheme, space: number): CSSProperties {
  const preventCollapse = 1;
  const gap = theme.spacing(space);

  return {
    paddingTop: preventCollapse,

    '&:before': {
      content: '""',
      display: 'block',
      marginTop: -gap - preventCollapse,
    },

    '& > $container': {
      marginLeft: -gap,

      '& > $item': { paddingTop: gap, paddingLeft: gap },
    },
  };
}

const useStyles = makeStyles<
  SuperDispatchTheme,
  { classes?: Partial<ClassNameMap<InlineClassKey>> },
  InlineClassKey
>(
  (theme) => ({
    root: {},

    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
    },

    item: {},

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

    verticalCenter: {
      '& > $container': {
        alignItems: 'center',
      },
    },
    verticalBottom: {
      '& > $container': {
        alignItems: 'flex-end',
      },
    },

    horizontalRight: {
      '& > $container': {
        justifyContent: 'flex-end',
      },
    },

    horizontalCenter: {
      '& > $container': {
        justifyContent: 'center',
      },
    },
  }),
  { name: 'SD-Inline' },
);

export type InlineSpace = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface InlineProps
  extends HTMLAttributes<HTMLDivElement>,
    RefAttributes<HTMLDivElement> {
  children?: ReactNode;
  classes?: Partial<ClassNameMap<InlineClassKey>>;

  space?: ResponsiveProp<InlineSpace>;
  verticalAlign?: ResponsiveProp<VerticalAlign>;
  horizontalAlign?: ResponsiveProp<HorizontalAlign>;
}

export const Inline: ForwardRefExoticComponent<InlineProps> = forwardRef(
  (
    {
      classes,
      children,
      className,
      space: spaceProp = 1,
      verticalAlign: verticalAlignProp = 'top',
      horizontalAlign: horizontalAlignProp = 'left',
      ...props
    },
    ref,
  ) => {
    const styles = useStyles({ classes });
    const space = useResponsiveProp(spaceProp);
    const verticalAlign = useResponsiveProp(verticalAlignProp);
    const horizontalAlign = useResponsiveProp(horizontalAlignProp);

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

          [styles.verticalBottom]: verticalAlign === 'bottom',
          [styles.verticalCenter]: verticalAlign === 'center',

          [styles.horizontalRight]: horizontalAlign === 'right',
          [styles.horizontalCenter]: horizontalAlign === 'center',
        })}
      >
        <div className={styles.container}>
          {flattenChildren(children).map((child, idx) => (
            <div key={idx} className={styles.item}>
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
