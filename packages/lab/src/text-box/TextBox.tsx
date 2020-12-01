import { Color, SuperDispatchTheme } from '@superdispatch/ui';
import { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import styled, { css, CSSObject, SimpleInterpolation } from 'styled-components';

import { mergeStyles } from '../utils/mergeStyles';
import { ResponsiveProp, toResponsivePropTuple } from '../utils/ResponsiveProp';
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
): readonly SimpleInterpolation[] {
  return css`
    text-align: ${align};
    color: ${normalizeTextColor(color)};
    display: ${noWrap ? 'block' : 'initial'};
    overflow: ${noWrap ? 'hidden' : 'visible'};
    white-space: ${noWrap ? 'nowrap' : 'normal'};
  `;
}

export interface TextLineProps {
  ref?: Ref<unknown>;
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;

  id?: string;
  variant?: TextVariantProp;

  noWrap?: ResponsiveProp<boolean>;
  align?: ResponsiveProp<TextAlignProp>;
  color?: ResponsiveProp<TextColorProp>;
}

function normalizeProps({
  variant,
  as = variant == null ? 'span' : VARIANT_TYPE_MAPPING[variant],
  ...props
}: TextLineProps): TextLineProps {
  return { as, variant, ...props };
}

export const TextBox: ForwardRefExoticComponent<TextLineProps> = styled.span
  .attrs<TextLineProps>(normalizeProps)
  .withConfig<TextLineProps>({
    displayName: 'TextBox',
    shouldForwardProp: (prop, defaultValidatorFn) =>
      defaultValidatorFn(prop) && prop !== 'color' && prop !== 'align',
  })(
  ({
    theme,
    align: alignProp = 'left',
    color: colorProp = 'primary',
    noWrap: noWrapProp = false,
    variant = 'body',
  }) => {
    const align = toResponsivePropTuple(alignProp);
    const color = toResponsivePropTuple(colorProp);
    const noWrap = toResponsivePropTuple(noWrapProp);

    return css`
      margin: 0;
      padding: 0;
      text-overflow: ellipsis;

      ${variantMixin(theme, variant)};
      ${textBoxMixin(align[0], color[0], noWrap[0])};

      ${theme.breakpoints.up('sm')} {
        ${textBoxMixin(align[1], color[1], noWrap[1])};
      }

      ${theme.breakpoints.up('md')} {
        ${textBoxMixin(align[2], color[2], noWrap[2])};
      }
    `;
  },
);
