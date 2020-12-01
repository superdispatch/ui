import { Color, isEmptyReactNode, useUID } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { Column } from '../column/Column';
import { Columns } from '../column/Columns';
import { TextBox } from '../text-box/TextBox';

const IconContainer = styled.div(
  ({ theme }) =>
    css`
      --description-icon-size: 24px;

      ${theme.breakpoints.up('sm')} {
        --description-icon-size: 16px;
      }

      width: var(--description-icon-size);
      & > .MuiSvgIcon-root {
        color: ${Color.Grey100};
        font-size: var(--description-icon-size);
      }
    `,
);

export interface DescriptionItemProps {
  id?: string;
  wrap?: boolean;
  inset?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  fallback?: ReactNode;
  children?: ReactNode;
}

export const DescriptionItem = forwardRef<HTMLDivElement, DescriptionItemProps>(
  ({ icon, wrap, inset, label, children, fallback, id: idProp }, ref) => {
    const id = useUID(idProp);
    const labelID = `${id}-label`;
    const isEmptyChildren = isEmptyReactNode(children);

    return (
      <Columns
        id={id}
        ref={ref}
        space="xxsmall"
        align="center"
        aria-labelledby={label == null ? undefined : labelID}
      >
        {!!(icon || inset) && (
          <Column width="content">
            <IconContainer>{icon}</IconContainer>
          </Column>
        )}

        {!!label && (
          <Column width="content">
            <TextBox id={labelID} color="secondary">
              {label}
            </TextBox>
          </Column>
        )}

        <Column width="adaptive">
          {!isEmptyChildren ? (
            <TextBox as="div" noWrap={!wrap}>
              {children}
            </TextBox>
          ) : (
            <TextBox
              as="div"
              noWrap={true}
              color={label == null ? 'primary' : 'secondary'}
            >
              {fallback}
            </TextBox>
          )}
        </Column>
      </Columns>
    );
  },
);
