import { ButtonBase } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { Color } from '@superdispatch/ui';
import { forwardRef, ReactNode, useLayoutEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import { Column } from '../column/Column';
import { Columns } from '../column/Columns';
import { TextBox } from '../text-box/TextBox';

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

  badge?: null | number;
  action?: ReactNode;
  avatar?: ReactNode;
  children?: ReactNode;
}

export const SidebarMenuItem = forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  (
    {
      action,
      avatar,
      external,
      children,
      disabled,
      selected,
      badge: badgeProp,
    },
    ref,
  ) => {
    const badge =
      !badgeProp || !Number.isFinite(badgeProp)
        ? null
        : badgeProp > 999
        ? '999+'
        : badgeProp;

    const actionsRef = useRef<HTMLDivElement>(null);
    const actionsPlaceholderRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      if (actionsRef.current && actionsPlaceholderRef.current) {
        actionsPlaceholderRef.current.style.width = `${actionsRef.current.offsetWidth}px`;
      }
    });

    return (
      <SidebarMenuItemRoot ref={ref} hasAvatar={!!avatar}>
        <ButtonBase aria-current={selected} disabled={disabled}>
          <Columns align="center" space="xsmall">
            <Column>
              <Columns align="center" space="xsmall">
                <Column width="fluid">
                  <Columns align="center" space="xsmall">
                    {!!avatar && <Column width="content">{avatar}</Column>}

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

            {!!action && (
              <Column width="content">
                <div ref={actionsPlaceholderRef} />
              </Column>
            )}
          </Columns>
        </ButtonBase>

        {!!action && (
          <SidebarMenuItemSecondaryAction ref={actionsRef}>
            {action}
          </SidebarMenuItemSecondaryAction>
        )}
      </SidebarMenuItemRoot>
    );
  },
);
