import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Button as MaterialButton, makeStyles, CircularProgress } from '@material-ui/core';
import { ButtonProps as MaterialButtonProps } from '@material-ui/core/Button';
import { ColorVariant, Color } from '..';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

function containedColor(
  backgroundColor: Color,
  boxShadowColor: Color,
  hoverBackgroundColor: Color,
): CSSProperties {
  return {
    backgroundColor,
    boxShadow: '0 0 0 0 transparent',

    '&:focus': {
      boxShadow: `0 0 0 3px ${boxShadowColor}`,
    },

    '&:hover': {
      backgroundColor: hoverBackgroundColor,
    },
  };
}

function outlinedColor(
  staleTextColor: Color,
  staleBorderColor: Color,
  hoverBackgroundColor: Color,
  activeTextColor: Color = staleTextColor,
  activeBorderColor: Color = staleBorderColor,
): CSSProperties {
  return {
    color: staleTextColor,
    borderColor: staleBorderColor,
    boxShadow: '0 0 0 0 transparent',

    '&:hover, &:active, &:focus': {
      color: activeTextColor,
      borderColor: activeBorderColor,
    },

    '&:hover': {
      backgroundColor: hoverBackgroundColor,
    },

    '&:focus': {
      boxShadow: `0 0 0 1px ${activeBorderColor}`,
    },
  };
}

const useStyles = makeStyles({
  root: { fontSize: '14px', lineHeight: '20px' },
  small: { fontSize: '14px', lineHeight: '20px' },
  large: { fontSize: '16px', lineHeight: '24px' },

  contained: { padding: '6px 16px' },
  containedSmall: { padding: '2px 16px' },
  containedLarge: { padding: '10px 40px' },

  containedBlue: containedColor(Color.Blue, Color.Blue85, Color.Blue25),
  containedRed: containedColor(Color.Red, Color.Red80, Color.Red45),
  containedGrey: containedColor(Color.Grey, Color.Grey60, Color.Grey25),
  containedGreen: containedColor(Color.Green, Color.Green70, Color.Green25),

  outlined: { padding: '5px 15px' },
  outlinedSmall: { padding: '1px 15px' },
  outlinedLarge: { padding: '9px 39px' },

  outlinedBlue: outlinedColor(Color.Grey15, Color.Silver80, Color.Blue95, Color.Blue, Color.Blue40),
  outlinedRed: outlinedColor(Color.Red, Color.Red45, Color.Red95),
  outlinedGrey: outlinedColor(Color.Grey, Color.Grey45, Color.Silver80),
  outlinedGreen: outlinedColor(Color.Green, Color.Green35, Color.Green95),

  loading: { '&&': { color: 'transparent' } },
  loadingContainedBlue: { '&&': { backgroundColor: Color.Blue } },
  loadingContainedRed: { '&&': { backgroundColor: Color.Red } },
  loadingContainedGreen: { '&&': { backgroundColor: Color.Green } },
  loadingContainedGrey: { '&&': { backgroundColor: Color.Grey } },

  progress: { top: '50%', left: '50%', position: 'absolute' },
  progressContained: { color: 'white' },
  progressOutlinedBlue: { '&&': { color: Color.Blue } },
  progressOutlinedRed: { '&&': { color: Color.Red } },
  progressOutlinedGreen: { '&&': { color: Color.Green } },
  progressOutlinedGrey: { '&&': { color: Color.Grey } },
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
    const isGrey = color === 'grey';
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
              : isGrey
              ? classes.outlinedGrey
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
              : isGrey
              ? classes.containedGrey
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

          disabled: !isLoading
            ? undefined
            : clsx(
                classes.loading,
                !isOutlined &&
                  (isRed
                    ? classes.loadingContainedRed
                    : isBlue
                    ? classes.loadingContainedBlue
                    : isGrey
                    ? classes.loadingContainedGrey
                    : isGreen
                    ? classes.loadingContainedGreen
                    : undefined),
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
                  : isGrey
                  ? classes.progressOutlinedGrey
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
