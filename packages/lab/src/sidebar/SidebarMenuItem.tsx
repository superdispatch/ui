import { ButtonBase } from '@material-ui/core';
import { Color } from '@superdispatch/ui';
import { forwardRef, ReactNode, Ref } from 'react';
import styled, { css } from 'styled-components';

import { TextBox } from '../text-box/TextBox';

interface SidebarMenuItemRootProps {
  selected?: boolean;
}

const SidebarMenuItemRoot = styled(ButtonBase)<SidebarMenuItemRootProps>(
  ({ selected }) => css`
    width: 100%;
    display: flex;
    justify-content: flex-start;

    height: 40px;
    max-height: 40px;
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${selected ? Color.Silver200 : Color.Transparent};
    box-shadow: inset 4px 0 0 ${selected ? Color.Blue300 : Color.Transparent};
  `,
);

export interface SidebarMenuItemProps {
  selected?: boolean;
  children?: ReactNode;
}

export const SidebarMenuItem = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  SidebarMenuItemProps
>(({ selected, children }, ref) => {
  return (
    <SidebarMenuItemRoot
      ref={ref as Ref<HTMLButtonElement>}
      selected={selected}
    >
      <TextBox variant={selected ? 'body-semibold' : 'body'}>
        {children}
      </TextBox>
    </SidebarMenuItemRoot>
  );
});
