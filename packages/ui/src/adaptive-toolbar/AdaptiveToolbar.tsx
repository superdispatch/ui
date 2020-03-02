import { Grid, Toolbar, ToolbarProps, Typography } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  Key,
  ReactNode,
  RefAttributes,
  useState,
} from 'react';

import { VisibilityObserver, VisibilityObserverRenderProps } from '..';
import { Button } from '../button/Button';

export interface AdaptiveToolbarItem {
  key: Key;
  label: ReactNode;
}

interface AdaptiveToolbarActionProps {
  item: AdaptiveToolbarItem;
  onVisiblityChange?: (
    visibility: VisibilityObserverRenderProps['visibility'],
  ) => void;
}

function AdaptiveToolbarAction({
  item,
  onVisiblityChange,
}: AdaptiveToolbarActionProps) {
  return (
    <VisibilityObserver
      threshold={1}
      onChange={onVisiblityChange}
      render={({ ref, visibility }) => (
        <Grid
          ref={ref}
          item={true}
          aria-hidden={visibility !== 'visible'}
          style={{
            opacity: visibility === 'visible' ? 1 : 0,
            transition: 'opacity 200ms',
          }}
        >
          <Button variant="outlined">
            <Typography noWrap={true} variant="inherit">
              {item.label}
            </Typography>
          </Button>
        </Grid>
      )}
    />
  );
}

export interface AdaptiveToolbarProps
  extends RefAttributes<unknown>,
    Omit<ToolbarProps, 'children'> {
  items: AdaptiveToolbarItem[];
}

export const AdaptiveToolbar: ForwardRefExoticComponent<AdaptiveToolbarProps> = forwardRef(
  ({ items, ...props }, ref) => {
    const [hiddenItems, setHiddenItems] = useState<Key[]>([]);

    return (
      <Toolbar {...props} ref={ref}>
        <Grid container={true} spacing={1} wrap="nowrap">
          <Grid item={true} style={{ overflow: 'hidden' }}>
            <Grid container={true} spacing={1} wrap="nowrap">
              {items.map(item => (
                <AdaptiveToolbarAction
                  item={item}
                  key={item.key}
                  onVisiblityChange={visibility => {
                    setHiddenItems(prev => {
                      if (visibility === 'visible' && prev.includes(item.key)) {
                        return prev.filter(key => key !== item.key);
                      }

                      if (
                        visibility === 'invisible' &&
                        !prev.includes(item.key)
                      ) {
                        return [...prev, item.key];
                      }

                      return prev;
                    });
                  }}
                />
              ))}
            </Grid>
          </Grid>

          {hiddenItems.length > 0 && (
            <Grid item={true} xs={true}>
              <Button>
                <MoreHoriz />
              </Button>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    );
  },
);
