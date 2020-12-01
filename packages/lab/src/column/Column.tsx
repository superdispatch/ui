import { forwardRef, ReactNode } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';

import {
  ResponsiveProp,
  ResponsivePropTuple,
  useResponsivePropTuple,
} from '../utils/ResponsiveProp';

export type ColumnWidth =
  | 'adaptive'
  | 'content'
  | 'fluid'
  | '1/2'
  | '1/3'
  | '2/3'
  | '1/4'
  | '3/4'
  | '1/5'
  | '2/5'
  | '3/5'
  | '4/5';

interface ColumnRootProps {
  width: ResponsivePropTuple<ColumnWidth>;
}

function computeFlexBasis(scale: number): string {
  return `${scale * 100}%`;
}

function flexBasisMixin(width: ColumnWidth): string {
  switch (width) {
    case '1/2':
      return computeFlexBasis(1 / 2);
    case '1/3':
      return computeFlexBasis(1 / 3);
    case '2/3':
      return computeFlexBasis(2 / 3);
    case '1/4':
      return computeFlexBasis(1 / 4);
    case '3/4':
      return computeFlexBasis(3 / 4);
    case '1/5':
      return computeFlexBasis(1 / 5);
    case '2/5':
      return computeFlexBasis(2 / 5);
    case '3/5':
      return computeFlexBasis(3 / 5);
    case '4/5':
      return computeFlexBasis(4 / 5);
  }

  return 'auto';
}

function columnRootMixin(width: ColumnWidth): readonly SimpleInterpolation[] {
  return css`
    flex-grow: 0;
    flex-basis: ${flexBasisMixin(width)};
    width: ${width === 'fluid' ? '100%' : 'auto'};
    flex-shrink: ${width === 'fluid' || width === 'adaptive' ? 1 : 0};
  `;
}

const ColumnRoot = styled.div.withConfig<ColumnRootProps>({
  displayName: 'ColumnRoot',
  shouldForwardProp: (prop, defaultValidatorFn) =>
    defaultValidatorFn(prop) && prop !== 'width',
})<ColumnRootProps>(
  ({ theme, width }) =>
    css`
      min-width: 0;

      ${columnRootMixin(width[0])};

      ${theme.breakpoints.up('sm')} {
        ${columnRootMixin(width[1])};
      }

      ${theme.breakpoints.up('md')} {
        ${columnRootMixin(width[2])};
      }

      & > div {
        padding-top: var(--column-space-top);
        padding-left: var(--column-space-left);
        padding-bottom: var(--column-space-bottom);
      }

      &:last-child > div {
        padding-top: 0;
        padding-bottom: 0;
      }
    `,
);

export interface ColumnProps {
  children?: ReactNode;
  width?: ResponsiveProp<ColumnWidth>;
}

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, width: widthProp = 'fluid' }: ColumnProps, ref) => {
    const width = useResponsivePropTuple(widthProp);

    return (
      <ColumnRoot ref={ref} width={width}>
        <div>{children}</div>
      </ColumnRoot>
    );
  },
);
