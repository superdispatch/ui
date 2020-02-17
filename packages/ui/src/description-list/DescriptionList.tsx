import { Tooltip, Typography, TypographyProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
  useState,
} from 'react';

import { VisibilityObserver } from '..';
import { Color } from '../theme/Color';
import { SuperDispatchTheme } from '../theme/ThemeProvider';

const useStyles = makeStyles<
  SuperDispatchTheme,
  | 'list'
  | 'item'
  | 'icon'
  | 'content'
  | 'contentClickable'
  | 'textOverflowAnchor'
>(
  theme => ({
    list: {
      '&[data-size="small"]': {},
      '&[data-size="medium"]': {},
      '&[data-size="large"]': {},
    },

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

    content: {
      marginBottom: -1,
      borderBottom: '1px dashed transparent',
      transition: theme.transitions.create('border'),

      '&$contentClickable': {
        cursor: 'pointer',
        borderBottomColor: Color.Silver500,
      },
    },

    contentClickable: {},

    textOverflowAnchor: {
      width: '1px',
      height: '100%',
      display: 'inline-block',
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
  ({ className, size = 'medium', ...props }, ref) => {
    const styles = useStyles();

    return (
      <div
        {...props}
        ref={ref}
        data-size={size}
        className={clsx(styles.list, className)}
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
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    return (
      <div {...props} ref={rootRef} className={clsx(styles.item, className)}>
        {!!icon && <div className={styles.icon}>{icon}</div>}

        {(!!label || !!content) && (
          <VisibilityObserver
            render={({ ref, visibility }) => {
              const isTooltipEnabled = !!content || visibility === 'invisible';

              return (
                <Tooltip
                  title={content || ''}
                  disableFocusListener={true}
                  open={isTooltipOpen && isTooltipEnabled}
                  onClose={() => setIsTooltipOpen(false)}
                >
                  <Typography
                    noWrap={true}
                    variant="body2"
                    component="span"
                    onClick={() => {
                      setIsTooltipOpen(true);
                    }}
                    className={clsx(styles.content, {
                      [styles.contentClickable]: visibility === 'invisible',
                    })}
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

                    {!!label && !!content && <>&nbsp;</>}

                    {content}

                    {!!content && (
                      <span ref={ref} className={styles.textOverflowAnchor} />
                    )}
                  </Typography>
                </Tooltip>
              );
            }}
          />
        )}
      </div>
    );
  },
);
