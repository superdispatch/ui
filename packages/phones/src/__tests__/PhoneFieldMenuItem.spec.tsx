import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { PhoneFieldMenuItem } from '../phone-field/PhoneFieldMenuItem';

it('checks component css', () => {
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
