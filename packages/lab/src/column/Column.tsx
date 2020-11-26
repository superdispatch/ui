import { forwardRef, ReactNode } from 'react';
import { CSSObject } from 'styled-components';

import { styled } from '../styled';
import { isCollapsedBelow } from '../utils/CollapseProp';
import { injectResponsiveStyles } from '../utils/injectResponsiveStyles';
import { mergeStyles } from '../utils/mergeStyles';
import {
  ResponsiveProp,
  ResponsivePropTuple,
  useResponsivePropTuple,
} from '../utils/ResponsiveProp';
import { normalizeSpace, SpaceProp } from '../utils/SpaceProp';
import { ColumnsContext, useColumnsContext } from './ColumnContext';

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

interface ColumnRootProps extends ColumnsContext {
  width: ResponsivePropTuple<ColumnWidth>;
}

function widthScaleMixin(scale: number): CSSObject {
  return { flexBasis: `${scale * 100}%` };
}

function columnRootMixin(width: ColumnWidth): CSSObject {
  return mergeStyles(
    {
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
    },
    width === 'fluid' && { width: '100%' },
    width === 'content' && { flexShrink: 0 },
    width === '1/2' && widthScaleMixin(1 / 2),
    width === '1/3' && widthScaleMixin(1 / 3),
    width === '2/3' && widthScaleMixin(2 / 3),
    width === '1/4' && widthScaleMixin(1 / 4),
    width === '3/4' && widthScaleMixin(3 / 4),
    width === '1/5' && widthScaleMixin(1 / 5),
    width === '2/5' && widthScaleMixin(2 / 5),
    width === '3/5' && widthScaleMixin(3 / 5),
    width === '4/5' && widthScaleMixin(4 / 5),
  );
}

const ColumnRoot = styled.div<ColumnRootProps>(({ theme, width }) =>
  injectResponsiveStyles(
    { minWidth: 0 },
    theme,
    columnRootMixin(width[0]),
    columnRootMixin(width[1]),
    columnRootMixin(width[2]),
  ),
);

function columnContentMixin(
  space: SpaceProp,
  isReversed: boolean,
  isCollapsed: boolean,
): CSSObject {
  const gap = normalizeSpace(space) as string;

  return {
    paddingLeft: !isCollapsed ? gap : 0,
    paddingTop: isCollapsed && isReversed ? gap : 0,
    paddingBottom: isCollapsed && !isReversed ? gap : 0,

    [`${ColumnRoot}:last-child > &`]: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  };
}

const ColumnContent = styled.div<ColumnsContext>(
  ({ theme, space, reverse, collapseBelow }) => {
    const collapsed = isCollapsedBelow(collapseBelow);

    return injectResponsiveStyles(
      {},
      theme,
      columnContentMixin(space[0], reverse[0], collapsed[0]),
      columnContentMixin(space[1], reverse[1], collapsed[1]),
      columnContentMixin(space[2], reverse[2], collapsed[2]),
    );
  },
);

export interface ColumnProps {
  children?: ReactNode;
  width?: ResponsiveProp<ColumnWidth>;
}

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, width: widthProp = 'fluid' }: ColumnProps, ref) => {
    const ctx = useColumnsContext();
    const width = useResponsivePropTuple(widthProp);

    return (
      <ColumnRoot {...ctx} ref={ref} width={width}>
        <ColumnContent {...ctx}>{children}</ColumnContent>
      </ColumnRoot>
    );
  },
);
