import { HorizontalAlign, VerticalAlign } from '@superdispatch/ui';
import { Property } from 'csstype';

export function normalizeAlignProp(
  align: VerticalAlign | HorizontalAlign,
): Property.AlignItems {
  switch (align) {
    case 'top':
    case 'left':
      return 'flex-start';

    case 'center':
      return 'center';

    case 'right':
    case 'bottom':
      return 'flex-end';
  }
}
