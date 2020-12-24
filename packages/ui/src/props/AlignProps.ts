import { Property } from 'csstype';

export type VerticalAlign = 'top' | 'center' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';

export function parseAlignProp(
  align: VerticalAlign | HorizontalAlign,
): Property.AlignItems {
  switch (align) {
    case 'top':
    case 'left':
    default:
      return 'initial';

    case 'center':
      return 'center';

    case 'right':
    case 'bottom':
      return 'flex-end';
  }
}
