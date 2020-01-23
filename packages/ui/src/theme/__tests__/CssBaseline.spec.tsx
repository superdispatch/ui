import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

it('checks component css', () => {
  expect(renderCSS(<div />, ['MuiCssBaseline'])).toMatchInlineSnapshot(`
    html {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    strong,
    b {
      font-weight: bolder;
    }

    body {
      color: Color.Grey500;
      margin: 0;
      font-size: 14px;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 20px;
      background-color: #fafafa;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      body {
        font-size: 16px;
        line-height: 24px;
      }
    }

    @media print {
      body {
        background-color: Color.White;
      }
    }

    body::backdrop {
      background-color: #fafafa;
    }
  `);
});
