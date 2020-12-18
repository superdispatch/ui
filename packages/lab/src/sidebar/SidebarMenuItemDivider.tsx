import { Divider } from '@material-ui/core';
import { forwardRef } from 'react';
import styled from 'styled-components';

const SidebarMenuItemDividerRoot = styled.div`
  padding: 20px 24px;
`;

export const SidebarMenuItemDivider = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <SidebarMenuItemDividerRoot ref={ref}>
      <Divider />
    </SidebarMenuItemDividerRoot>
  );
});
