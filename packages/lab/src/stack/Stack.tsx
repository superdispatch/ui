import { HorizontalAlign } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import styled, { css, SimpleInterpolation } from 'styled-components';

import { normalizeAlignProp } from '../utils/HorizontalAlignProp';
import {
  ResponsiveProp,
  ResponsivePropTuple,
  useResponsivePropTuple,
} from '../utils/ResponsiveProp';
import { normalizeSpace, SpaceProp } from '../utils/SpaceProp';

function stackItemMixin(
  space: SpaceProp,
  align: HorizontalAlign,
): readonly SimpleInterpolation[] {
  return css`
    flex-direction: column;
    padding-top: ${normalizeSpace(space)};
    align-items: ${normalizeAlignProp(align)};
    display: ${align === 'left' ? 'block' : 'flex'};

    &:first-child {
      padding-top: 0;
    }
  `;
}

interface StackRootProps {
  space: ResponsivePropTuple<SpaceProp>;
  align: ResponsivePropTuple<HorizontalAlign>;
}

const StackRoot = styled.div<StackRootProps>(
  ({ theme, space, align }) =>
    css`
      width: 100%;

      & > div {
        ${stackItemMixin(space[0], align[0])};

        ${theme.breakpoints.up('sm')} {
          ${stackItemMixin(space[1], align[1])};
        }

        ${theme.breakpoints.up('md')} {
          ${stackItemMixin(space[2], align[2])};
        }
      }
    `,
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
      <StackRoot ref={ref} align={align} space={space}>
        {flattenChildren(children).map((child, idx) => (
          <div key={idx}>{child}</div>
        ))}
      </StackRoot>
    );
  },
);
