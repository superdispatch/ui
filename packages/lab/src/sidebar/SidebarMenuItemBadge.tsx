import { Color } from '@superdispatch/ui';
import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import {
  SidebarMenuItemContext,
  useSidebarMenuItemContext,
} from './SidebarMenuItemContext';

const SidebarMenuItemBadgeRoot = styled.div<SidebarMenuItemContext>(
  ({ selected }) =>
    css`
      font-size: 12px;
      line-height: 16px;
      padding-left: 4px;
      padding-right: 4px;
      border-radius: 100px;

      color: ${selected ? Color.White : Color.Grey500};
      background-color: ${selected ? Color.Grey450 : Color.Silver300};
    `,
);

export interface SidebarMenuItemBadgeProps {
  count?: null | number;
}

export const SidebarMenuItemBadge = forwardRef<
  HTMLDivElement,
  SidebarMenuItemBadgeProps
>(({ count }, ref) => {
  const { selected } = useSidebarMenuItemContext();

  if (!count || !Number.isFinite(count)) {
    return null;
  }

  return (
    <SidebarMenuItemBadgeRoot ref={ref} selected={selected}>
      {count > 999 ? '999+' : count}
    </SidebarMenuItemBadgeRoot>
  );
});
