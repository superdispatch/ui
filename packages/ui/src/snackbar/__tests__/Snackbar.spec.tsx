import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

import { Snackbar } from '../../index';

it('checks component css', () => {
  expect(
    renderCSS(<Snackbar open={true} />, [
      'MuiSnackbar',
      'MuiSnackbarContent',
      'SuperDispatchSnackbarContent',
      'SuperDispatchSnackbarStack',
    ]),
  ).toMatchInlineSnapshot(`
    .MuiSnackbar-root {
      left: 8px;
      right: 8px;
      display: flex;
      z-index: 1400;
      position: fixed;
      align-items: center;
      justify-content: center;
    }

    .MuiSnackbar-anchorOriginTopCenter {
      top: 8px;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginTopCenter {
        top: 24px;
        left: 50%;
        right: auto;
        transform: translateX(-50%);
      }
    }

    .MuiSnackbar-anchorOriginBottomCenter {
      left: 0;
      right: 0;
      bottom: 0;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginBottomCenter {
        left: 50%;
        right: auto;
        bottom: 24px;
        transform: translateX(-50%);
      }
    }

    .MuiSnackbar-anchorOriginTopRight {
      top: 8px;
      justify-content: flex-end;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginTopRight {
        top: 24px;
        left: auto;
        right: 24px;
      }
    }

    .MuiSnackbar-anchorOriginBottomRight {
      bottom: 8px;
      justify-content: flex-end;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginBottomRight {
        left: auto;
        right: 24px;
        bottom: 24px;
      }
    }

    .MuiSnackbar-anchorOriginTopLeft {
      top: 8px;
      justify-content: flex-start;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginTopLeft {
        top: 24px;
        left: 24px;
        right: auto;
      }
    }

    .MuiSnackbar-anchorOriginBottomLeft {
      bottom: 8px;
      justify-content: flex-start;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginBottomLeft {
        left: 24px;
        right: auto;
        bottom: 24px;
      }
    }

    .MuiSnackbarContent-root {
      color: Color.White;
      width: 100%;
      display: flex;
      padding: 6px 16px;
      flex-grow: 1;
      flex-wrap: wrap;
      font-size: 0.875rem;
      min-height: 60px;
      align-items: center;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 1.43;
      border-radius: 0;
      background-color: rgb(49, 49, 49);
    }

    @media (min-width: 600px) {
      .MuiSnackbarContent-root {
        width: 432px;
        flex-grow: initial;
        max-width: 432px;
        min-width: 288px;
        border-radius: 4px;
      }
    }

    .MuiSnackbarContent-message {
      flex: 1;
      display: flex;
      padding: 8px 0;
    }

    .MuiSnackbarContent-action {
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-right: -8px;
      padding-left: 16px;
    }

    .SuperDispatchSnackbarContent-root {
      color: Color.White;
      background-color: Color.Grey500;
    }

    .SuperDispatchSnackbarContent-root.SuperDispatchSnackbarContent-variantError {
      color: Color.White;
      background-color: Color.Red500;
    }

    .SuperDispatchSnackbarContent-action {
      padding-left: 8px;
    }

    .SuperDispatchSnackbarContent-message {
      align-items: center;
    }

    @media (max-width: 599.95px) {
      .SuperDispatchSnackbarContent-message {
        font-size: 16px;
      }
    }

    .SuperDispatchSnackbarContent-icon {
      font-size: 24px;
      margin-right: 8px;
    }

    .SuperDispatchSnackbarContent-closeButton {
      color: Color.White40;
    }

    .SuperDispatchSnackbarContent-closeButton:hover,
    .SuperDispatchSnackbarContent-closeButton:focus {
      color: Color.White40;
      background-color: Color.White08;
    }

    .SuperDispatchSnackbarStack-root {
      width: 100%;
    }
  `);
});
