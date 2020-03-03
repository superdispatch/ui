import { ResizeObserver } from '@juggle/resize-observer';
import {
  Grid,
  Menu,
  MenuItem,
  Toolbar,
  ToolbarProps,
  Typography,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import React, {
  forwardRef,
  ForwardRefExoticComponent,
  Key,
  ReactNode,
  RefAttributes,
  useRef,
  useState,
} from 'react';
import { useEventCallback, useIsomorphicLayoutEffect } from 'utility-hooks';

import { Button } from '../button/Button';

function useResizeObserver<T extends HTMLElement>(
  node: null | undefined | T,
  callback: (node: T) => void,
): void {
  const cb = useEventCallback(callback);

  useIsomorphicLayoutEffect(() => {
    if (!node) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      cb(node);
    });

    resizeObserver.observe(node);

    cb(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, [cb, node]);
}

export interface AdaptiveToolbarItem {
  key: Key;
  label: ReactNode;
  onClick: () => void;
}

export interface AdaptiveToolbarProps
  extends RefAttributes<unknown>,
    Omit<ToolbarProps, 'children'> {
  items: AdaptiveToolbarItem[];
}

export const AdaptiveToolbar: ForwardRefExoticComponent<AdaptiveToolbarProps> = forwardRef(
  ({ items, ...props }, ref) => {
    const itemNodes = useRef<Array<null | HTMLElement>>([]);
    const optionsButtonRef = useRef<HTMLDivElement>(null);
    const [firstHiddenIdx, setFirstHiddenIdx] = useState(-1);

    const menuItems = firstHiddenIdx === -1 ? [] : items.slice(firstHiddenIdx);
    const [menuButtonNode, setMenuButtonRef] = useState<HTMLElement>();

    const [rootNode, setRootNode] = useState<null | HTMLDivElement>(null);

    useResizeObserver(rootNode, () => {
      const rootRect = (rootNode as HTMLElement).getBoundingClientRect();
      const rootWidth = rootRect.left + rootRect.width;

      const optionsButtonRect = optionsButtonRef.current?.getBoundingClientRect();
      const optionsButtonWidth = optionsButtonRect?.width || 0;
      const maxRightPosition = rootWidth - optionsButtonWidth;

      const mountedNodes = itemNodes.current.filter(
        (x): x is HTMLDivElement => x != null,
      );
      const hiddenIdx = mountedNodes.findIndex((itemNode, idx) => {
        if (!itemNode) {
          return false;
        }

        itemNode.removeAttribute('hidden');

        const itemRect = itemNode.getBoundingClientRect();
        const itemRightPosition = itemRect.left + itemRect.width;

        return idx === mountedNodes.length - 1
          ? itemRightPosition > rootWidth
          : itemRightPosition > maxRightPosition;
      });

      if (hiddenIdx !== -1) {
        mountedNodes.slice(hiddenIdx).forEach(itemNode => {
          if (itemNode) {
            itemNode.setAttribute('hidden', 'true');
          }
        });
      }

      setFirstHiddenIdx(hiddenIdx);
    });

    return (
      <Toolbar {...props} ref={ref}>
        <Grid container={true} spacing={1} wrap="nowrap" ref={setRootNode}>
          <Grid item={true} style={{ overflow: 'hidden' }}>
            <Grid container={true} spacing={1} wrap="nowrap" component="div">
              {items.map((item, idx) => (
                <Grid
                  key={item.key}
                  item={true}
                  ref={node => {
                    itemNodes.current[idx] = node;
                  }}
                >
                  <Button type="button" onClick={item.onClick}>
                    <Typography noWrap={true} variant="inherit">
                      {item.label}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {menuItems.length > 0 && (
            <Grid item={true} ref={optionsButtonRef} component="div">
              <Button
                type="button"
                onClick={({ currentTarget }) => {
                  setMenuButtonRef(currentTarget);
                }}
              >
                <MoreHoriz />
              </Button>

              <Menu
                open={!!menuButtonNode}
                anchorEl={menuButtonNode}
                onClose={() => {
                  setMenuButtonRef(undefined);
                }}
              >
                {menuItems.map(item => (
                  <MenuItem
                    key={item.key}
                    onClick={() => {
                      item.onClick();
                      setMenuButtonRef(undefined);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    );
  },
);
