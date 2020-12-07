import {
  parseAlignProp,
  parseResponsiveProp,
  parseSpaceProp,
  ResponsiveProp,
  SpaceProp,
  VerticalAlign,
} from '@superdispatch/ui';
import { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';

import { CollapseProp, isCollapsedBelow } from '../utils/CollapseProp';

function columnsRootMixin(
  align: VerticalAlign,
  spaceProp: SpaceProp,
  isReversed: boolean,
  isCollapsed: boolean,
): readonly SimpleInterpolation[] {
  const space = parseSpaceProp(spaceProp);

  return css`
    --column-space-left: ${isCollapsed ? 0 : space}px;
    --column-space-top: ${isCollapsed && isReversed ? space : 0}px;
    --column-space-bottom: ${isCollapsed && !isReversed ? space : 0}px;

    align-items: ${parseAlignProp(align)};
    margin-left: ${isCollapsed ? 0 : `-${space}`}px;
    width: ${isCollapsed ? '100%' : `calc(100% + ${space}px)`};
    flex-direction: ${isCollapsed
      ? !isReversed
        ? 'column'
        : 'column-reverse'
      : !isReversed
      ? 'row'
      : 'row-reverse'};
  `;
}

export interface ColumnsProps {
  id?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;

  reverse?: ResponsiveProp<boolean>;
  space?: ResponsiveProp<SpaceProp>;
  align?: ResponsiveProp<VerticalAlign>;
  collapseBelow?: CollapseProp;
}

export const Columns: ForwardRefExoticComponent<ColumnsProps> = styled.div<ColumnsProps>(
  ({
    theme,
    collapseBelow,
    align: alignProp = 'top',
    space: spaceProp = 'none',
    reverse: reverseProp = false,
  }) => {
    const align = parseResponsiveProp(alignProp);
    const space = parseResponsiveProp(spaceProp);
    const reverse = parseResponsiveProp(reverseProp);
    const collapsed = isCollapsedBelow(collapseBelow);

    return css`
      width: 100%;
      display: flex;

      ${columnsRootMixin(align[0], space[0], reverse[0], collapsed[0])};

      ${theme.breakpoints.up('sm')} {
        ${columnsRootMixin(align[1], space[1], reverse[1], collapsed[1])};
      }

      ${theme.breakpoints.up('md')} {
        ${columnsRootMixin(align[2], space[2], reverse[2], collapsed[2])};
      }
    `;
  },
);
