import { makeStyles, Theme, Tooltip as MuiTooltip } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import {
  TooltipClassKey as MuiTooltipClassKey,
  TooltipProps as MuiTooltipProps,
} from '@material-ui/core/Tooltip';
import { Color } from '@superdispatch/ui';
import React, { forwardRef } from 'react';

export type TooltipClassKey = MuiTooltipClassKey | 'arrow';

const useStyles = makeStyles<Theme, {}, TooltipClassKey>(
  theme => {
    const arrowSelector = (operator: '=' | '^=', placement: TooltipProps['placement']): string =>
      `$popper[x-placement${operator}${placement}] &`;

    const arrowTransform = (x: number, y: number): string =>
      `translate3d(${x}px, ${y}px, 0) rotate3d(0, 0, 1, 45deg)`;

    return {
      popper: {},
      popperInteractive: {},
      tooltip: {},
      tooltipPlacementBottom: {},
      tooltipPlacementLeft: {},
      tooltipPlacementRight: {},
      tooltipPlacementTop: {},
      touch: {},

      arrow: {
        content: '""',
        position: 'absolute',
        pointerEvents: 'none',
        backfaceVisibility: 'hidden',
        backgroundColor: Color.Grey400,
        width: theme.spacing(1),
        height: theme.spacing(1),
        transform: arrowTransform(0, 0),

        [arrowSelector('^=', 'bottom')]: {
          top: 0,
          borderTopLeftRadius: 2,
          transform: arrowTransform(0, -3),
        },

        [arrowSelector('=', 'bottom-end')]: { transform: arrowTransform(3, -3) },
        [arrowSelector('=', 'bottom-start')]: { transform: arrowTransform(-3, -3) },

        [arrowSelector('^=', 'top')]: {
          bottom: 0,
          borderBottomRightRadius: 2,
          transform: arrowTransform(0, 3),
        },
        [arrowSelector('=', 'top-end')]: { transform: arrowTransform(3, 3) },
        [arrowSelector('=', 'top-start')]: { transform: arrowTransform(-3, 3) },

        [arrowSelector('^=', 'right')]: {
          left: 0,
          borderBottomLeftRadius: 2,
          transform: arrowTransform(-3, 0),
        },

        [arrowSelector('^=', 'left')]: {
          right: 0,
          borderTopRightRadius: 2,
          transform: arrowTransform(3, 0),
        },
      },
    };
  },
  { name: 'SuperDispatchTooltip' },
);

export interface TooltipProps extends Omit<MuiTooltipProps, 'classes'> {
  classes?: Partial<ClassNameMap<MuiTooltipClassKey>>;
}

export const Tooltip = forwardRef(
  ({ title, classes, PopperProps, ...props }: TooltipProps, ref) => {
    const { arrow, ...styles } = useStyles({ classes });
    const [arrowRef, setArrowRef] = React.useState<HTMLSpanElement | null>(null);

    return (
      <MuiTooltip
        {...props}
        ref={ref}
        classes={styles}
        PopperProps={{
          ...PopperProps,
          modifiers: {
            ...PopperProps?.modifiers,
            arrow: { element: arrowRef, enabled: arrowRef != null },
          },
        }}
        title={
          <>
            {title}
            <span ref={setArrowRef} className={arrow} />
          </>
        }
      />
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Tooltip.displayName = 'Tooltip';
}
