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
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Button } from '../button/Button';

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
    const rootRef = useRef<HTMLDivElement>(null);
    const optionsButtonRef = useRef<HTMLDivElement>(null);
    const [firstHiddenIdx, setFirstHiddenIdx] = useState(-1);

    const menuItems = firstHiddenIdx === -1 ? [] : items.slice(firstHiddenIdx);
    const [menuButtonNode, setMenuButtonRef] = useState<HTMLElement>();

    useLayoutEffect(() => {
      const { current: node } = rootRef;

      if (!node) {
        return;
      }

      const calculate = () => {
        const rootRect = node.getBoundingClientRect();
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
          itemNodes.current.slice(hiddenIdx).forEach(itemNode => {
            if (itemNode) {
              itemNode.setAttribute('hidden', 'true');
            }
          });
        }

        setFirstHiddenIdx(hiddenIdx);
      };

      const resizeObserver = new ResizeObserver(calculate);

      calculate();
      resizeObserver.observe(node);

      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    return (
      <Toolbar {...props} ref={ref}>
        <Grid container={true} spacing={1} wrap="nowrap" ref={rootRef}>
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
