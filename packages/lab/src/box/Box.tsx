import { Color, ColorProp, isColorProp } from '@superdispatch/ui';
import { ForwardRefExoticComponent, ReactNode, Ref } from 'react';
import { CSSObject } from 'styled-components';

import { styled } from '../styled';
import { injectRules } from '../utils/injectRules';
import { ResponsiveProp } from '../utils/ResponsiveProp';
import {
  createRuleNormalizer,
  RuleNormalizerRecord,
} from '../utils/RuleNormalizer';
import { normalizeSpace, SpaceProp } from '../utils/SpaceProp';

//
// Colors
//

function normalizeColor(input: unknown): string | undefined {
  return isColorProp(input) ? Color[input] : undefined;
}

//
// Borders
//

export type BorderRadiusProp = 'none' | 'small';
const normalizeBorderRadius = createRuleNormalizer<BorderRadiusProp>({
  none: 0,
  small: 4,
});

export type BorderWidthProp = 'none' | 'small' | 'large';
const normalizeBorderWidth = createRuleNormalizer<BorderWidthProp>({
  none: 0,
  small: 1,
  large: 4,
});

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

  width?: string;
  maxWidth?: string;
  minWidth?: string;

  height?: string;
  maxHeight?: string;
  minHeight?: string;
}

const normalizers: RuleNormalizerRecord = {
  color: normalizeColor,
  backgroundColor: normalizeColor,

  borderColor: normalizeColor,
  borderTopColor: normalizeColor,
  borderLeftColor: normalizeColor,
  borderRightColor: normalizeColor,
  borderBottomColor: normalizeColor,

  borderWidth: normalizeBorderWidth,
  borderTopWidth: normalizeBorderWidth,
  borderLeftWidth: normalizeBorderWidth,
  borderRightWidth: normalizeBorderWidth,
  borderBottomWidth: normalizeBorderWidth,

  margin: normalizeSpace,
  marginTop: normalizeSpace,
  marginLeft: normalizeSpace,
  marginRight: normalizeSpace,
  marginBottom: normalizeSpace,

  padding: normalizeSpace,
  paddingTop: normalizeSpace,
  paddingLeft: normalizeSpace,
  paddingRight: normalizeSpace,
  paddingBottom: normalizeSpace,

  borderRadius: normalizeBorderRadius,

  width: undefined,
  maxWidth: undefined,
  minWidth: undefined,

  height: undefined,
  maxHeight: undefined,
  minHeight: undefined,
};

//
// Box
//

export interface BoxProps extends BoxRules {
  ref?: Ref<unknown>;
  children?: ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

export const Box: ForwardRefExoticComponent<BoxProps> = styled.div<BoxProps>(
  (props) => {
    const styles: CSSObject = {
      borderWidth: '0',
      borderStyle: 'solid',
    };

    injectRules(props.theme, styles, props, normalizers);

    return styles;
  },
);
