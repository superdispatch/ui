import { Menu, MenuItem } from '@material-ui/core';
import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

it('checks component css', () => {
  expect(
    renderCSS(
      <Menu open={true} anchorEl={document.body}>
        <MenuItem />
      </Menu>,
      ['MuiMenu', 'MuiMenuItem'],
    ),
  ).toMatchInlineSnapshot(`
    .MuiMenu-paper {
      max-height: calc(100% - 96px);
      -webkit-overflow-scrolling: touch;
    }

    .MuiMenu-list {
      outline: 0;
    }

    .MuiMenuItem-root {
      width: auto;
      overflow: hidden;
      font-size: 16px;
      box-sizing: border-box;
      min-height: 48px;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 24px;
      padding-top: 8px;
      white-space: nowrap;
      padding-bottom: 8px;
    }

    @media (min-width: 600px) {
      .MuiMenuItem-root {
        font-size: 14px;
        min-height: auto;
        line-height: 20px;
      }
    }

    .MuiMenuItem-dense {
      font-size: 0.875rem;
      min-height: auto;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 1.43;
    }
  `);
});
