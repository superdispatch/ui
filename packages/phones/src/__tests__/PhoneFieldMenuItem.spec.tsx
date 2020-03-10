import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { PhoneFieldMenuItem } from '../PhoneFieldMenuItem';

it('checks component css', () => {
  expect(
    renderCSS(<PhoneFieldMenuItem regionCode="US" />, [
      'SuperDispatchPhoneFieldMenuItem',
    ]),
  ).toMatchInlineSnapshot(`
    .SuperDispatchPhoneFieldMenuItem-flag {
      margin-right: 8px;
    }
  `);
});
