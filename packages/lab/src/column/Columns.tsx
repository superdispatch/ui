import { VerticalAlign } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import { CSSObject } from 'styled-components';

import { styled } from '../styled';
import { CollapseProp } from '../utils/CollapseProp';
import { injectStyles } from '../utils/injectStyles';
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
  const styles: CSSObject = {};

  if (align === 'center') {
    styles.alignItems = 'center';
  } else if (align === 'bottom') {
    styles.alignItems = 'flex-end';
  }

  if (!isCollapsed) {
    styles.marginLeft = `-${gap}`;
    styles.width = `calc(100% - ${gap}px)`;
    styles.flexDirection = !isReversed ? 'row' : 'row-reverse';
  } else {
    styles.flexDirection = !isReversed ? 'column' : 'column-reverse';
  }

  return styles;
}

const ColumnsRoot = styled.div<ColumnsContext>(
  ({ theme, collapseBelow, align, reverse, space }) => {
    const styles: CSSObject = {
      width: '100%',
      display: 'flex',
    };

    injectStyles(
      styles,
      theme.breakpoints.up('xs'),
      columnsRootMixin(align[0], space[0], reverse[0], collapseBelow != null),
    );
    injectStyles(
      styles,
      theme.breakpoints.up('sm'),
      columnsRootMixin(
        align[1],
        space[1],
        reverse[1],
        collapseBelow === 'desktop',
      ),
    );
    injectStyles(
      styles,
      theme.breakpoints.up('md'),
      columnsRootMixin(align[2], space[2], reverse[2], false),
    );

    return styles;
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
