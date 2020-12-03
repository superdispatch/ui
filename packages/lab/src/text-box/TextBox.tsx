import { Color, SuperDispatchTheme } from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled, { css, CSSObject, SimpleInterpolation } from 'styled-components';

import { mergeStyles } from '../utils/mergeStyles';
import {
  ResponsiveProp,
  ResponsivePropTuple,
  toResponsivePropTuple,
} from '../utils/ResponsiveProp';
import { createRuleNormalizer } from '../utils/RuleNormalizer';

export type TextAlignProp = 'left' | 'right' | 'center';
export type TextColorProp =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'blue'
  | 'green'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow';

const normalizeTextColor = createRuleNormalizer<TextColorProp>({
  primary: Color.Grey500,
  secondary: Color.Grey200,

  white: Color.White,
  blue: Color.Blue300,
  green: Color.Green300,
  purple: Color.Purple300,
  red: Color.Red300,
  teal: Color.Teal300,
  yellow: Color.Yellow300,
});

export type TextVariantProp =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6'
  | 'body'
  | 'body-block'
  | 'body-semibold'
  | 'caption';

const VARIANT_TYPE_MAPPING: Record<
  TextVariantProp,
  undefined | keyof JSX.IntrinsicElements
> = {
  'heading-1': 'h1',
  'heading-2': 'h2',
  'heading-3': 'h3',
  'heading-4': 'h4',
  'heading-5': 'h5',
  'heading-6': 'h6',

  body: 'span',
  'body-block': 'p',
  'body-semibold': 'span',
  caption: 'span',
};

function variantMixin(
  { typography, breakpoints }: SuperDispatchTheme,
  variant: TextVariantProp,
): CSSObject {
  switch (variant) {
    case 'heading-1':
      return typography.h1 as CSSObject;
    case 'heading-2':
      return typography.h2 as CSSObject;
    case 'heading-3':
      return typography.h3 as CSSObject;
    case 'heading-4':
      return typography.h4 as CSSObject;
    case 'heading-5':
      return typography.h5 as CSSObject;
    case 'heading-6':
      return typography.h6 as CSSObject;
    case 'body':
    default:
      return typography.body2 as CSSObject;
    case 'body-block': {
      return mergeStyles({}, typography.body2 as CSSObject, {
        lineHeight: '24px',
        [breakpoints.only('xs')]: { lineHeight: '28px' },
      });
    }
    case 'body-semibold':
      return typography.body1 as CSSObject;
    case 'caption':
      return typography.caption as CSSObject;
  }
}

function textBoxMixin(
  align: TextAlignProp,
  color: TextColorProp,
  noWrap: boolean,
  wrapOverflow: boolean,
): readonly SimpleInterpolation[] {
  return css`
    text-align: ${align};
    color: ${normalizeTextColor(color)};
    display: ${noWrap ? 'block' : 'initial'};
    overflow: ${noWrap ? 'hidden' : 'visible'};
    white-space: ${noWrap ? 'nowrap' : 'normal'};
    overflow-wrap: ${wrapOverflow ? 'break-word' : 'normal'};
  `;
}

interface TextBoxRootProps {
  variant: TextVariantProp;
  noWrap: ResponsivePropTuple<boolean>;
  wrapOverflow: ResponsivePropTuple<boolean>;
  textAlign: ResponsivePropTuple<TextAlignProp>;
  textColor: ResponsivePropTuple<TextColorProp>;
}

const TextBoxRoot = styled.span<TextBoxRootProps>(
  ({ theme, variant, textAlign, textColor, noWrap, wrapOverflow }) =>
    css`
      margin: 0;
      padding: 0;
      text-overflow: ellipsis;

      ${variantMixin(theme, variant)};
      ${textBoxMixin(textAlign[0], textColor[0], noWrap[0], wrapOverflow[0])};

      ${theme.breakpoints.up('sm')} {
        ${textBoxMixin(textAlign[1], textColor[1], noWrap[1], wrapOverflow[1])};
      }

      ${theme.breakpoints.up('md')} {
        ${textBoxMixin(textAlign[2], textColor[2], noWrap[2], wrapOverflow[2])};
      }
    `,
);

export interface TextBoxProps {
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;

  id?: string;
  variant?: TextVariantProp;

  noWrap?: ResponsiveProp<boolean>;
  wrapOverflow?: ResponsiveProp<boolean>;

  align?: ResponsiveProp<TextAlignProp>;
  color?: ResponsiveProp<TextColorProp>;
}

export const TextBox = forwardRef<HTMLElement, TextBoxProps>(
  (
    {
      variant = 'body',
      as = VARIANT_TYPE_MAPPING[variant],
      align = 'left',
      color = 'primary',
      noWrap: noWrapProp = false,
      wrapOverflow: wrapOverflowProp = false,
      ...props
    },
    ref,
  ) => {
    const textAlign = toResponsivePropTuple(align);
    const textColor = toResponsivePropTuple(color);
    const noWrap = toResponsivePropTuple(noWrapProp);
    const wrapOverflow = toResponsivePropTuple(wrapOverflowProp);

    return (
      <TextBoxRoot
        {...props}
        as={as}
        ref={ref}
        noWrap={noWrap}
        variant={variant}
        textAlign={textAlign}
        textColor={textColor}
        wrapOverflow={wrapOverflow}
      />
    );
  },
);
