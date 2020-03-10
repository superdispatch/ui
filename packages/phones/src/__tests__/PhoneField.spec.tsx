import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { PhoneField } from '../..';

it('checks component css', () => {
  expect(
    renderCSS(<PhoneField />, [
      'SuperDispatchPhoneField',
      'SuperDispatchPhoneFieldFlag',
      'SuperDispatchPhoneFieldMenu',
    ]),
  ).toMatchInlineSnapshot(`
    .SuperDispatchPhoneField-inputAdornedStart {
      margin-left: -8px;
      margin-right: 0;
    }

    .SuperDispatchPhoneField-selectButton {
      color: Color.Blue300;
      padding: 4px 4px 4px 8px;
      border-radius: 4px 0px 0px 4px;
    }

    .SuperDispatchPhoneField-selectButton:hover,
    .SuperDispatchPhoneField-selectButton:focus {
      background-color: Color.Blue50;
    }

    .SuperDispatchPhoneFieldFlag-root {
      min-width: 22px;
      min-height: 16px;
    }

    .SuperDispatchPhoneFieldMenu-paper {
      max-height: 240px;
    }
  `);
});
