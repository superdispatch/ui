import { SvgIcon, Typography, TypographyProps } from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { forwardRef, ReactNode } from 'react';

import { OverflowText, OverflowTextProps } from '../overflow-text/OverflowText';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';
import { isEmptyReactNode } from '../utils/isEmptyReactNode';

function sizeVariant(
  theme: SuperDispatchTheme,
  mobileSpacing: number,
  desktopSpacing: number,
): CSSProperties {
  return {
    '& > $item:not(:last-child)': {
      paddingBottom: theme.spacing(mobileSpacing),

      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing(desktopSpacing),
      },
    },
  };
}

const useStyles = makeStyles<
  SuperDispatchTheme,
  'list' | 'listSmall' | 'listLarge' | 'item' | 'icon'
>(
  (theme) => ({
    list: sizeVariant(theme, 2, 1),
    listSmall: sizeVariant(theme, 1, 0.5),
    listLarge: sizeVariant(theme, 3, 2),

    item: {
      display: 'flex',
      alignItems: 'center',
    },

    icon: {
      display: 'inline-flex',
      marginRight: theme.spacing(1),

      '& > .MuiSvgIcon-root': {
        color: Color.Grey100,
        fontSize: theme.spacing(3),

        [theme.breakpoints.up('sm')]: {
          fontSize: theme.spacing(2),
        },
      },
    },
  }),
  { name: 'SD-DescriptionList' },
);

//
// DescriptionList
//

export interface DescriptionListProps {
  children?: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export const DescriptionList = forwardRef<HTMLDivElement, DescriptionListProps>(
  ({ size, ...props }, ref) => {
    const styles = useStyles();

    return (
      <div
        {...props}
        ref={ref}
        data-size={size}
        className={clsx(styles.list, {
          [styles.listSmall]: size === 'small',
          [styles.listLarge]: size === 'large',
        })}
      />
    );
  },
);

//
// DescriptionListItem
//

export interface DescriptionListItemProps {
  icon?: ReactNode;
  inset?: boolean;

  label?: ReactNode;
  labelTypographyProps?: Omit<
    TypographyProps,
    'noWrap' | 'variant' | 'component' | 'color'
  >;

  content?: ReactNode;
  contentTypographyProps?: Omit<OverflowTextProps, 'component' | 'color'>;

  fallback?: ReactNode;
}

export const DescriptionListItem = forwardRef<
  HTMLDivElement,
  DescriptionListItemProps
>(
  (
    {
      inset,
      icon = inset ? <SvgIcon /> : null,

      label,
      labelTypographyProps,

      content,
      contentTypographyProps = {},

      fallback,
    },
    ref,
  ) => {
    const styles = useStyles();
    const isEmptyLabel = isEmptyReactNode(label);
    const isEmptyContent = isEmptyReactNode(content);
    const isEmptyFallback = isEmptyReactNode(fallback);

    return (
      <div ref={ref} className={styles.item}>
        {!!icon && <div className={styles.icon}>{icon}</div>}

        <OverflowText
          {...contentTypographyProps}
          component="span"
          color={
            isEmptyLabel && isEmptyContent ? 'textSecondary' : 'textPrimary'
          }
          TooltipProps={{
            title: content != null ? content : undefined,
            ...contentTypographyProps.TooltipProps,
          }}
        >
          {!isEmptyLabel && (
            <Typography
              {...labelTypographyProps}
              variant="body2"
              component="span"
              color="textSecondary"
            >
              {label}
            </Typography>
          )}

          {!isEmptyLabel && ' '}

          {!isEmptyContent ? content : !isEmptyFallback ? fallback : null}
        </OverflowText>
      </div>
    );
  },
);
