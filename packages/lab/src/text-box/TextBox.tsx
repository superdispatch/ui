import {
  Color,
  parseResponsiveProp,
  ResponsiveProp,
  ResponsivePropTuple,
  SuperDispatchTheme,
} from '@superdispatch/ui';
import { forwardRef, ReactNode } from 'react';
import styled, { css, CSSObject, SimpleInterpolation } from 'styled-components';
import { mergeStyles } from '../utils/mergeStyles';
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
export type TextDisplayProp =
  | 'none'
  | 'block'
  | 'inline'
  | 'initial'
  | 'inherit';

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
  noWrap: boolean,
  align: TextAlignProp,
  color: TextColorProp,
  display: TextDisplayProp,
  wrapOverflow: boolean,
): readonly SimpleInterpolation[] {
  return css`
    text-align: ${align};
    color: ${normalizeTextColor(color)};
    display: ${display === 'initial' && (noWrap || align !== 'left')
      ? 'block'
      : display};
    overflow: ${noWrap ? 'hidden' : 'visible'};
    white-space: ${noWrap ? 'nowrap' : 'normal'};
    overflow-wrap: ${wrapOverflow ? 'break-word' : 'normal'};
  `;
}

interface TextBoxRootProps {
  $variant: TextVariantProp;
  $noWrap: ResponsivePropTuple<boolean>;
  $wrapOverflow: ResponsivePropTuple<boolean>;
  $align: ResponsivePropTuple<TextAlignProp>;
  $color: ResponsivePropTuple<TextColorProp>;
  $display: ResponsivePropTuple<TextDisplayProp>;
}

const TextBoxRoot = styled.span<TextBoxRootProps>(
  ({ theme, $noWrap, $variant, $align, $color, $display, $wrapOverflow }) =>
    css`
      margin: 0;
      padding: 0;
      text-overflow: ellipsis;

      ${variantMixin(theme, $variant)};

      ${textBoxMixin(
        $noWrap[0],
        $align[0],
        $color[0],
        $display[0],
        $wrapOverflow[0],
      )};

      ${theme.breakpoints.up('sm')} {
        ${textBoxMixin(
          $noWrap[1],
          $align[1],
          $color[1],
          $display[1],
          $wrapOverflow[1],
        )};
      }

      ${theme.breakpoints.up('md')} {
        ${textBoxMixin(
          $noWrap[2],
          $align[2],
          $color[2],
          $display[2],
          $wrapOverflow[2],
        )};
      }
    `,
);

export interface TextBoxProps {
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;

  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;

  variant?: TextVariantProp;

  noWrap?: ResponsiveProp<boolean>;
  wrapOverflow?: ResponsiveProp<boolean>;

  align?: ResponsiveProp<TextAlignProp>;
  color?: ResponsiveProp<TextColorProp>;
  display?: ResponsiveProp<TextDisplayProp>;
}

export const TextBox = forwardRef<HTMLElement, TextBoxProps>(
  (
    {
      variant: $variant = 'body',
      as = VARIANT_TYPE_MAPPING[$variant],
      align = 'left',
      color = 'primary',
      display = 'initial',
      noWrap = false,
      wrapOverflow = false,
      ...props
    },
    ref,
  ) => {
    const $align = parseResponsiveProp(align);
    const $color = parseResponsiveProp(color);
    const $noWrap = parseResponsiveProp(noWrap);
    const $display = parseResponsiveProp(display);
    const $wrapOverflow = parseResponsiveProp(wrapOverflow);

    return (
      <TextBoxRoot
        {...props}
        as={as}
        ref={ref}
        $align={$align}
        $color={$color}
        $noWrap={$noWrap}
        $display={$display}
        $variant={$variant}
        $wrapOverflow={$wrapOverflow}
      />
    );
  },
);
