import { forwardRef, ReactNode } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';

import {
  ResponsiveProp,
  ResponsivePropTuple,
  useResponsiveProp,
} from '../props/ResponsiveProp';

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

interface ColumnRootProps {
  columnWidth: ResponsivePropTuple<ColumnWidth>;
}

const ColumnRoot = styled.div<ColumnRootProps>(
  ({ theme, columnWidth }) =>
    css`
      min-width: 0;

      ${columnRootMixin(columnWidth[0])};

      ${theme.breakpoints.up('sm')} {
        ${columnRootMixin(columnWidth[1])};
      }

      ${theme.breakpoints.up('md')} {
        ${columnRootMixin(columnWidth[2])};
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
  'aria-label'?: string;
  'aria-labelledby'?: string;

  width?: ResponsiveProp<ColumnWidth>;
}

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (
    {
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      width = 'fluid',
    }: ColumnProps,
    ref,
  ) => {
    const columnWidth = useResponsiveProp(width);

    return (
      <ColumnRoot
        ref={ref}
        columnWidth={columnWidth}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        <div>{children}</div>
      </ColumnRoot>
    );
  },
);
