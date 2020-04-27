import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { Stack } from '../Stack';

it('checks component css', () => {
  expect(
    renderCSS(
      <Stack space={1}>
        <div />
        <div />
      </Stack>,
      ['SuperDispatchStack'],
    ),
  ).toMatchInlineSnapshot(`
    .SuperDispatchStack-item:last-child {
      padding-bottom: 0;
    }

    .SuperDispatchStack-alignRight {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
    }

    .SuperDispatchStack-alignCenter {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .SuperDispatchStack-space1 {
      padding-bottom: 8px;
    }

    .SuperDispatchStack-space2 {
      padding-bottom: 16px;
    }

    .SuperDispatchStack-space3 {
      padding-bottom: 24px;
    }

    .SuperDispatchStack-space4 {
      padding-bottom: 32px;
    }

    .SuperDispatchStack-space5 {
      padding-bottom: 40px;
    }

    .SuperDispatchStack-space6 {
      padding-bottom: 48px;
    }

    .SuperDispatchStack-space7 {
      padding-bottom: 56px;
    }

    .SuperDispatchStack-space8 {
      padding-bottom: 64px;
    }

    .SuperDispatchStack-space9 {
      padding-bottom: 72px;
    }

    .SuperDispatchStack-space10 {
      padding-bottom: 80px;
    }
  `);
});
