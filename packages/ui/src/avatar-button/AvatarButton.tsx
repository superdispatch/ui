import {
  Avatar,
  AvatarClassKey,
  AvatarTypeMap,
  ButtonBase,
  CircularProgress,
} from '@material-ui/core';
import { ClassNameMap, CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
  RefAttributes,
} from 'react';

import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

export type AvatarButtonClassKey =
  | 'button'
  | 'overlay'
  | 'progress'
  | 'withIcon'
  | 'sizeLarge'
  | AvatarClassKey;

const useStyles = makeStyles(
  (theme: SuperDispatchTheme): Record<AvatarButtonClassKey, CSSProperties> => {
    const sm = theme.breakpoints.up('sm');

    return {
      button: {
        borderRadius: '50%',

        '&[disabled], &[aria-busy="true"]': {
          '& > $overlay': {
            backgroundColor: Color.White50,
          },
        },

        '&:not([disabled])[aria-busy="false"]': {
          '&:hover, &:focus': {
            '&$withIcon > $overlay': {
              backgroundColor: Color.Black50,

              '& > svg': { opacity: 1 },
            },

            '&:not($withIcon) > $overlay': {
              backgroundColor: Color.Black20,
            },
          },
        },
      },

      overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: '50%',
        backgroundColor: Color.Transparent,
        transition: theme.transitions.create('background-color'),

        '& > svg': {
          opacity: 0,
          color: Color.White,
          transition: theme.transitions.create('opacity'),

          fontSize: theme.spacing(3),
          [sm]: { fontSize: theme.spacing(2) },
        },
      },

      progress: {
        top: 0,
        left: 0,
        position: 'absolute',

        fontSize: theme.spacing(5),
        [sm]: { fontSize: theme.spacing(4) },
      },

      withIcon: {},

      sizeLarge: {
        '& > $root': {
          ...theme.typography.h2,

          width: theme.spacing(7),
          height: theme.spacing(7),

          [sm]: {
            width: theme.spacing(8),
            height: theme.spacing(8),
          },
        },

        '& > $overlay': {
          '& > $progress': {
            fontSize: theme.spacing(7),
            [sm]: { fontSize: theme.spacing(8) },
          },

          '& > svg': {
            fontSize: theme.spacing(4),
            [sm]: { fontSize: theme.spacing(3) },
          },
        },
      },

      root: {},

      colorDefault: {},
      circle: {},
      rounded: {},
      square: {},
      img: {},
      fallback: {},
    };
  },
  { name: 'SD-AvatarButton' },
);

export interface AvatarButtonProps
  extends RefAttributes<HTMLButtonElement>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'large';
  icon?: ReactNode;
  isLoading?: boolean;

  avatarRef?: Ref<HTMLDivElement>;
  classes?: Partial<ClassNameMap<AvatarButtonClassKey>>;

  variant?: AvatarTypeMap['props']['variant'];
  alt?: AvatarTypeMap['props']['alt'];
  src?: AvatarTypeMap['props']['src'];
  sizes?: AvatarTypeMap['props']['sizes'];
  srcSet?: AvatarTypeMap['props']['srcSet'];
  imgProps?: AvatarTypeMap['props']['imgProps'];
}

export const AvatarButton: ForwardRefExoticComponent<AvatarButtonProps> = forwardRef(
  (
    {
      size,
      icon,
      isLoading = false,

      classes,
      disabled = false,
      avatarRef,
      className,

      alt,
      imgProps,
      sizes,
      src,
      srcSet,
      variant,
      children,
      ...props
    },
    ref,
  ) => {
    const {
      button: buttonClassName,
      overlay: overlayClassName,
      progress: progressClassName,
      withIcon: withIconClassName,
      sizeLarge: sizeLargeClassName,
      ...avatarClasses
    } = useStyles({ classes });

    return (
      <ButtonBase
        {...props}
        ref={ref}
        aria-busy={isLoading}
        aria-disabled={disabled}
        disabled={disabled || isLoading}
        className={clsx(className, buttonClassName, {
          [withIconClassName]: !!icon,
          [sizeLargeClassName]: size === 'large',
        })}
      >
        <Avatar
          ref={avatarRef}
          classes={avatarClasses}
          variant={variant}
          alt={alt}
          src={src}
          sizes={sizes}
          srcSet={srcSet}
          imgProps={imgProps}
        >
          {children}
        </Avatar>

        <div className={overlayClassName}>
          {icon}

          {isLoading && (
            <CircularProgress
              size="1em"
              className={progressClassName}
              thickness={size === 'large' ? 2.5 : 1.5}
            />
          )}
        </div>
      </ButtonBase>
    );
  },
);
