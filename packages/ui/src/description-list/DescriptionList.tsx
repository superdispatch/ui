import { SvgIcon, Typography, TypographyProps } from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { forwardRef, ReactNode } from 'react';

import { OverflowText, OverflowTextProps } from '../overflow-text/OverflowText';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/SuperDispatchTheme';
import { isEmptyReactNode } from '../utils/isEmptyReactNode';
import { useUID } from '../utils/useUID';

function sizeVariant(
  theme: SuperDispatchTheme,
  mobileSpacing: number,
  desktopSpacing: number,
): CSSProperties {
  return {
    '& > $list, & > $item': {
      '&:not(:last-child)': {
        paddingBottom: theme.spacing(mobileSpacing),

        [theme.breakpoints.up('sm')]: {
          paddingBottom: theme.spacing(desktopSpacing),
        },
      },
    },
  };
}

const useStyles = makeStyles(
  (theme: SuperDispatchTheme) => ({
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
      contentTypographyProps,

      fallback,
    },
    ref,
  ) => {
    const styles = useStyles();
    const labelID = useUID(labelTypographyProps?.id);

    const shouldRenderFallback = isEmptyReactNode(content);

    return (
      <div
        ref={ref}
        className={styles.item}
        aria-labelledby={label != null ? labelID : undefined}
      >
        {!!icon && <div className={styles.icon}>{icon}</div>}

        <OverflowText
          {...contentTypographyProps}
          component="span"
          color={
            shouldRenderFallback && label == null
              ? 'textSecondary'
              : 'textPrimary'
          }
          TooltipProps={{
            ...contentTypographyProps?.TooltipProps,
            title:
              contentTypographyProps?.TooltipProps?.title ??
              content ??
              undefined,
          }}
        >
          {label != null && (
            <Typography
              {...labelTypographyProps}
              id={labelID}
              variant="body2"
              component="span"
              color="textSecondary"
            >
              {label}
            </Typography>
          )}

          {label != null && ' '}
          {!shouldRenderFallback ? content : fallback}
        </OverflowText>
      </div>
    );
  },
);
