import {
  Color,
  ColorProp,
  isColorProp,
  NegativeSpaceProp,
  parseResponsiveProp,
  parseSpaceProp,
  ResponsiveProp,
  SpaceProp,
} from '@superdispatch/ui';
import { Property } from 'csstype';
import { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import styled, { CSSObject } from 'styled-components';
import { createRuleNormalizer, RuleNormalizer } from '../utils/RuleNormalizer';

//
// Colors
//

function normalizeColor(input: unknown): string | undefined {
  return isColorProp(input) ? Color[input] : undefined;
}

//
// Space
//

function parseSpace(space: unknown): string {
  return `${parseSpaceProp(space as SpaceProp)}px`;
}

//
// Margins
//

export type MarginProp = 'auto' | SpaceProp | NegativeSpaceProp;
function parseMargin(input: unknown): string {
  if (input === 'auto') return input;

  let prefix = '';

  if (typeof input == 'string' && input.startsWith('-')) {
    prefix = '-';
    input = input.slice(1);
  }

  return prefix + parseSpace(input);
}

//
// Borders
//

export type BorderRadiusProp = 'none' | 'small';
const normalizeBorderRadius = createRuleNormalizer<BorderRadiusProp>({
  none: 0,
  small: 4,
});

export type BorderWidthProp = 'none' | 'small' | 'medium' | 'large';
const normalizeBorderWidth = createRuleNormalizer<BorderWidthProp>({
  none: 0,
  small: 1,
  medium: 2,
  large: 4,
});

//
// Rules
//

interface BoxRules {
  display?: ResponsiveProp<Property.Display>;

  color?: ResponsiveProp<ColorProp>;
  backgroundColor?: ResponsiveProp<ColorProp>;

  borderColor?: ResponsiveProp<ColorProp>;
  borderTopColor?: ResponsiveProp<ColorProp>;
  borderLeftColor?: ResponsiveProp<ColorProp>;
  borderRightColor?: ResponsiveProp<ColorProp>;
  borderBottomColor?: ResponsiveProp<ColorProp>;

  borderWidth?: ResponsiveProp<BorderWidthProp>;
  borderTopWidth?: ResponsiveProp<BorderWidthProp>;
  borderLeftWidth?: ResponsiveProp<BorderWidthProp>;
  borderRightWidth?: ResponsiveProp<BorderWidthProp>;
  borderBottomWidth?: ResponsiveProp<BorderWidthProp>;

  padding?: ResponsiveProp<SpaceProp>;
  paddingTop?: ResponsiveProp<SpaceProp>;
  paddingLeft?: ResponsiveProp<SpaceProp>;
  paddingRight?: ResponsiveProp<SpaceProp>;
  paddingBottom?: ResponsiveProp<SpaceProp>;

  margin?: ResponsiveProp<MarginProp>;
  marginTop?: ResponsiveProp<MarginProp>;
  marginLeft?: ResponsiveProp<MarginProp>;
  marginRight?: ResponsiveProp<MarginProp>;
  marginBottom?: ResponsiveProp<MarginProp>;

  borderRadius?: ResponsiveProp<BorderRadiusProp>;
  borderTopLeftRadius?: ResponsiveProp<BorderRadiusProp>;
  borderTopRightRadius?: ResponsiveProp<BorderRadiusProp>;
  borderBottomLeftRadius?: ResponsiveProp<BorderRadiusProp>;
  borderBottomRightRadius?: ResponsiveProp<BorderRadiusProp>;

  fontSize?: ResponsiveProp<Property.FontSize>;

  width?: ResponsiveProp<Property.Width>;
  maxWidth?: ResponsiveProp<Property.MaxWidth>;
  minWidth?: ResponsiveProp<Property.MinWidth>;

  height?: ResponsiveProp<Property.Height>;
  maxHeight?: ResponsiveProp<Property.MaxHeight>;
  minHeight?: ResponsiveProp<Property.MinHeight>;

  overflow?: ResponsiveProp<Property.Overflow>;
  overflowY?: ResponsiveProp<Property.OverflowY>;
  overflowX?: ResponsiveProp<Property.OverflowX>;

  top?: ResponsiveProp<Property.Top>;
  left?: ResponsiveProp<Property.Left>;
  right?: ResponsiveProp<Property.Right>;
  bottom?: ResponsiveProp<Property.Bottom>;
  position?: ResponsiveProp<Property.Position>;
}

const normalizers: Array<[keyof BoxRules, undefined | RuleNormalizer]> = [
  ['display', undefined],

  ['color', normalizeColor],
  ['backgroundColor', normalizeColor],

  ['borderColor', normalizeColor],
  ['borderTopColor', normalizeColor],
  ['borderLeftColor', normalizeColor],
  ['borderRightColor', normalizeColor],
  ['borderBottomColor', normalizeColor],

  ['borderWidth', normalizeBorderWidth],
  ['borderTopWidth', normalizeBorderWidth],
  ['borderLeftWidth', normalizeBorderWidth],
  ['borderRightWidth', normalizeBorderWidth],
  ['borderBottomWidth', normalizeBorderWidth],

  ['margin', parseMargin],
  ['marginTop', parseMargin],
  ['marginLeft', parseMargin],
  ['marginRight', parseMargin],
  ['marginBottom', parseMargin],

  ['padding', parseSpace],
  ['paddingTop', parseSpace],
  ['paddingLeft', parseSpace],
  ['paddingRight', parseSpace],
  ['paddingBottom', parseSpace],

  ['borderRadius', normalizeBorderRadius],

  ['fontSize', undefined],

  ['width', undefined],
  ['maxWidth', undefined],
  ['minWidth', undefined],

  ['height', undefined],
  ['maxHeight', undefined],
  ['minHeight', undefined],

  ['overflow', undefined],
  ['overflowY', undefined],
  ['overflowX', undefined],

  ['top', undefined],
  ['left', undefined],
  ['right', undefined],
  ['bottom', undefined],
  ['position', undefined],
];

function injectRule(
  styles: CSSObject,
  key: string,
  breakpoint: string,
  value: unknown,
  normalizer: undefined | RuleNormalizer,
): void {
  if (normalizer != null) value = normalizer(value);

  if (value != null) {
    let rules = styles[breakpoint];

    if (typeof rules != 'object') {
      rules = {};
      styles[breakpoint] = rules;
    }

    rules[key] = String(value);
  }
}

//
// Box
//

export interface BoxProps extends BoxRules {
  ref?: Ref<unknown>;
  as?: keyof JSX.IntrinsicElements;

  role?: string;
  children?: ReactNode;
}

export const Box: ForwardRefExoticComponent<BoxProps> = styled.div<BoxProps>(
  (props) => {
    const { breakpoints } = props.theme;
    const xs = breakpoints.up('xs');
    const sm = breakpoints.up('sm');
    const md = breakpoints.up('md');

    const styles: CSSObject = {
      margin: 0,
      padding: 0,
      borderWidth: 0,
      borderStyle: 'solid',
    };

    for (const [key, normalizer] of normalizers) {
      const prop = props[key];

      if (prop != null) {
        const [mobile, tablet, desktop] = parseResponsiveProp(prop);
        injectRule(styles, key, xs, mobile, normalizer);
        injectRule(styles, key, sm, tablet, normalizer);
        injectRule(styles, key, md, desktop, normalizer);
      }
    }

    return styles;
  },
);
