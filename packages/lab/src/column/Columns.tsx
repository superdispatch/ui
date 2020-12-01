import { VerticalAlign } from '@superdispatch/ui';
import { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';

import { CollapseProp, isCollapsedBelow } from '../utils/CollapseProp';
import { normalizeAlignProp } from '../utils/HorizontalAlignProp';
import { ResponsiveProp, toResponsivePropTuple } from '../utils/ResponsiveProp';
import { normalizeSpace, SpaceProp } from '../utils/SpaceProp';

function columnsRootMixin(
  align: VerticalAlign,
  space: SpaceProp,
  isReversed: boolean,
  isCollapsed: boolean,
): readonly SimpleInterpolation[] {
  const gap = normalizeSpace(space) as string;

  return css`
    --column-space-left: ${isCollapsed ? 0 : gap};
    --column-space-top: ${isCollapsed && isReversed ? gap : 0};
    --column-space-bottom: ${isCollapsed && !isReversed ? gap : 0};

    align-items: ${normalizeAlignProp(align)};
    margin-left: ${isCollapsed ? 0 : `-${gap}`};
    width: ${isCollapsed ? '100%' : `calc(100% + ${gap})`};
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
    const align = toResponsivePropTuple(alignProp);
    const space = toResponsivePropTuple(spaceProp);
    const reverse = toResponsivePropTuple(reverseProp);
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
