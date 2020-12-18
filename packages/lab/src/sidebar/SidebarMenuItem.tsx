import { ButtonBase, ButtonBaseProps } from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';
import { Color } from '@superdispatch/ui';
import {
  AnchorHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
} from 'react';
import styled, { css } from 'styled-components';

import { Inline } from '../inline/Inline';
import { TextBox } from '../text-box/TextBox';

interface SidebarMenuItemRootProps extends ButtonBaseProps<'a'> {
  selected?: boolean;
}

const SidebarMenuItemRoot: ForwardRefExoticComponent<SidebarMenuItemRootProps> = styled(
  ButtonBase,
)<SidebarMenuItemRootProps>(
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
  href?: string;
  selected?: boolean;
  children?: ReactNode;
}

export const SidebarMenuItem = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  SidebarMenuItemProps
>(({ href, selected, children }, ref) => {
  const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = !href
    ? {}
    : { href, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <SidebarMenuItemRoot
      {...linkProps}
      href={href}
      selected={selected}
      ref={ref as Ref<HTMLAnchorElement>}
    >
      <Inline verticalAlign="center" noWrap={true}>
        <TextBox variant={selected ? 'body-semibold' : 'body'} noWrap={true}>
          {children}
        </TextBox>

        {!!href && <OpenInNew color="action" fontSize="small" />}
      </Inline>
    </SidebarMenuItemRoot>
  );
});
