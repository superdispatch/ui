import { ButtonBase } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { Color } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled from 'styled-components';

import { Inline } from '../inline/Inline';
import { TextBox } from '../text-box/TextBox';

const SidebarMenuItemRoot = styled(ButtonBase)`
  width: 100%;
  display: flex;
  justify-content: flex-start;

  height: 40px;
  max-height: 40px;
  padding-left: 24px;
  padding-right: 24px;

  &[aria-current='true'] {
    background-color: ${Color.Silver200};
    box-shadow: inset 4px 0 0 ${Color.Blue300};
  }
`;

export interface SidebarMenuButtonProps {
  selected?: boolean;
  external?: boolean;
  children?: ReactNode;
}

export const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ selected, external, children }, ref) => {
  return (
    <SidebarMenuItemRoot ref={ref} aria-current={selected}>
      <Inline verticalAlign="center" noWrap={true}>
        <TextBox variant={selected ? 'body-semibold' : 'body'} noWrap={true}>
          {children}
        </TextBox>

        {external && <OpenInNew color="action" fontSize="small" />}
      </Inline>
    </SidebarMenuItemRoot>
  );
});
