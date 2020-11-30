import { HorizontalAlign } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { CSSObject } from 'styled-components';

import { styled } from '../styled';
import { injectResponsiveStyles } from '../utils/injectResponsiveStyles';
import {
  ResponsiveProp,
  ResponsivePropTuple,
  useResponsivePropTuple,
} from '../utils/ResponsiveProp';
import { normalizeSpace, SpaceProp } from '../utils/SpaceProp';

function stackItemMixin(
  index: number,
  space: SpaceProp,
  align: HorizontalAlign,
): CSSObject {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems:
      align === 'left'
        ? 'flex-start'
        : align === 'right'
        ? 'flex-end'
        : 'center',
    paddingTop: index === 0 ? 0 : normalizeSpace(space),
  };
}

interface StackItemProps {
  index: number;
  space: ResponsivePropTuple<SpaceProp>;
  align: ResponsivePropTuple<HorizontalAlign>;
}

const StackItem = styled.div<StackItemProps>(({ theme, align, space, index }) =>
  injectResponsiveStyles(
    {},
    theme,
    stackItemMixin(index, space[0], align[0]),
    stackItemMixin(index, space[1], align[1]),
    stackItemMixin(index, space[2], align[2]),
  ),
);

export interface StackProps {
  children?: ReactNode;
  space?: ResponsiveProp<SpaceProp>;
  align?: ResponsiveProp<HorizontalAlign>;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    { children, space: spaceProp = 'xsmall', align: alignProp = 'left' },
    ref,
  ) => {
    const align = useResponsivePropTuple(alignProp);
    const space = useResponsivePropTuple(spaceProp);

    return (
      <div ref={ref}>
        {flattenChildren(children).map((child, idx) => (
          <StackItem key={idx} index={idx} align={align} space={space}>
            {child}
          </StackItem>
        ))}
      </div>
    );
  },
);
