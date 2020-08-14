import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { AvatarButton } from '../AvatarButton';

it('checks component css', () => {
  expect(renderCSS(<AvatarButton />, ['SD-AvatarButton']))
    .toMatchInlineSnapshot(`
    .SD-AvatarButton-button {
      border-radius: 50%;
    }

    .SD-AvatarButton-button:not([disabled])[aria-busy='false']:hover.SD-AvatarButton-withIcon
      > .SD-AvatarButton-overlay,
    .SD-AvatarButton-button:not([disabled])[aria-busy='false']:focus.SD-AvatarButton-withIcon
      > .SD-AvatarButton-overlay {
      background-color: Color.Black50;
    }

    .SD-AvatarButton-button:not([disabled])[aria-busy='false']:hover:not(.SD-AvatarButton-withIcon)
      > .SD-AvatarButton-overlay,
    .SD-AvatarButton-button:not([disabled])[aria-busy='false']:focus:not(.SD-AvatarButton-withIcon)
      > .SD-AvatarButton-overlay {
      background-color: Color.Black20;
    }

    .SD-AvatarButton-button:not([disabled])[aria-busy='false']:hover.SD-AvatarButton-withIcon
      > .SD-AvatarButton-overlay
      > svg,
    .SD-AvatarButton-button:not([disabled])[aria-busy='false']:focus.SD-AvatarButton-withIcon
      > .SD-AvatarButton-overlay
      > svg {
      opacity: 1;
    }

    .SD-AvatarButton-button[disabled] > .SD-AvatarButton-overlay,
    .SD-AvatarButton-button[aria-busy='true'] > .SD-AvatarButton-overlay {
      background-color: Color.White50;
    }

    .SD-AvatarButton-overlay {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      position: absolute;
      transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      align-items: center;
      border-radius: 50%;
      justify-content: center;
      background-color: Color.Transparent;
    }

    .SD-AvatarButton-overlay > svg {
      color: Color.White;
      opacity: 0;
      font-size: 24px;
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    @media (min-width: 600px) {
      .SD-AvatarButton-overlay > svg {
        font-size: 16px;
      }
    }

    .SD-AvatarButton-progress {
      top: 0;
      left: 0;
      position: absolute;
      font-size: 40px;
    }

    @media (min-width: 600px) {
      .SD-AvatarButton-progress {
        font-size: 32px;
      }
    }

    .SD-AvatarButton-sizeLarge > .SD-AvatarButton-root {
      width: 56px;
      height: 56px;
      font-size: 24px;
      font-family: SF Pro Display;
      font-weight: 500;
      line-height: 28px;
    }

    .SD-AvatarButton-sizeLarge
      > .SD-AvatarButton-overlay
      > .SD-AvatarButton-progress {
      font-size: 56px;
    }

    .SD-AvatarButton-sizeLarge > .SD-AvatarButton-overlay > svg {
      font-size: 32px;
    }

    @media (min-width: 600px) {
      .SD-AvatarButton-sizeLarge > .SD-AvatarButton-overlay > svg {
        font-size: 24px;
      }
    }

    @media (min-width: 600px) {
      .SD-AvatarButton-sizeLarge
        > .SD-AvatarButton-overlay
        > .SD-AvatarButton-progress {
        font-size: 64px;
      }
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .SD-AvatarButton-sizeLarge > .SD-AvatarButton-root {
        font-size: 22px;
        line-height: 26px;
      }
    }

    @media (min-width: 600px) {
      .SD-AvatarButton-sizeLarge > .SD-AvatarButton-root {
        width: 64px;
        height: 64px;
      }
    }
  `);
});
