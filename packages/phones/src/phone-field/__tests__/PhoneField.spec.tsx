import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { PhoneField } from '../PhoneField';

it('checks component css', () => {
  expect(
    renderCSS(<PhoneField />, [
      'SD-PhoneFieldFlag',
      'SD-PhoneFieldMenu',
      'SD-PhoneFieldStartAdornment',
    ]),
  ).toMatchInlineSnapshot(`
    .SD-PhoneFieldFlag-root {
      min-width: 22px;
      min-height: 16px;
    }

    .SD-PhoneFieldMenu-paper {
      max-height: 240px;
    }

    .SD-PhoneFieldStartAdornment-root {
      margin-left: -8px;
      margin-right: 0;
    }

    .SD-PhoneFieldStartAdornment-button {
      color: Color.Blue300;
      padding: 4px 4px 4px 8px;
      border-radius: 4px 0px 0px 4px;
    }

    .SD-PhoneFieldStartAdornment-button:hover,
    .SD-PhoneFieldStartAdornment-button:focus {
      background-color: Color.Blue50;
    }
  `);
});
