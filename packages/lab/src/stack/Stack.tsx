import { HorizontalAlign } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import styled, { css } from 'styled-components';

import { normalizeAlignProp } from '../utils/HorizontalAlignProp';
import {
  ResponsiveProp,
  ResponsivePropTuple,
  useResponsivePropTuple,
} from '../utils/ResponsiveProp';
import { normalizeSpace, SpaceProp } from '../utils/SpaceProp';

const StackRoot = styled.div<StackItemProps>(
  ({ theme, space, align }) =>
    css`
      --stack-space: ${normalizeSpace(space[0])};
      --stack-align: ${normalizeAlignProp(align[0])};

      ${theme.breakpoints.up('sm')} {
        --stack-space: ${normalizeSpace(space[1])};
        --stack-align: ${normalizeAlignProp(align[1])};
      }

      ${theme.breakpoints.up('md')} {
        --stack-space: ${normalizeSpace(space[2])};
        --stack-align: ${normalizeAlignProp(align[2])};
      }
    `,
);

interface StackItemProps {
  space: ResponsivePropTuple<SpaceProp>;
  align: ResponsivePropTuple<HorizontalAlign>;
}

const StackItem = styled.div<StackItemProps>`
  display: flex;
  flex-direction: column;

  padding-top: var(--stack-space);
  align-items: var(--stack-align);

  &:first-child {
    padding-top: 0;
  }
`;

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
          <StackItem key={idx} align={align} space={space}>
            {child}
          </StackItem>
        ))}
      </StackRoot>
    );
  },
);
