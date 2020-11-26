import { CSSObject } from 'styled-components';

export function mergeStyles(
  styles: CSSObject,
  ...sources: Array<null | false | undefined | CSSObject>
): CSSObject {
  for (const source of sources) {
    if (typeof source != 'object' || source == null) continue;
    for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

      const stylesValue = styles[key];
      const sourceValue = source[key];

      if (typeof stylesValue == 'object' && typeof sourceValue == 'object') {
        mergeStyles(stylesValue, sourceValue);
      } else {
        styles[key] = source[key];
      }
    }
  }

  return styles;
}
