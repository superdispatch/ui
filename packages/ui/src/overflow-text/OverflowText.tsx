import {
  Tooltip,
  TooltipProps,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, {
  ElementType,
  forwardRef,
  ForwardRefExoticComponent,
  useState,
} from 'react';

import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';
import { VisibilityObserver } from '../utils/VisibilityObserver';

const useStyles = makeStyles<
  SuperDispatchTheme,
  'root' | 'truncated' | 'sentinel'
>(
  (theme) => ({
    root: {
      marginBottom: -1,
      borderBottom: '1px dashed transparent',
      transition: theme.transitions.create('border'),

      '&$truncated': {
        cursor: 'pointer',
        borderBottomColor: Color.Silver500,
      },
    },
    truncated: {},
    sentinel: {
      width: 1,
      height: '100%',
      display: 'inline-block',
    },
  }),
  { name: 'SuperDispatchOverflowText' },
);

export interface OverflowTextProps extends Omit<TypographyProps, 'noWrap'> {
  component?: ElementType;
  TooltipProps?: Omit<TooltipProps, 'open' | 'children'>;
}

export const OverflowText: ForwardRefExoticComponent<OverflowTextProps> = forwardRef(
  (
    {
      onClick,
      children,
      className,
      TooltipProps: {
        title = children,
        enterDelay = 1000,
        ...tooltipProps
      } = {} as const,
      ...props
    },
    rootRef,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const styles = useStyles();
    return (
      <VisibilityObserver
        render={({ ref, visibility }) => {
          const isTooltipEnabled = !!children && visibility === 'invisible';

          return (
            <Tooltip
              {...tooltipProps}
              enterDelay={1000}
              title={title || ''}
              disableFocusListener={true}
              open={isOpen && isTooltipEnabled}
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
            >
              <Typography
                {...props}
                ref={rootRef}
                noWrap={true}
                onClick={(event) => {
                  setIsOpen(true);
                  onClick?.(event);
                }}
                className={clsx(
                  styles.root,
                  { [styles.truncated]: visibility === 'invisible' },
                  className,
                )}
              >
                {children}

                {!!children && <span ref={ref} className={styles.sentinel} />}
              </Typography>
            </Tooltip>
          );
        }}
      />
    );
  },
);
