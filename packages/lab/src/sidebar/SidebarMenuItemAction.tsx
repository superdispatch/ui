import { IconButton, Tooltip, TooltipProps } from '@material-ui/core';
import { Color } from '@superdispatch/ui';
import { forwardRef, ReactElement } from 'react';
import styled from 'styled-components';

const SidebarMenuItemActionRoot = styled(IconButton)`
  & .MuiSvgIcon-root {
    font-size: 16px;
    color: ${Color.Grey100};
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
