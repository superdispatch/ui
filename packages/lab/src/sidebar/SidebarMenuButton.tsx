import { ButtonBase } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { Color } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { Column } from '../column/Column';
import { Columns } from '../column/Columns';
import { TextBox } from '../text-box/TextBox';

interface SidebarMenuItemRootProps {
  hasAvatar: boolean;
}

const SidebarMenuItemRoot = styled(ButtonBase)<SidebarMenuItemRootProps>(
  ({ hasAvatar }) => {
    const height = hasAvatar ? 48 : 40;

    return css`
      && {
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

export interface SidebarMenuButtonProps {
  selected?: boolean;
  external?: boolean;

  avatar?: ReactNode;
  children?: ReactNode;
}

export const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ selected, external, avatar, children }, ref) => {
  return (
    <SidebarMenuItemRoot ref={ref} aria-current={selected} hasAvatar={!!avatar}>
      <Columns align="center" space="xsmall">
        {!!avatar && <Column width="content">{avatar}</Column>}

        <Column width="adaptive">
          <TextBox variant={selected ? 'body-semibold' : 'body'} noWrap={true}>
            {children}
          </TextBox>
        </Column>

        {external && (
          <Column width="content">
            <OpenInNew color="action" fontSize="small" />
          </Column>
        )}
      </Columns>
    </SidebarMenuItemRoot>
  );
});
