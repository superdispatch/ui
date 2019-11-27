import { ButtonBase, makeStyles, Theme, Typography } from '@material-ui/core';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import { Color, TagClassKey } from '@superdispatch/ui';
import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';

import { fontHeightVariant } from '../theme/TypographyStyles';

export type CardButtonClassKey =
  | 'root'
  | 'label'
  | 'hint'
  | 'error'
  | 'sizeSmall'
  | 'sizeLarge'
  | 'icon'
  | 'startIcon'
  | 'endIcon';

const useStyles = makeStyles<Theme, {}, CardButtonClassKey>(
  theme => ({
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',

      border: '1px dashed',
      borderRadius: theme.spacing(0.5),

      padding: theme.spacing(1.5),
      minHeight: theme.spacing(13),

      transition: theme.transitions.create([
        'color',
        'box-shadow',
        'border-color',
        'background-color',
      ]),

      '&$error': {
        color: Color.Red300,
        borderColor: Color.Red300,
        backgroundColor: Color.Red50,
        '&:focus': { backgroundColor: Color.Red75 },
      },

      '&:not($error)': {
        color: Color.Blue300,
        borderColor: Color.Silver500,
        '&:focus': { backgroundColor: Color.Blue50 },
        '&:hover, &:active': {
          borderColor: Color.Blue300,
          backgroundColor: Color.Blue50,
        },
      },
    },

    error: {},

    sizeSmall: { minHeight: theme.spacing(6) },
    sizeLarge: { minHeight: theme.spacing(17.5) },

    label: { display: 'flex', alignItems: 'center' },

    icon: {
      display: 'flex',
      '& .MuiSvgIcon-root': { fontSize: fontHeightVariant('body1') },
    },
    startIcon: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(-0.5),
    },
    endIcon: { marginLeft: theme.spacing(1), marginRight: theme.spacing(-0.5) },

    hint: { color: Color.Silver500, marginTop: theme.spacing(0.5) },
  }),
  { name: 'SuperDispatchCardButton' },
);

export interface CardButtonProps extends ButtonBaseProps {
  error?: ReactNode;
  children?: ReactNode;
  hint?: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;

  size?: 'small' | 'medium' | 'large';

  className?: string;
  classes?: ClassNameMap<TagClassKey>;
}

export const CardButton = forwardRef<HTMLButtonElement, CardButtonProps>(
  (
    {
      hint,
      size,
      error,
      classes,
      className,
      children,
      endIcon,
      startIcon,
      ...buttonProps
    },
    ref,
  ) => {
    const styles = useStyles({ classes });

    return (
      <ButtonBase
        ref={ref}
        className={clsx(
          styles.root,
          size === 'small' && styles.sizeSmall,
          size === 'large' && styles.sizeLarge,
          !!error && styles.error,
          className,
        )}
        {...buttonProps}
      >
        <Typography color="inherit" variant="h4" className={styles.label}>
          {!error && !!startIcon && (
            <span className={clsx(styles.icon, styles.startIcon)}>
              {startIcon}
            </span>
          )}
          {error || children}
          {!error && !!endIcon && (
            <span className={clsx(styles.icon, styles.endIcon)}>{endIcon}</span>
          )}
        </Typography>

        {!error && !!hint && (
          <Typography color="inherit" variant="h5" className={styles.hint}>
            {hint}
          </Typography>
        )}
      </ButtonBase>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  CardButton.displayName = 'CardButton';
}
