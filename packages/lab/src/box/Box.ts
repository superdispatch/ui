import {
  Color,
  ColorProp,
  isColorProp,
  SuperDispatchTheme,
} from '@superdispatch/ui';
import { FC, ReactNode, Ref } from 'react';
import styled, { CSSObject, CSSProperties } from 'styled-components';

import {
  ResponsiveProp,
  toResponsivePropTuple,
} from '../responsive/ResponsiveProp';

function normalizeMapKey<T extends Map<unknown, unknown>>(
  map: T,
  key: unknown,
): string | undefined {
  const value = map.get(key);

  if (typeof value == 'number') {
    return `${value}px`;
  }

  if (typeof value == 'string') {
    return value;
  }

  return undefined;
}

//
// Colors
//

function normalizeColor(input: unknown): string | undefined {
  return isColorProp(input) ? Color[input] : undefined;
}

//
// Spaces
//

export type SpaceProp =
  | 'none'
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge';

const normalizeSpace = normalizeMapKey.bind(
  null,
  new Map<SpaceProp, number>([
    ['none', 0],
    ['xxsmall', 4],
    ['xsmall', 8],
    ['small', 16],
    ['medium', 24],
    ['large', 32],
    ['xlarge', 40],
    ['xxlarge', 48],
  ]),
);

//
// Borders
//

export type BorderRadiusProp = 'none' | 'small';
export type BorderWidthProp = 'none' | 'small' | 'large';

const normalizeBorderRadius = normalizeMapKey.bind(
  null,
  new Map<BorderRadiusProp, number>([
    ['none', 0],
    ['small', 4],
  ]),
);

const normalizeBorderWidth = normalizeMapKey.bind(
  null,
  new Map<BorderWidthProp, number>([
    ['none', 0],
    ['small', 1],
    ['large', 4],
  ]),
);

//
// Rules
//

interface BoxRules {
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

  margin?: ResponsiveProp<SpaceProp>;
  marginTop?: ResponsiveProp<SpaceProp>;
  marginLeft?: ResponsiveProp<SpaceProp>;
  marginRight?: ResponsiveProp<SpaceProp>;
  marginBottom?: ResponsiveProp<SpaceProp>;

  borderRadius?: ResponsiveProp<SpaceProp>;

  width?: CSSProperties['width'];
  maxWidth?: CSSProperties['maxWidth'];
  minWidth?: CSSProperties['minWidth'];

  height?: CSSProperties['height'];
  maxHeight?: CSSProperties['maxHeight'];
  minHeight?: CSSProperties['minHeight'];
}

type RuleNormalizer = (input: unknown) => string | undefined;

const normalizers = new Map<keyof BoxRules, undefined | RuleNormalizer>([
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

  ['margin', normalizeSpace],
  ['marginTop', normalizeSpace],
  ['marginLeft', normalizeSpace],
  ['marginRight', normalizeSpace],
  ['marginBottom', normalizeSpace],

  ['padding', normalizeSpace],
  ['paddingTop', normalizeSpace],
  ['paddingLeft', normalizeSpace],
  ['paddingRight', normalizeSpace],
  ['paddingBottom', normalizeSpace],

  ['borderRadius', normalizeBorderRadius],

  ['width', undefined],
  ['maxWidth', undefined],
  ['minWidth', undefined],

  ['height', undefined],
  ['maxHeight', undefined],
  ['minHeight', undefined],
]);

//
// Box
//

export interface BoxProps extends BoxRules {
  ref?: Ref<unknown>;
  as?: keyof JSX.IntrinsicElements;
  children?: ReactNode;
}

interface StyledBoxProps extends BoxRules {
  theme: SuperDispatchTheme;
}

function injectStyle(
  styles: CSSObject,
  key: keyof BoxRules,
  breakpoint: string,
  value: unknown,
): void {
  const normalize = normalizers.get(key);
  if (normalize != null) value = normalize(value);
  if (value == null) return;

  let rule = styles[breakpoint];

  if (typeof rule != 'object') {
    rule = {};
    styles[breakpoint] = rule;
  }

  rule[key] = String(value);
}

export const Box: FC<BoxProps> = styled.div<BoxProps>(
  (props: StyledBoxProps): CSSObject => {
    const xs = props.theme.breakpoints.up('xs');
    const sm = props.theme.breakpoints.up('sm');
    const md = props.theme.breakpoints.up('md');

    const styles: CSSObject = {
      borderWidth: '0',
      borderStyle: 'solid',
    };

    for (const k in props) {
      if (!Object.prototype.hasOwnProperty.call(props, k)) continue;

      const key = k as keyof BoxRules;
      const prop = props[key];

      if (prop == null || !normalizers.has(key)) continue;
      const [mobile, tablet, desktop] = toResponsivePropTuple(prop);

      injectStyle(styles, key, xs, mobile);
      injectStyle(styles, key, sm, tablet);
      injectStyle(styles, key, md, desktop);
    }

    return styles;
  },
);
