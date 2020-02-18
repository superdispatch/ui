import { Typography, TypographyProps } from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
} from 'react';

import { OverflowText } from '../overflow-text/OverflowText';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

function sizeVariant(
  theme: SuperDispatchTheme,
  mobileSpacing: number,
  desktopSpacing: number,
): CSSProperties {
  return {
    margin: theme.spacing(-mobileSpacing / 2, 0),

    '& > $item': {
      padding: theme.spacing(mobileSpacing / 2, 0),
    },

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(-desktopSpacing / 2, 0),

      '& > $item': {
        padding: theme.spacing(desktopSpacing / 2, 0),
      },
    },
  };
}

const useStyles = makeStyles<
  SuperDispatchTheme,
  'list' | 'listSmall' | 'listLarge' | 'item' | 'icon'
>(
  theme => ({
    list: sizeVariant(theme, 2, 1),
    listSmall: sizeVariant(theme, 1, 0.5),
    listLarge: sizeVariant(theme, 3, 2),

    item: { display: 'flex', alignItems: 'center' },

    icon: {
      display: 'inline-flex',
      marginRight: theme.spacing(1),

      '& > .MuiSvgIcon-root': {
        color: Color.Grey200,
        fontSize: theme.spacing(3),

        [theme.breakpoints.up('sm')]: {
          fontSize: theme.spacing(2),
        },
      },
    },
  }),
  { name: 'SuperDispatchDescriptionList' },
);

export interface DescriptionListProps
  extends RefAttributes<HTMLDivElement>,
    HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
}

export const DescriptionList: ForwardRefExoticComponent<DescriptionListProps> = forwardRef(
  ({ size, className, ...props }, ref) => {
    const styles = useStyles();

    return (
      <div
        {...props}
        ref={ref}
        data-size={size}
        className={clsx(styles.list, className, {
          [styles.listSmall]: size === 'small',
          [styles.listLarge]: size === 'large',
        })}
      />
    );
  },
);

export interface DescriptionListItemProps
  extends RefAttributes<HTMLDivElement>,
    Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  icon?: ReactNode;
  label?: ReactNode;
  labelTypographyProps?: Omit<
    TypographyProps,
    'noWrap' | 'variant' | 'component' | 'color'
  >;
  content?: ReactNode;
  contentTypographyProps?: Omit<
    TypographyProps,
    'noWrap' | 'variant' | 'component' | 'color'
  >;
}

export const DescriptionListItem: ForwardRefExoticComponent<DescriptionListItemProps> = forwardRef(
  (
    {
      icon,
      label,
      content,
      className,
      labelTypographyProps,
      contentTypographyProps,
      ...props
    },
    rootRef,
  ) => {
    const styles = useStyles();

    return (
      <div {...props} ref={rootRef} className={clsx(styles.item, className)}>
        {!!icon && <div className={styles.icon}>{icon}</div>}

        {(!!label || !!content) && (
          <OverflowText
            {...contentTypographyProps}
            variant="body2"
            TooltipProps={{ title: content }}
          >
            {!!label && (
              <Typography
                {...labelTypographyProps}
                variant="body2"
                component="span"
                color="textSecondary"
              >
                {label}
              </Typography>
            )}

            {!!label && !!content && ' '}

            {content}
          </OverflowText>
        )}
      </div>
    );
  },
);
