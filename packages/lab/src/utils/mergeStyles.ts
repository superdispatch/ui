import { CSSObject } from 'styled-components';

export function mergeStyles(styles: CSSObject, sourceStyles: CSSObject): void {
  for (const key in sourceStyles) {
    if (!Object.prototype.hasOwnProperty.call(sourceStyles, key)) {
      continue;
    }

    const stylesValue = styles[key];
    const sourceValue = sourceStyles[key];

    if (typeof stylesValue == 'object' && typeof sourceValue == 'object') {
      mergeStyles(stylesValue, sourceValue);
    } else {
      styles[key] = sourceStyles[key];
    }
  }
}
