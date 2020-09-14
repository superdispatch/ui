import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { PhoneField } from '../../index';

it('checks component css', () => {
  expect(
    renderCSS(<PhoneField />, [
      'SD-PhoneField',
      'SD-PhoneFieldFlag',
      'SD-PhoneFieldMenu',
    ]),
  ).toMatchInlineSnapshot(`
    .SD-PhoneField-inputAdornedStart {
      margin-left: -8px;
      margin-right: 0;
    }

    .SD-PhoneField-selectButton {
      color: Color.Blue300;
      padding: 4px 4px 4px 8px;
      border-radius: 4px 0px 0px 4px;
    }

    .SD-PhoneField-selectButton:hover,
    .SD-PhoneField-selectButton:focus {
      background-color: Color.Blue50;
    }

    .SD-PhoneFieldFlag-root {
      min-width: 22px;
      min-height: 16px;
    }

    .SD-PhoneFieldMenu-paper {
      max-height: 240px;
    }
  `);
});
