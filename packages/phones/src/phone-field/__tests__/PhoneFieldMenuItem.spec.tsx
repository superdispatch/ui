import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { PhoneFieldMenuItem } from '../PhoneFieldMenuItem';

test('css', () => {
  expect(
    renderCSS(<PhoneFieldMenuItem regionCode="US" />, [
      'SD-PhoneFieldMenuItem',
    ]),
  ).toMatchInlineSnapshot(`
    .SD-PhoneFieldMenuItem-flag {
      margin-right: 8px;
    }
  `);
});
