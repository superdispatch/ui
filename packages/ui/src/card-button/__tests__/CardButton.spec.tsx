import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { CardButton } from '../..';

it('checks component css', () => {
  expect(renderCSS(<CardButton />, ['SuperDispatchCardButton']))
    .toMatchInlineSnapshot(`
    .SuperDispatchCardButton-root {
      width: 100%;
      border: 1px dashed;
      display: flex;
      padding: 12px;
      min-height: 104px;
      transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      align-items: center;
      border-radius: 4px;
      flex-direction: column;
      justify-content: center;
    }

    .SuperDispatchCardButton-root.SuperDispatchCardButton-error {
      color: Color.Red300;
      border-color: Color.Red300;
      background-color: Color.Red50;
    }

    .SuperDispatchCardButton-root:not(.SuperDispatchCardButton-error) {
      color: Color.Blue300;
      border-color: Color.Silver500;
    }

    .SuperDispatchCardButton-root:not(.SuperDispatchCardButton-error):focus {
      background-color: Color.Blue50;
    }

    .SuperDispatchCardButton-root:not(.SuperDispatchCardButton-error):hover,
    .SuperDispatchCardButton-root:not(.SuperDispatchCardButton-error):active {
      border-color: Color.Blue300;
      background-color: Color.Blue50;
    }

    .SuperDispatchCardButton-root.SuperDispatchCardButton-error:focus {
      background-color: Color.Red75;
    }

    .SuperDispatchCardButton-sizeSmall {
      min-height: 48px;
    }

    .SuperDispatchCardButton-sizeLarge {
      min-height: 140px;
    }

    .SuperDispatchCardButton-label {
      display: flex;
      align-items: center;
    }

    .SuperDispatchCardButton-icon {
      display: flex;
    }

    .SuperDispatchCardButton-icon .MuiSvgIcon-root {
      font-size: 24px;
    }

    @media (min-width: 600px) {
      .SuperDispatchCardButton-icon .MuiSvgIcon-root {
        font-size: 20px;
      }
    }

    .SuperDispatchCardButton-startIcon {
      margin-left: -4px;
      margin-right: 8px;
    }

    .SuperDispatchCardButton-endIcon {
      margin-left: 8px;
      margin-right: -4px;
    }

    .SuperDispatchCardButton-hint {
      margin-top: 4px;
    }
  `);
});
