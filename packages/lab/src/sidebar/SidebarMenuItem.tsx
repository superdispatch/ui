import { ButtonBase } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { Color } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { Column } from '../column/Column';
import { Columns } from '../column/Columns';
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

  action?: ReactNode;
  avatar?: ReactNode;
  children?: ReactNode;
}

export const SidebarMenuItem = forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ selected, external, disabled, avatar, children, action }, ref) => {
    return (
      <SidebarMenuItemContextProvider selected={selected} disabled={disabled}>
        <SidebarMenuItemRoot ref={ref} hasAvatar={!!avatar}>
          <ButtonBase aria-current={selected}>
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
          </ButtonBase>

          {!!action && (
            <SidebarMenuItemSecondaryAction>
              {action}
            </SidebarMenuItemSecondaryAction>
          )}
        </SidebarMenuItemRoot>
      </SidebarMenuItemContextProvider>
    );
  },
);
