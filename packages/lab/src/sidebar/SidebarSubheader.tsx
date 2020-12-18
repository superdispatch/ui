import { forwardRef, ReactNode } from 'react';
import styled from 'styled-components';

import { Column } from '../column/Column';
import { Columns } from '../column/Columns';
import { TextBox } from '../text-box/TextBox';

const SidebarSubheaderRoot = styled.div`
  height: 40px;
  max-height: 40px;
  padding-left: 24px;
  padding-right: 24px;
`;

export interface SidebarSubheaderProps {
  id?: string;
  action?: ReactNode;
  children?: ReactNode;
}

export const SidebarSubheader = forwardRef<
  HTMLDivElement,
  SidebarSubheaderProps
>(({ id, action, children }, ref) => {
  return (
    <SidebarSubheaderRoot ref={ref}>
      <Columns space="xsmall">
        <Column>
          <TextBox id={id} variant="heading-6" color="secondary" noWrap={true}>
            {children}
          </TextBox>
        </Column>
        {!!action && <Column width="content">{action}</Column>}
      </Columns>
    </SidebarSubheaderRoot>
  );
});
