import { forwardRef, ReactNode } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import styled, { css, SimpleInterpolation } from 'styled-components';
import {
  HorizontalAlign,
  parseAlignProp,
  VerticalAlign,
} from '../props/AlignProps';
import {
  ResponsiveProp,
  ResponsivePropTuple,
  useResponsiveProp,
} from '../props/ResponsiveProp';
import { parseSpaceProp, SpaceProp } from '../props/SpaceProp';

function inlineRootMixin(
  spaceProp: SpaceProp,
  noWrap: boolean,
  verticalAlign: VerticalAlign,
  horizontalAlign: HorizontalAlign,
): readonly SimpleInterpolation[] {
  const space = parseSpaceProp(spaceProp);

  return css`
    &:before {
      margin-top: ${-space - 1}px;
    }

    & > div {
      display: flex;
      margin-left: -${space}px;
      flex-wrap: ${noWrap ? 'nowrap' : 'wrap'};
      align-items: ${parseAlignProp(verticalAlign)};
      justify-content: ${parseAlignProp(horizontalAlign)};

      & > div {
        &:empty {
          display: none;
        }

        min-width: 0;
        flex-shrink: 0;
        max-width: 100%;

        margin-top: ${space}px;
        margin-left: ${space}px;
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
  'aria-label'?: string;
  'aria-labelledby'?: string;

  noWrap?: ResponsiveProp<boolean>;
  space?: ResponsiveProp<SpaceProp>;
  verticalAlign?: ResponsiveProp<VerticalAlign>;
  horizontalAlign?: ResponsiveProp<HorizontalAlign>;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,

      noWrap: noWrapProp = false,
      space: spaceProp = 'xsmall',
      verticalAlign: verticalAlignProp = 'top',
      horizontalAlign: horizontalAlignProp = 'left',
    },
    ref,
  ) => {
    const space = useResponsiveProp(spaceProp);
    const noWrap = useResponsiveProp(noWrapProp);
    const verticalAlign = useResponsiveProp(verticalAlignProp);
    const horizontalAlign = useResponsiveProp(horizontalAlignProp);

    return (
      <InlineRoot
        ref={ref}
        space={space}
        noWrap={noWrap}
        verticalAlign={verticalAlign}
        horizontalAlign={horizontalAlign}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
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
