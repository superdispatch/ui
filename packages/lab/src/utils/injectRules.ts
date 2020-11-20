import { SuperDispatchTheme } from '@superdispatch/ui';
import { CSSObject } from 'styled-components';

import {
  ResponsiveProp,
  ResponsivePropPrimitive,
  toResponsivePropTuple,
} from './ResponsiveProp';
import { RuleNormalizer, RuleNormalizerRecord } from './RuleNormalizer';

export function injectRule(
  styles: CSSObject,
  key: string,
  breakpoint: string,
  value: unknown,
  normalizer?: RuleNormalizer,
): void {
  if (normalizer != null) {
    value = normalizer(value);
  }

  if (value == null) {
    return;
  }

  let rules = styles[breakpoint];

  if (typeof rules != 'object') {
    rules = {};
    styles[breakpoint] = rules;
  }

  rules[key] = String(value);
}

export function injectRules<T extends string>(
  theme: SuperDispatchTheme,
  styles: CSSObject,
  props: Partial<Record<T, unknown>>,
  normalizers: RuleNormalizerRecord,
): void {
  const xs = theme.breakpoints.up('xs');
  const sm = theme.breakpoints.up('sm');
  const md = theme.breakpoints.up('md');

  for (const key in props) {
    if (!Object.prototype.hasOwnProperty.call(props, key)) {
      continue;
    }

    const prop = props[key];

    if (prop == null || !(key in normalizers)) {
      continue;
    }

    const [mobile, tablet, desktop] = toResponsivePropTuple(
      prop as ResponsiveProp<ResponsivePropPrimitive>,
    );

    const normalizer = normalizers[key];

    injectRule(styles, key, xs, mobile, normalizer);
    injectRule(styles, key, sm, tablet, normalizer);
    injectRule(styles, key, md, desktop, normalizer);
  }
}
