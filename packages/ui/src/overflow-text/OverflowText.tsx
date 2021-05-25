import {
  Tooltip,
  TooltipProps,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import {
  ElementType,
  forwardRef,
  ForwardRefExoticComponent,
  useState,
} from 'react';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';
import { VisibilityObserver } from '../utils/VisibilityObserver';

const useStyles = makeStyles(
  (
    theme: SuperDispatchTheme,
  ): Record<'root' | 'truncated' | 'sentinel', CSSProperties> => ({
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
  { name: 'SD-OverflowText' },
);

export interface OverflowTextProps extends Omit<TypographyProps, 'noWrap'> {
  component?: ElementType;
  disableUnderline?: boolean;
  TooltipProps?: Omit<Partial<TooltipProps>, 'open' | 'children'>;
}

export const OverflowText: ForwardRefExoticComponent<OverflowTextProps> =
  forwardRef(
    (
      {
        onClick,
        children,
        className,
        disableUnderline,
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
                onOpen={() => {
                  setIsOpen(true);
                }}
                onClose={() => {
                  setIsOpen(false);
                }}
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
                    {
                      [styles.truncated]:
                        !disableUnderline && visibility === 'invisible',
                    },
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
