import { Button as MaterialButton, CircularProgress, makeStyles } from '@material-ui/core';
import { ButtonProps as MaterialButtonProps } from '@material-ui/core/Button';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import { Color, ColorVariant } from '../theme/Color';

const CLASS_SMALL = '.MuiButton-sizeSmall';
const CLASS_LARGE = '.MuiButton-sizeLarge';
const CLASS_OUTLINED = '.MuiButton-outlined';
const CLASS_CONTAINED = '.MuiButton-contained';

const CLASS_RED = '.Button-red';
const CLASS_BLUE = '.Button-blue';
const CLASS_GREEN = '.Button-green';

const CLASS_DISABLED = '.Mui-disabled';
const CLASS_IS_LOADING = '.Button-isLoading';

const DEFAULT_PROGRESS_SIZE = 16;
const LARGE_PROGRESS_SIZE = 24;

function containedColor(
  backgroundColor: Color,
  boxShadowColor: Color,
  hoverBackgroundColor: Color,
): CSSProperties {
  return {
    color: '#fff',
    backgroundColor,
    boxShadow: '0 0 0 0 transparent',

    '&:hover': { backgroundColor: hoverBackgroundColor },
    '&:focus': { boxShadow: `0 0 0 3px ${boxShadowColor}` },

    [`&${CLASS_DISABLED}`]: {
      boxShadow: 'none',
      color: Color.Silver80,
      backgroundColor: Color.Silver,

      [`&${CLASS_IS_LOADING}`]: { color: 'transparent', backgroundColor },
    },
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
    '&:hover, &:active': { borderColor: activeColor, backgroundColor: activeBackgroundColor },
    '&:focus': { boxShadow: `0 0 0 2px ${activeShadowColor}` },
    [`&${CLASS_DISABLED}`]: {
      boxShadow: 'none',
      color: Color.Silver80,
      borderColor: Color.Silver90,
      backgroundColor: 'transparent',

      [`&${CLASS_IS_LOADING}`]: { color: 'transparent' },
    },
  };
}

const useStyles = makeStyles(
  theme => ({
    root: {
      fontSize: '14px',
      lineHeight: '20px',

      transition: theme.transitions.create(['color', 'border', 'box-shadow', 'background-color'], {
        duration: theme.transitions.duration.short,
      }),

      [`&${CLASS_SMALL}`]: { fontSize: '14px', lineHeight: '20px' },
      [`&${CLASS_LARGE}`]: { fontSize: '16px', lineHeight: '24px' },

      [`&${CLASS_OUTLINED}`]: {
        padding: '5px 15px',

        [`&${CLASS_SMALL}`]: { padding: '1px 15px' },
        [`&${CLASS_LARGE}`]: { padding: '9px 39px' },

        [`&${CLASS_BLUE}`]: outlinedColor(
          Color.Blue,
          Color.Blue85,
          Color.Blue95,
          Color.Grey15,
          Color.Silver80,
        ),
        [`&${CLASS_RED}`]: outlinedColor(Color.Red, Color.Red80, Color.Red95),
        [`&${CLASS_GREEN}`]: outlinedColor(Color.Green, Color.Green70, Color.Green95),
      },

      [`&${CLASS_CONTAINED}`]: {
        padding: '6px 16px',

        [`&${CLASS_SMALL}`]: { padding: '2px 16px' },
        [`&${CLASS_LARGE}`]: { padding: '10px 40px' },

        [`&${CLASS_RED}`]: containedColor(Color.Red, Color.Red80, Color.Red45),
        [`&${CLASS_BLUE}`]: containedColor(Color.Blue, Color.Blue85, Color.Blue25),
        [`&${CLASS_GREEN}`]: containedColor(Color.Green, Color.Green70, Color.Green25),
      },
    },

    progress: {
      top: '50%',
      left: '50%',
      position: 'absolute',

      marginTop: -(DEFAULT_PROGRESS_SIZE / 2),
      marginLeft: -(DEFAULT_PROGRESS_SIZE / 2),

      [`${CLASS_LARGE} &`]: {
        marginTop: -(LARGE_PROGRESS_SIZE / 2),
        marginLeft: -(LARGE_PROGRESS_SIZE / 2),
      },

      [`${CLASS_CONTAINED} &`]: { color: 'white' },

      [`${CLASS_OUTLINED + CLASS_RED} &`]: { color: Color.Red },
      [`${CLASS_OUTLINED + CLASS_BLUE} &`]: { color: Color.Grey45 },
      [`${CLASS_OUTLINED + CLASS_GREEN} &`]: { color: Color.Green },
    },
  }),
  { name: 'Button' },
);

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
      className,
      size = 'medium',
      color = 'blue',
      variant = 'outlined',
      ...props
    },
    ref,
  ) => {
    const classes = useStyles();

    return (
      <MaterialButton
        {...props}
        ref={ref}
        size={size}
        disableFocusRipple={true}
        disabled={disabled || isLoading}
        variant={variant === 'outlined' ? 'outlined' : 'contained'}
        className={clsx(
          classes.root,
          `Button-${color}`,
          isLoading && `Button-isLoading`,
          className,
        )}
      >
        {!isLoading ? (
          children
        ) : (
          <>
            {children}

            <CircularProgress
              className={classes.progress}
              size={size === 'large' ? LARGE_PROGRESS_SIZE : DEFAULT_PROGRESS_SIZE}
            />
          </>
        )}
      </MaterialButton>
    );
  },
);

Button.displayName = 'Button';
