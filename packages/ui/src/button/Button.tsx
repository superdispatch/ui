import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Button as MaterialButton, makeStyles, CircularProgress } from '@material-ui/core';
import { ButtonProps as MaterialButtonProps } from '@material-ui/core/Button/Button';
import { ColorVariant, Color } from '../theme/Color';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

function containedColor(
  backgroundColor: Color,
  boxShadowColor: Color,
  hoverBackgroundColor: Color,
): CSSProperties {
  return {
    backgroundColor,
    boxShadow: '0 0 0 0 transparent',
    '&:hover': { backgroundColor: hoverBackgroundColor },
    '&:focus': { boxShadow: `0 0 0 3px ${boxShadowColor}` },
  };
}

function outlinedColor(
  activeColor: Color,
  activeShadowColor: Color,
  activeBackgroundColor: Color,
  staleColor: Color = activeColor,
  staleBorderColor: Color = activeColor,
): CSSProperties {
  return {
    color: staleColor,
    borderColor: staleBorderColor,
    boxShadow: '0 0 0 0 transparent',

    '&:hover, &:active, &:focus': { color: activeColor },
    '&:hover, &:active': {
      borderColor: activeColor,
      backgroundColor: activeBackgroundColor,
    },
    '&:focus': { boxShadow: `0 0 0 2px ${activeShadowColor}` },
  };
}

const useStyles = makeStyles({
  root: { fontSize: '14px', lineHeight: '20px' },
  small: { fontSize: '14px', lineHeight: '20px' },
  large: { fontSize: '16px', lineHeight: '24px' },

  outlined: { padding: '5px 15px' },
  outlinedSmall: { padding: '1px 15px' },
  outlinedLarge: { padding: '9px 39px' },

  outlinedBlue: outlinedColor(Color.Blue, Color.Blue85, Color.Blue95, Color.Grey15, Color.Silver80),
  outlinedRed: outlinedColor(Color.Red, Color.Red80, Color.Red95),
  outlinedGreen: outlinedColor(Color.Green, Color.Green70, Color.Green95),

  contained: { padding: '6px 16px' },
  containedSmall: { padding: '2px 16px' },
  containedLarge: { padding: '10px 40px' },

  containedBlue: containedColor(Color.Blue, Color.Blue85, Color.Blue25),
  containedRed: containedColor(Color.Red, Color.Red80, Color.Red45),
  containedGreen: containedColor(Color.Green, Color.Green70, Color.Green25),

  disabledOutlined: { '&&': { color: Color.Silver80, borderColor: Color.Silver90 } },
  disabledContained: { '&&': { color: Color.Silver80, backgroundColor: Color.Silver } },

  loading: { '&&': { color: 'transparent' } },
  loadingContainedBlue: { '&&': { backgroundColor: Color.Blue } },
  loadingContainedRed: { '&&': { backgroundColor: Color.Red } },
  loadingContainedGreen: { '&&': { backgroundColor: Color.Green } },

  progress: { top: '50%', left: '50%', position: 'absolute' },
  progressContained: { color: 'white' },
  progressOutlinedBlue: { '&&': { color: Color.Grey45 } },
  progressOutlinedRed: { '&&': { color: Color.Red } },
  progressOutlinedGreen: { '&&': { color: Color.Green } },
});

export type ButtonColor = Exclude<ColorVariant, 'silver' | 'purple' | 'teal' | 'yellow'>;

export interface ButtonProps
  extends Omit<MaterialButtonProps, 'color' | 'variant' | 'disableFocusRipple'> {
  color?: ButtonColor;
  isLoading?: boolean;
  variant?: 'outlined' | 'contained';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      disabled,
      isLoading,
      size = 'medium',
      color = 'blue',
      variant = 'outlined',
      classes: overrides = {},
      ...props
    },
    ref,
  ) => {
    const classes = useStyles();
    const isLarge = size === 'large';
    const isOutlined = variant === 'outlined';

    const isBlue = color === 'blue';
    const isRed = color === 'red';
    const isGreen = color === 'green';

    const progressSize = isLarge ? 24 : 16;

    return (
      <MaterialButton
        {...props}
        ref={ref}
        disableFocusRipple={true}
        size={size}
        disabled={disabled || isLoading}
        variant={isOutlined ? 'outlined' : 'contained'}
        color={color == null ? undefined : isBlue ? 'primary' : 'secondary'}
        classes={{
          ...overrides,

          root: clsx(classes.root, overrides.root),

          outlined: clsx(
            classes.outlined,
            isRed
              ? classes.outlinedRed
              : isBlue
              ? classes.outlinedBlue
              : isGreen
              ? classes.outlinedGreen
              : undefined,
            overrides.outlined,
          ),

          contained: clsx(
            classes.contained,
            isRed
              ? classes.containedRed
              : isBlue
              ? classes.containedBlue
              : isGreen
              ? classes.containedGreen
              : undefined,
            overrides.contained,
          ),

          sizeSmall: clsx(
            classes.small,
            isOutlined ? classes.outlinedSmall : classes.containedSmall,
            overrides.sizeSmall,
          ),

          sizeLarge: clsx(
            classes.large,
            isOutlined ? classes.outlinedLarge : classes.containedLarge,
            overrides.sizeLarge,
          ),

          disabled: isLoading
            ? clsx(
                classes.loading,
                !isOutlined &&
                  (isRed
                    ? classes.loadingContainedRed
                    : isBlue
                    ? classes.loadingContainedBlue
                    : isGreen
                    ? classes.loadingContainedGreen
                    : undefined),
              )
            : clsx(
                isOutlined ? classes.disabledOutlined : classes.disabledContained,
                overrides.disabled,
              ),
        }}
      >
        {!isLoading ? (
          children
        ) : (
          <>
            {children}

            <CircularProgress
              size={progressSize}
              className={clsx(
                classes.progress,
                !isOutlined
                  ? classes.progressContained
                  : isRed
                  ? classes.progressOutlinedRed
                  : isBlue
                  ? classes.progressOutlinedBlue
                  : isGreen
                  ? classes.progressOutlinedGreen
                  : undefined,
              )}
              style={{ marginTop: -(progressSize / 2), marginLeft: -(progressSize / 2) }}
            />
          </>
        )}
      </MaterialButton>
    );
  },
);

Button.displayName = 'Button';
