import {
  fade,
  IconButton,
  makeStyles,
  SnackbarContent as MuiSnackbarContent,
  Theme,
} from '@material-ui/core';
import {
  SnackbarContentClassKey as MuiSnackbarContentClassKey,
  SnackbarContentProps as MuiSnackbarContentProps,
} from '@material-ui/core/SnackbarContent';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';
import { CheckCircle, Close, Warning } from '@material-ui/icons';
import clsx from 'clsx';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';

import { Color } from '../theme/Color';
import { fontHeightVariant } from '../theme/styles/TypographyStyles';

type SnackbarContentClassKey =
  | MuiSnackbarContentClassKey
  | 'icon'
  | 'closeButton'
  | 'variantError'
  | 'variantSuccess';

const useStyles = makeStyles<Theme, {}, SnackbarContentClassKey>(
  theme => ({
    root: {
      '&:not($variantError):not($variantSuccess)': {
        color: Color.Grey500,
        backgroundColor: Color.White,
      },

      '&$variantError': {
        color: Color.White,
        backgroundColor: Color.Red300,
      },

      '&$variantSuccess': {
        color: Color.White,
        backgroundColor: Color.Green300,
      },
    },

    action: {},
    message: {},

    icon: {
      left: 0,
      position: 'relative',
      top: theme.spacing(0.25),
      marginRight: theme.spacing(1),
      fontSize: fontHeightVariant('caption', 'mobile'),
      [theme.breakpoints.up('sm')]: {
        fontSize: fontHeightVariant('caption', 'desktop'),
      },
    },

    closeButton: {
      '$variantError &, $variantSuccess &': {
        color: Color.White,
        '&:hover, &:focus': { backgroundColor: fade(Color.White, 0.2) },
      },
    },

    variantError: {},
    variantSuccess: {},
  }),
  { name: 'SuperDispatchSnackbarContent' },
);

export type SnackbarVariant = 'default' | 'error' | 'success';

export interface SnackbarContentProps
  extends RefAttributes<unknown>,
    Omit<MuiSnackbarContentProps, 'classes' | 'message' | 'variant'> {
  children?: ReactNode;
  onClose?: () => void;
  variant?: SnackbarVariant;
  classes?: Partial<ClassNameMap<SnackbarContentClassKey>>;
}

export const SnackbarContent: ForwardRefExoticComponent<SnackbarContentProps> = forwardRef<
  unknown,
  SnackbarContentProps
>(
  (
    {
      action,
      children,
      onClose,
      className,
      classes,
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const {
      icon,
      closeButton,
      variantError,
      variantSuccess,
      ...styles
    } = useStyles({ classes });
    const Icon =
      variant === 'error'
        ? Warning
        : variant === 'success'
        ? CheckCircle
        : undefined;

    return (
      <MuiSnackbarContent
        {...props}
        ref={ref}
        classes={styles}
        className={clsx(
          variant === 'error' && variantError,
          variant === 'success' && variantSuccess,
          className,
        )}
        message={
          <>
            {Icon && <Icon className={icon} />}
            {children}
          </>
        }
        action={
          !action && !onClose ? null : (
            <>
              {action}
              {onClose && (
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  className={closeButton}
                >
                  <Close />
                </IconButton>
              )}
            </>
          )
        }
      />
    );
  },
);
