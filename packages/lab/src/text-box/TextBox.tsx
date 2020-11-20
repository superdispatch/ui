import { Color, SuperDispatchTheme } from '@superdispatch/ui';
import { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import styled, { CSSObject } from 'styled-components';

import { injectRule } from '../utils/injectRules';
import { mergeStyles } from '../utils/mergeStyles';
import { createRuleNormalizer } from '../utils/RuleNormalizer';

//
// Align
//

export type TextAlign = 'left' | 'right' | 'center';

function injectAlign(
  styles: CSSObject,
  breakpoint: string,
  align: TextAlign,
): void {
  injectRule(styles, 'textAlign', breakpoint, align);
}

//
// Color
//

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'white'
  | 'blue'
  | 'green'
  | 'purple'
  | 'red'
  | 'teal'
  | 'yellow';

const normalizeTextColor = createRuleNormalizer<TextColor>({
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

function injectColor(
  styles: CSSObject,
  breakpoint: string,
  color: TextColor,
): void {
  injectRule(styles, 'color', breakpoint, color, normalizeTextColor);
}

//
// Variant
//

export type TextVariant =
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
  TextVariant,
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

function injectVariant(
  { typography, breakpoints }: SuperDispatchTheme,
  styles: CSSObject,
  variant: TextVariant,
): void {
  const xsOnly = breakpoints.only('xs');

  switch (variant) {
    case 'heading-1':
      mergeStyles(styles, typography.h1 as CSSObject);
      break;
    case 'heading-2':
      mergeStyles(styles, typography.h2 as CSSObject);
      break;
    case 'heading-3':
      mergeStyles(styles, typography.h3 as CSSObject);
      break;
    case 'heading-4':
      mergeStyles(styles, typography.h4 as CSSObject);
      break;
    case 'heading-5':
      mergeStyles(styles, typography.h5 as CSSObject);
      break;
    case 'heading-6':
      mergeStyles(styles, typography.h6 as CSSObject);
      break;
    case 'body':
      mergeStyles(styles, typography.body2 as CSSObject);
      break;
    case 'body-block':
      mergeStyles(styles, typography.body2 as CSSObject);
      mergeStyles(styles, {
        lineHeight: '24px',
        [xsOnly]: { lineHeight: '28px' },
      });
      break;
    case 'body-semibold':
      mergeStyles(styles, typography.body1 as CSSObject);
      break;
    case 'caption':
      mergeStyles(styles, typography.caption as CSSObject);
      break;
  }
}

//
// TextLine
//

interface TextLineRules {
  noWrap?: boolean;
  align?: TextAlign;
  color?: TextColor;
  variant?: TextVariant;
}

export interface TextLineProps extends TextLineRules {
  id?: string;
  ref?: Ref<unknown>;
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

interface StyledTextLineProps extends TextLineProps {
  theme: SuperDispatchTheme;
}

function normalizeProps({
  variant,
  as = variant == null ? undefined : VARIANT_TYPE_MAPPING[variant],
  ...props
}: TextLineProps): TextLineProps {
  return { as, variant, ...props };
}

export const TextBox: ForwardRefExoticComponent<TextLineProps> = styled.span.attrs<TextLineProps>(
  normalizeProps,
)(
  ({
    theme,
    noWrap,
    align = 'left',
    color = 'primary',
    variant = 'body',
  }: StyledTextLineProps) => {
    const styles: CSSObject = {
      margin: 0,
      fontFamily: theme.typography.fontFamily,
    };

    const xs = theme.breakpoints.up('xs');

    if (noWrap) {
      styles.display = 'block';
      styles.overflow = 'hidden';
      styles.whiteSpace = 'nowrap';
      styles.textOverflow = 'ellipsis';
    }

    injectAlign(styles, xs, align);
    injectColor(styles, xs, color);
    injectVariant(theme, styles, variant);

    return styles;
  },
);
