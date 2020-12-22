import { ButtonBase } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { Color } from '@superdispatch/ui';
import {
  forwardRef,
  MouseEvent,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled, { css } from 'styled-components';

import { Column } from '../columns/Column';
import { Columns } from '../columns/Columns';
import { Inline } from '../inline/Inline';
import { TextBox } from '../text-box/TextBox';
import { SidebarMenuItemContextProvider } from './SidebarMenuItemContext';

interface SidebarMenuItemRootProps {
  hasAvatar: boolean;
}

const SidebarMenuItemRoot = styled.div<SidebarMenuItemRootProps>(
  ({ hasAvatar }) => {
    const height = hasAvatar ? 48 : 40;

    return css`
      position: relative;

      & > .MuiButtonBase-root {
        width: 100%;
        display: flex;
        justify-content: flex-start;

        padding-left: 24px;
        padding-right: 24px;
        height: ${height}px;
        max-height: ${height}px;

        &[aria-current='true'] {
          background-color: ${Color.Silver200};
          box-shadow: inset 4px 0 0 ${Color.Blue300};
        }
      }
    `;
  },
);

const SidebarMenuItemBadge = styled.div`
  font-size: 12px;
  line-height: 16px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 100px;

  color: ${Color.Grey500};
  background-color: ${Color.Silver300};

  .MuiButtonBase-root[aria-current='true'] & {
    color: ${Color.White};
    background-color: ${Color.Grey450};
  }
`;

const SidebarMenuItemSecondaryAction = styled.div`
  top: 50%;
  right: 24px;
  position: absolute;
  transform: translate3d(0, -50%, 0);
`;

export interface SidebarMenuItemProps {
  selected?: boolean;
  external?: boolean;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

  badge?: null | number;
  action?: ReactNode;
  avatar?: ReactNode;
  children?: ReactNode;
  secondaryActions?: ReactNode;
}

export const SidebarMenuItem = forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  (
    {
      action,
      avatar,
      onClick,
      external,
      children,
      disabled,
      selected,
      secondaryActions,
      badge: badgeProp,
    },
    ref,
  ) => {
    const [hovered, setHovered] = useState(false);
    const actionsRef = useRef<HTMLDivElement>(null);
    const actionsPlaceholderRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (actionsRef.current && actionsPlaceholderRef.current) {
        actionsPlaceholderRef.current.style.width = `${Math.max(
          0,
          actionsRef.current.offsetWidth - 8,
        )}px`;
      }
    });

    const badge =
      !badgeProp || !Number.isFinite(badgeProp)
        ? null
        : badgeProp > 999
        ? '999+'
        : badgeProp;

    return (
      <SidebarMenuItemRoot
        ref={ref}
        hasAvatar={!!avatar}
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
      >
        <ButtonBase
          onClick={onClick}
          disabled={disabled}
          aria-current={selected}
        >
          <Columns align="center" space="xsmall">
            <Column>
              <Columns align="center" space="xsmall">
                <Column width="fluid">
                  <Columns align="center" space="xsmall">
                    {!!avatar && (
                      <SidebarMenuItemContextProvider
                        hovered={hovered}
                        disabled={disabled}
                      >
                        <Column width="content">{avatar}</Column>
                      </SidebarMenuItemContextProvider>
                    )}

                    <Column width="adaptive">
                      <TextBox
                        variant={selected ? 'body-semibold' : 'body'}
                        noWrap={true}
                      >
                        {children}
                      </TextBox>
                    </Column>

                    {external && (
                      <Column width="content">
                        <OpenInNew color="action" fontSize="small" />
                      </Column>
                    )}
                  </Columns>
                </Column>
              </Columns>
            </Column>

            {!!badge && (
              <Column width="content">
                <SidebarMenuItemBadge>{badge}</SidebarMenuItemBadge>
              </Column>
            )}

            {(!!action || !!secondaryActions) && (
              <Column width="content">
                <div ref={actionsPlaceholderRef} />
              </Column>
            )}
          </Columns>
        </ButtonBase>

        {(!!action || !!secondaryActions) && (
          <SidebarMenuItemSecondaryAction ref={actionsRef}>
            <Inline>
              {hovered && secondaryActions}
              {action}
            </Inline>
          </SidebarMenuItemSecondaryAction>
        )}
      </SidebarMenuItemRoot>
    );
  },
);
