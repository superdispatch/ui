import { forwardRef, ReactChild, ReactNode } from 'react';
import styled from 'styled-components';

const SidebarContainerRoot = styled.div`
  display: flex;
  height: inherit;
  max-height: inherit;
  min-height: inherit;
`;

const SidebarContainerContent = styled.div`
  height: inherit;
  max-height: inherit;
  min-height: inherit;

  width: calc(100% - 240px);
  min-width: calc(100% - 240px);
  max-width: calc(100% - 240px);
`;

export interface SidebarContainerProps {
  sidebar: ReactChild;
  children?: ReactNode;
}

export const SidebarContainer = forwardRef<
  HTMLDivElement,
  SidebarContainerProps
>(({ sidebar, children }, ref) => (
  <SidebarContainerRoot ref={ref}>
    {sidebar}

    <SidebarContainerContent>{children}</SidebarContainerContent>
  </SidebarContainerRoot>
));
