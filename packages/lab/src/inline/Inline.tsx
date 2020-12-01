import { HorizontalAlign, VerticalAlign } from '@superdispatch/ui';
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

interface InlineRootProps {
  space: ResponsivePropTuple<SpaceProp>;
  verticalAlign: ResponsivePropTuple<VerticalAlign>;
  horizontalAlign: ResponsivePropTuple<HorizontalAlign>;
}

const InlineRoot = styled.div<InlineRootProps>(
  ({ theme, space, verticalAlign, horizontalAlign }) =>
    css`
      --inline-space: ${normalizeSpace(space[0])};
      --inline-vertical-align: ${normalizeAlignProp(verticalAlign[0])};
      --inline-horizontal-align: ${normalizeAlignProp(horizontalAlign[0])};

      ${theme.breakpoints.up('sm')} {
        --inline-space: ${normalizeSpace(space[1])};
        --inline-vertical-align: ${normalizeAlignProp(verticalAlign[1])};
        --inline-horizontal-align: ${normalizeAlignProp(horizontalAlign[1])};
      }

      ${theme.breakpoints.up('md')} {
        --inline-space: ${normalizeSpace(space[2])};
        --inline-vertical-align: ${normalizeAlignProp(verticalAlign[2])};
        --inline-horizontal-align: ${normalizeAlignProp(horizontalAlign[2])};
      }

      padding-top: 1px;

      &:before {
        content: '';
        display: block;
        margin-top: calc(-1 * var(--inline-space) - 1px);
      }
    `,
);

const InlineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(-1 * var(--inline-space));
  align-items: var(--inline-vertical-align);
  justify-content: var(--inline-horizontal-align);
`;

const InlineItem = styled.div`
  margin-top: var(--inline-space);
  margin-left: var(--inline-space);
`;

export interface InlineProps {
  children?: ReactNode;
  space?: ResponsiveProp<SpaceProp>;
  verticalAlign?: ResponsiveProp<VerticalAlign>;
  horizontalAlign?: ResponsiveProp<HorizontalAlign>;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      children,
      space: spaceProp = 'xsmall',
      verticalAlign: verticalAlignProp = 'top',
      horizontalAlign: horizontalAlignProp = 'left',
    },
    ref,
  ) => {
    const space = useResponsivePropTuple(spaceProp);
    const verticalAlign = useResponsivePropTuple(verticalAlignProp);
    const horizontalAlign = useResponsivePropTuple(horizontalAlignProp);

    return (
      <InlineRoot
        ref={ref}
        space={space}
        verticalAlign={verticalAlign}
        horizontalAlign={horizontalAlign}
      >
        <InlineContainer>
          {flattenChildren(children).map((child, idx) => (
            <InlineItem key={idx}>{child}</InlineItem>
          ))}
        </InlineContainer>
      </InlineRoot>
    );
  },
);
