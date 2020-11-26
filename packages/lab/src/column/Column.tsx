import { forwardRef, ReactNode } from 'react';
import { CSSObject } from 'styled-components';

import { styled } from '../styled';
import { injectResponsiveStyles } from '../utils/injectStyles';
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
  return { flex: `0 0 ${scale * 100}%` };
}

function columnRootMixin(width: ColumnWidth): undefined | CSSObject {
  switch (width) {
    case 'adaptive':
      return { flexShrink: 1 };
    case 'content':
      return { flexShrink: 0 };
    case 'fluid':
      return { width: '100%' };
    case '1/2':
      return widthScaleMixin(1 / 2);
    case '1/3':
      return widthScaleMixin(1 / 3);
    case '2/3':
      return widthScaleMixin(2 / 3);
    case '1/4':
      return widthScaleMixin(1 / 4);
    case '3/4':
      return widthScaleMixin(3 / 4);
    case '1/5':
      return widthScaleMixin(1 / 5);
    case '2/5':
      return widthScaleMixin(2 / 5);
    case '3/5':
      return widthScaleMixin(3 / 5);
    case '4/5':
      return widthScaleMixin(4 / 5);
  }

  return undefined;
}

const ColumnRoot = styled.div<ColumnRootProps>(({ theme, width }) => {
  const styles: CSSObject = { minWidth: 0 };

  injectResponsiveStyles(
    theme,
    styles,
    columnRootMixin(width[0]),
    columnRootMixin(width[1]),
    columnRootMixin(width[2]),
  );

  return styles;
});

function columnContentMixin(
  space: SpaceProp,
  isReversed: boolean,
  isCollapsed: boolean,
): CSSObject {
  const styles: CSSObject = {};
  const gap = normalizeSpace(space) as string;

  if (!isCollapsed) {
    styles.paddingLeft = gap;
  } else {
    styles.paddingBottom = gap;

    if (!isReversed) {
      styles[`${ColumnRoot}:last-child > &`] = {
        paddingBottom: 0,
      };
    } else {
      styles[`${ColumnRoot}:first-child > &`] = {
        paddingBottom: 0,
      };
    }
  }

  return styles;
}

const ColumnContent = styled.div<ColumnsContext>(
  ({ theme, space, reverse, collapseBelow }) => {
    const styles: CSSObject = {};

    injectResponsiveStyles(
      theme,
      styles,
      columnContentMixin(space[0], reverse[0], collapseBelow != null),
      columnContentMixin(space[1], reverse[1], collapseBelow === 'desktop'),
      columnContentMixin(space[2], reverse[2], false),
    );

    return styles;
  },
);

export interface ColumnProps {
  children?: ReactNode;
  width?: ResponsiveProp<ColumnWidth>;
}

export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  ({ children, width: widthProp = 'fluid' }: ColumnProps, ref) => {
    const width = useResponsivePropTuple(widthProp);
    const ctx = useColumnsContext();

    return (
      <ColumnRoot {...ctx} ref={ref} width={width}>
        <ColumnContent {...ctx}>{children}</ColumnContent>
      </ColumnRoot>
    );
  },
);
