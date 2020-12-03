import { Color, isEmptyReactNode, useUID } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';

import { Column } from '../column/Column';
import { Columns } from '../column/Columns';
import { Inline } from '../inline/Inline';
import { TextBox } from '../text-box/TextBox';

function descriptionItemIconMixin(
  size: 16 | 20,
): readonly SimpleInterpolation[] {
  return css`
    width: ${size}px;
    height: ${size + 4}px;

    & > .MuiSvgIcon-root {
      font-size: ${size}px;
    }
  `;
}

const DescriptionItemIcon = styled.div(
  ({ theme }) =>
    css`
      display: flex;
      align-items: center;

      & > .MuiSvgIcon-root {
        color: ${Color.Grey100};
      }

      ${descriptionItemIconMixin(20)};

      ${theme.breakpoints.up('sm')} {
        ${descriptionItemIconMixin(16)};
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
            <DescriptionItemIcon>{icon}</DescriptionItemIcon>
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
