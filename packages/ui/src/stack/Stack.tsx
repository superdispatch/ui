import { forwardRef, ReactNode } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { HorizontalAlign, parseAlignProp } from '../props/AlignProps';
import {
  parseResponsiveProp,
  ResponsiveProp,
  ResponsivePropTuple,
} from '../props/ResponsiveProp';
import { parseSpaceProp, SpaceProp } from '../props/SpaceProp';

function stackItemMixin(
  space: SpaceProp,
  align: HorizontalAlign,
): readonly SimpleInterpolation[] {
  return css`
    flex-direction: column;
    align-items: ${parseAlignProp(align)};
    padding-top: ${parseSpaceProp(space)}px;
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
  'aria-label'?: string;
  'aria-labelledby'?: string;
  space?: ResponsiveProp<SpaceProp>;
  align?: ResponsiveProp<HorizontalAlign>;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      space = 'xsmall',
      align = 'left',
    },
    ref,
  ) => (
    <StackRoot
      ref={ref}
      align={parseResponsiveProp(align)}
      space={parseResponsiveProp(space)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {flattenChildren(children).map((child, idx) => (
        <div key={idx}>{child}</div>
      ))}
    </StackRoot>
  ),
);
