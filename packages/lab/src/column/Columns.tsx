import { VerticalAlign } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled, { CSSObject } from 'styled-components';

import { CollapseProp, isCollapsedBelow } from '../utils/CollapseProp';
import { injectResponsiveStyles } from '../utils/injectResponsiveStyles';
import { mergeStyles } from '../utils/mergeStyles';
import {
  ResponsiveProp,
  useResponsivePropTuple,
} from '../utils/ResponsiveProp';
import { normalizeSpace, SpaceProp } from '../utils/SpaceProp';
import { ColumnsContext, ColumnsContextProvider } from './ColumnContext';

function columnsRootMixin(
  align: VerticalAlign,
  space: SpaceProp,
  isReversed: boolean,
  isCollapsed: boolean,
): CSSObject {
  const gap = normalizeSpace(space) as string;

  return mergeStyles(
    {
      marginLeft: `-${gap}`,
      width: `calc(100% + ${gap})`,
      flexDirection: !isReversed ? 'row' : 'row-reverse',
      alignItems:
        align === 'top'
          ? 'flex-start'
          : align === 'bottom'
          ? 'flex-end'
          : 'center',
    },
    isCollapsed && {
      width: '100%',
      marginLeft: 0,
      flexDirection: !isReversed ? 'column' : 'column-reverse',
    },
  );
}

const ColumnsRoot = styled.div<ColumnsContext>(
  ({ theme, collapseBelow, align, reverse, space }) => {
    const collapsed = isCollapsedBelow(collapseBelow);

    return injectResponsiveStyles(
      { width: '100%', display: 'flex' },
      theme,
      columnsRootMixin(align[0], space[0], reverse[0], collapsed[0]),
      columnsRootMixin(align[1], space[1], reverse[1], collapsed[1]),
      columnsRootMixin(align[2], space[2], reverse[2], collapsed[2]),
    );
  },
);

export interface ColumnsProps {
  children?: ReactNode;
  reverse?: ResponsiveProp<boolean>;
  space?: ResponsiveProp<SpaceProp>;
  align?: ResponsiveProp<VerticalAlign>;
  collapseBelow?: CollapseProp;
}

export const Columns = forwardRef<HTMLDivElement, ColumnsProps>(
  (
    {
      children,
      collapseBelow,
      align: alignProp = 'top',
      space: spaceProp = 'none',
      reverse: reverseProp = false,
    },
    ref,
  ) => {
    const align = useResponsivePropTuple(alignProp);
    const space = useResponsivePropTuple(spaceProp);
    const reverse = useResponsivePropTuple(reverseProp);

    return (
      <ColumnsRoot
        ref={ref}
        align={align}
        space={space}
        reverse={reverse}
        collapseBelow={collapseBelow}
      >
        <ColumnsContextProvider
          align={align}
          space={space}
          reverse={reverse}
          collapseBelow={collapseBelow}
        >
          {children}
        </ColumnsContextProvider>
      </ColumnsRoot>
    );
  },
);
