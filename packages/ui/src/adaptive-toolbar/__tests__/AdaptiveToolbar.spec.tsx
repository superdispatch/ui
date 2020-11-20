import { renderCSS } from '@superdispatch/ui-testutils';

import { AdaptiveToolbar } from '../AdaptiveToolbar';

it('checks component css', () => {
  expect(renderCSS(<AdaptiveToolbar items={[]} />, ['SD-AdaptiveToolbar']))
    .toMatchInlineSnapshot(`
    .SD-AdaptiveToolbar-actions {
      overflow: hidden;
    }
  `);
});
