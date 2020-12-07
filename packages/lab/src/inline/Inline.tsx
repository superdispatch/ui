import {
  HorizontalAlign,
  normalizeAlignProp,
  VerticalAlign,
} from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import styled, { css, SimpleInterpolation } from 'styled-components';

import {
  ResponsiveProp,
  ResponsivePropTuple,
  useResponsivePropTuple,
} from '../utils/ResponsiveProp';
import { normalizeSpace, SpaceProp } from '../utils/SpaceProp';

function inlineRootMixin(
  space: SpaceProp,
  noWrap: boolean,
  verticalAlign: VerticalAlign,
  horizontalAlign: HorizontalAlign,
): readonly SimpleInterpolation[] {
  const gap = normalizeSpace(space) as string;

  return css`
    &:before {
      margin-top: calc(-${gap} - 1px);
    }

    & > div {
      display: flex;
      margin-left: -${gap};
      flex-wrap: ${noWrap ? 'nowrap' : 'wrap'};
      align-items: ${normalizeAlignProp(verticalAlign)};
      justify-content: ${normalizeAlignProp(horizontalAlign)};

      & > div {
        min-width: 0;
        flex-shrink: 0;
        max-width: 100%;

        margin-top: ${gap};
        margin-left: ${gap};
      }
    }
  `;
}

interface InlineRootProps {
  space: ResponsivePropTuple<SpaceProp>;
  noWrap: ResponsivePropTuple<boolean>;
  verticalAlign: ResponsivePropTuple<VerticalAlign>;
  horizontalAlign: ResponsivePropTuple<HorizontalAlign>;
}

const InlineRoot = styled.div<InlineRootProps>(
  ({ theme, space, noWrap, verticalAlign, horizontalAlign }) =>
    css`
      padding-top: 1px;

      &:before {
        content: '';
        display: block;
      }

      ${inlineRootMixin(
        space[0],
        noWrap[0],
        verticalAlign[0],
        horizontalAlign[0],
      )}

      ${theme.breakpoints.up('sm')} {
        ${inlineRootMixin(
          space[1],
          noWrap[1],
          verticalAlign[1],
          horizontalAlign[1],
        )}
      }

      ${theme.breakpoints.up('md')} {
        ${inlineRootMixin(
          space[2],
          noWrap[2],
          verticalAlign[2],
          horizontalAlign[2],
        )}
      }
    `,
);

export interface InlineProps {
  children?: ReactNode;
  noWrap?: ResponsiveProp<boolean>;
  space?: ResponsiveProp<SpaceProp>;
  verticalAlign?: ResponsiveProp<VerticalAlign>;
  horizontalAlign?: ResponsiveProp<HorizontalAlign>;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      children,
      noWrap: noWrapProp = false,
      space: spaceProp = 'xsmall',
      verticalAlign: verticalAlignProp = 'top',
      horizontalAlign: horizontalAlignProp = 'left',
    },
    ref,
  ) => {
    const space = useResponsivePropTuple(spaceProp);
    const noWrap = useResponsivePropTuple(noWrapProp);
    const verticalAlign = useResponsivePropTuple(verticalAlignProp);
    const horizontalAlign = useResponsivePropTuple(horizontalAlignProp);

    return (
      <InlineRoot
        ref={ref}
        space={space}
        noWrap={noWrap}
        verticalAlign={verticalAlign}
        horizontalAlign={horizontalAlign}
      >
        <div>
          {flattenChildren(children).map((child, idx) => (
            <div key={idx}>{child}</div>
          ))}
        </div>
      </InlineRoot>
    );
  },
);
