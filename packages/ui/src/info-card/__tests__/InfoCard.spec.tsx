import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { InfoCard } from '../..';

it('checks component css', () => {
  expect(renderCSS(<InfoCard />, ['SD-InfoCard'])).toMatchInlineSnapshot(`
    .SD-InfoCard-content {
      padding: 16px;
    }

    @media (min-width: 600px) {
      .SD-InfoCard-sizeLarge > .SD-InfoCard-content {
        padding: 24px;
      }
    }
  `);
});
