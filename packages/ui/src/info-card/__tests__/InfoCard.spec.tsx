import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { InfoCard } from '../..';

it('checks component css', () => {
  expect(renderCSS(<InfoCard />, ['SuperDispatchInfoCard']))
    .toMatchInlineSnapshot(`
    .SuperDispatchInfoCard-content {
      padding: 16px;
    }

    @media (min-width: 600px) {
      .SuperDispatchInfoCard-sizeLarge > .SuperDispatchInfoCard-content {
        padding: 24px;
      }
    }
  `);
});
