import { HorizontalAlign } from '@superdispatch/ui';
import { Property } from 'csstype';

export function normalizeHorizontalAlignProp(
  align: HorizontalAlign,
): Property.AlignItems {
  switch (align) {
    case 'left':
      return 'flex-start';

    case 'center':
      return 'center';

    case 'right':
      return 'flex-end';
  }
}
