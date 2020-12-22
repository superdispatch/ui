import { Color, useUID } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled from 'styled-components';

import { TextBox } from '../text-box/TextBox';

const SidebarRoot = styled.aside`
  top: 0;
  position: sticky;
  overflow-y: auto;
  overflow-x: hidden;

  width: 240px;
  height: 100vh;
  background-color: ${Color.White};
  border-right: 1px solid ${Color.Silver400};
`;

const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  max-height: 64px;
  padding-left: 24px;
  padding-right: 24px;
`;

const SidebarContent = styled.div`
  padding-top: 8px;
`;

export interface SidebarProps {
  id?: string;
  title?: ReactNode;
  children?: ReactNode;
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ title, children, id: idProp }, ref) => {
    const id = useUID(idProp);
    const titleID = `${id}-title`;

    return (
      <SidebarRoot id={id} ref={ref}>
        <SidebarTitle>
          <TextBox variant="heading-2" noWrap={true} id={titleID}>
            {title}
          </TextBox>
        </SidebarTitle>

        <SidebarContent aria-labelledby={titleID}>{children}</SidebarContent>
      </SidebarRoot>
    );
  },
);
