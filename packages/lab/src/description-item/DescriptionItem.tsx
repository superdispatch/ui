import { Color, isEmptyReactNode, useUID } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled, { css } from 'styled-components';

import { Column } from '../column/Column';
import { Columns } from '../column/Columns';
import { Inline } from '../inline/Inline';
import { TextBox } from '../text-box/TextBox';

const IconContainer = styled.div(
  ({ theme }) =>
    css`
      --description-icon-size: 20px;

      ${theme.breakpoints.up('sm')} {
        --description-icon-size: 16px;
      }

      display: flex;
      align-items: center;

      width: var(--description-icon-size);
      height: calc(var(--description-icon-size) + 4px);

      & > .MuiSvgIcon-root {
        color: ${Color.Grey100};
        font-size: var(--description-icon-size);
      }
    `,
);

export interface DescriptionItemProps {
  id?: string;
  'aria-label'?: string;

  wrap?: boolean;
  inset?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  fallback?: ReactNode;
  children?: ReactNode;
}

export const DescriptionItem = forwardRef<HTMLDivElement, DescriptionItemProps>(
  (
    {
      icon,
      wrap,
      inset,
      label,
      children,
      fallback,
      id: idProp,
      'aria-label': ariaLabel,
    },
    ref,
  ) => {
    const id = useUID(idProp);
    const labelID = `${id}-label`;
    const isEmptyChildren = isEmptyReactNode(children);

    return (
      <Columns
        id={id}
        ref={ref}
        space={['xsmall', 'xxsmall']}
        aria-label={ariaLabel}
        aria-labelledby={label == null ? undefined : labelID}
      >
        {!!(icon || inset) && (
          <Column width="content">
            <IconContainer>{icon}</IconContainer>
          </Column>
        )}

        <Column width="adaptive">
          <Inline space="xxsmall" noWrap={!wrap}>
            {!!label && (
              <TextBox id={labelID} color="secondary">
                {label}
              </TextBox>
            )}

            {!isEmptyChildren ? (
              <TextBox as="div" noWrap={!wrap} wrapOverflow={!!wrap}>
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
          </Inline>
        </Column>
      </Columns>
    );
  },
);
