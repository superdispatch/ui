import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { AvatarButton } from '../AvatarButton';

it('checks component css', () => {
  expect(renderCSS(<AvatarButton />, ['SuperDispatchAvatarButton']))
    .toMatchInlineSnapshot(`
    .SuperDispatchAvatarButton-button {
      border-radius: 50%;
    }

    .SuperDispatchAvatarButton-button[aria-busy='false'][aria-disabled='false']:hover.SuperDispatchAvatarButton-withIcon
      > .SuperDispatchAvatarButton-overlay,
    .SuperDispatchAvatarButton-button[aria-busy='false'][aria-disabled='false']:focus.SuperDispatchAvatarButton-withIcon
      > .SuperDispatchAvatarButton-overlay {
      background-color: Color.Black50;
    }

    .SuperDispatchAvatarButton-button[aria-busy='false'][aria-disabled='false']:hover:not(.SuperDispatchAvatarButton-withIcon)
      > .SuperDispatchAvatarButton-overlay,
    .SuperDispatchAvatarButton-button[aria-busy='false'][aria-disabled='false']:focus:not(.SuperDispatchAvatarButton-withIcon)
      > .SuperDispatchAvatarButton-overlay {
      background-color: Color.Black20;
    }

    .SuperDispatchAvatarButton-button[aria-busy='false'][aria-disabled='false']:hover.SuperDispatchAvatarButton-withIcon
      > .SuperDispatchAvatarButton-overlay
      > svg,
    .SuperDispatchAvatarButton-button[aria-busy='false'][aria-disabled='false']:focus.SuperDispatchAvatarButton-withIcon
      > .SuperDispatchAvatarButton-overlay
      > svg {
      opacity: 1;
    }

    .SuperDispatchAvatarButton-button[aria-disabled='true']
      > .SuperDispatchAvatarButton-overlay,
    .SuperDispatchAvatarButton-button[aria-busy='true']
      > .SuperDispatchAvatarButton-overlay {
      background-color: Color.White50;
    }

    .SuperDispatchAvatarButton-overlay {
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

    .SuperDispatchAvatarButton-overlay > svg {
      color: Color.White;
      opacity: 0;
      font-size: 24px;
      transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    @media (min-width: 600px) {
      .SuperDispatchAvatarButton-overlay > svg {
        font-size: 16px;
      }
    }

    .SuperDispatchAvatarButton-progress {
      top: 0;
      left: 0;
      position: absolute;
      font-size: 40px;
    }

    @media (min-width: 600px) {
      .SuperDispatchAvatarButton-progress {
        font-size: 32px;
      }
    }

    .SuperDispatchAvatarButton-sizeLarge > .SuperDispatchAvatarButton-root {
      width: 56px;
      height: 56px;
      font-size: 24px;
      font-family: SF Pro Display;
      font-weight: 500;
      line-height: 28px;
    }

    .SuperDispatchAvatarButton-sizeLarge
      > .SuperDispatchAvatarButton-overlay
      > .SuperDispatchAvatarButton-progress {
      font-size: 56px;
    }

    .SuperDispatchAvatarButton-sizeLarge
      > .SuperDispatchAvatarButton-overlay
      > svg {
      font-size: 32px;
    }

    @media (min-width: 600px) {
      .SuperDispatchAvatarButton-sizeLarge
        > .SuperDispatchAvatarButton-overlay
        > svg {
        font-size: 24px;
      }
    }

    @media (min-width: 600px) {
      .SuperDispatchAvatarButton-sizeLarge
        > .SuperDispatchAvatarButton-overlay
        > .SuperDispatchAvatarButton-progress {
        font-size: 64px;
      }
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .SuperDispatchAvatarButton-sizeLarge > .SuperDispatchAvatarButton-root {
        font-size: 22px;
        line-height: 26px;
      }
    }

    @media (min-width: 600px) {
      .SuperDispatchAvatarButton-sizeLarge > .SuperDispatchAvatarButton-root {
        width: 64px;
        height: 64px;
      }
    }
  `);
});
