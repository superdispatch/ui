import { IconButton, Tooltip, TooltipProps } from '@material-ui/core';
import { forwardRef, ReactElement } from 'react';
import styled from 'styled-components';

const SidebarMenuItemActionRoot = styled(IconButton)`
  & .MuiSvgIcon-root {
    font-size: 16px;
  }
`;

export interface SidebarMenuItemActionProps
  extends Pick<TooltipProps, 'title' | 'placement'> {
  children: ReactElement;
}

export const SidebarMenuItemAction = forwardRef<
  HTMLButtonElement,
  SidebarMenuItemActionProps
>(({ title, placement, children }, ref) => {
  return (
    <Tooltip title={title} placement={placement}>
      <SidebarMenuItemActionRoot ref={ref} size="small" edge="end">
        {children}
      </SidebarMenuItemActionRoot>
    </Tooltip>
  );
});
