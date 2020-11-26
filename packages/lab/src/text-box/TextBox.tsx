import { Color, SuperDispatchTheme } from '@superdispatch/ui';
import { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import { CSSObject } from 'styled-components';

import { styled } from '../styled';
import { injectResponsiveStyles } from '../utils/injectResponsiveStyles';
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
): undefined | CSSObject {
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

  return undefined;
}

function textBoxMixin(
  theme: SuperDispatchTheme,
  align: TextAlignProp,
  color: TextColorProp,
  variant: TextVariantProp,
  noWrap: boolean,
): CSSObject {
  return mergeStyles(
    {
      textAlign: align,
      color: normalizeTextColor(color),
    },
    noWrap && {
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    variantMixin(theme, variant),
  );
}

export interface TextLineProps {
  ref?: Ref<unknown>;
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;

  id?: string;
  noWrap?: ResponsiveProp<boolean>;
  align?: ResponsiveProp<TextAlignProp>;
  color?: ResponsiveProp<TextColorProp>;
  variant?: ResponsiveProp<TextVariantProp>;
}

function normalizeProps({
  as,
  variant,
  ...props
}: TextLineProps): TextLineProps {
  if (as == null && typeof variant == 'string') {
    as = VARIANT_TYPE_MAPPING[variant];
  }

  return { as, variant, ...props };
}

export const TextBox: ForwardRefExoticComponent<TextLineProps> = styled.span.attrs<TextLineProps>(
  normalizeProps,
)<TextLineProps>(
  ({
    theme,
    align: alignProp = 'left',
    color: colorProp = 'primary',
    noWrap: noWrapProp = false,
    variant: variantProp = 'body',
  }) => {
    const styles: CSSObject = {
      margin: 0,
      fontFamily: theme.typography.fontFamily,
    };

    const align = toResponsivePropTuple(alignProp);
    const color = toResponsivePropTuple(colorProp);
    const variant = toResponsivePropTuple(variantProp);
    const noWrap = toResponsivePropTuple(noWrapProp);

    return injectResponsiveStyles(
      styles,
      theme,
      textBoxMixin(theme, align[0], color[0], variant[0], noWrap[0]),
      textBoxMixin(theme, align[1], color[1], variant[1], noWrap[1]),
      textBoxMixin(theme, align[2], color[2], variant[2], noWrap[2]),
    );
  },
);
