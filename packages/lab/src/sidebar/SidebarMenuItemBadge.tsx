import { Color } from '@superdispatch/ui';
import { forwardRef } from 'react';
import styled from 'styled-components';

const SidebarMenuItemBadgeRoot = styled.div`
  font-size: 12px;
  line-height: 16px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 100px;

  color: ${Color.Grey500};
  background-color: ${Color.Silver300};

  [aria-current='true'] & {
    color: ${Color.White};
    background-color: ${Color.Grey450};
  }
`;

export interface SidebarMenuItemBadgeProps {
  count?: null | number;
}

export const SidebarMenuItemBadge = forwardRef<
  HTMLDivElement,
  SidebarMenuItemBadgeProps
>(({ count }, ref) => {
  if (!count || !Number.isFinite(count)) {
    return null;
  }

  return (
    <SidebarMenuItemBadgeRoot ref={ref}>
      {count > 999 ? '999+' : count}
    </SidebarMenuItemBadgeRoot>
  );
});
