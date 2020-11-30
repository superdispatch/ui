import { HorizontalAlign, VerticalAlign } from '@superdispatch/ui';
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

const PREVENT_COLLAPSE = 1;

const InlineItem = styled.div`
  margin-top: 0;
  margin-left: 0;
`;

const InlineContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function inlineRootMixin(
  space: SpaceProp,
  verticalAlign: VerticalAlign,
  horizontalAlign: HorizontalAlign,
): CSSObject {
  const gap = normalizeSpace(space) as string;

  return {
    '&:before': {
      marginTop: `calc(-${gap} - ${PREVENT_COLLAPSE}px)`,
    },

    [`& > ${InlineContainer}`]: {
      marginLeft: `-${gap}`,

      alignItems:
        verticalAlign === 'top'
          ? 'flex-start'
          : verticalAlign === 'bottom'
          ? 'flex-end'
          : 'center',

      justifyContent:
        horizontalAlign === 'left'
          ? 'flex-start'
          : horizontalAlign === 'right'
          ? 'flex-end'
          : 'center',

      [`& > ${InlineItem}`]: {
        marginTop: gap,
        marginLeft: gap,
      },
    },
  };
}

interface InlineRootProps {
  space: ResponsivePropTuple<SpaceProp>;
  verticalAlign: ResponsivePropTuple<VerticalAlign>;
  horizontalAlign: ResponsivePropTuple<HorizontalAlign>;
}

const InlineRoot = styled.div<InlineRootProps>(
  ({ theme, space, verticalAlign, horizontalAlign }) =>
    injectResponsiveStyles(
      {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: PREVENT_COLLAPSE,

        '&:before': {
          content: '""',
          display: 'block',
        },
      },
      theme,
      inlineRootMixin(space[0], verticalAlign[0], horizontalAlign[0]),
      inlineRootMixin(space[1], verticalAlign[1], horizontalAlign[1]),
      inlineRootMixin(space[2], verticalAlign[2], horizontalAlign[2]),
    ),
);

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
