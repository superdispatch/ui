import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

import { AdaptiveToolbar } from '../AdaptiveToolbar';

it('checks component css', () => {
  expect(
    renderCSS(<AdaptiveToolbar items={[]} />, ['SuperDispatchAdaptiveToolbar']),
  ).toMatchInlineSnapshot(`
    .SuperDispatchAdaptiveToolbar-actions {
      overflow: hidden;
    }
  `);
});
