import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

import { Button } from '../..';

it('checks component css', () => {
  const css = renderCSS(
    <Button variant="text" color="primary">
      Text
    </Button>,
    ['MuiButton'],
  );

  expect(css).toMatchInlineSnapshot(`
    .MuiButton-root {
      padding: 6px 16px;
      font-size: 14px;
      min-width: 48px;
      box-sizing: border-box;
      transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 20px;
      border-radius: 4px;
    }

    .MuiButton-root:hover {
      text-decoration: none;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiButton-root {
        padding: 10px 24px;
        font-size: 16px;
        line-height: 24px;
      }
    }

    .MuiButton-root[aria-busy='true'] .MuiButton-label {
      visibility: hidden;
    }

    .MuiButton-root[aria-busy='true'] .MuiButton-label > [role='progressbar'] {
      top: calc(50% - 8px);
      left: calc(50% - 8px);
      position: absolute;
      font-size: 16px;
      visibility: visible;
    }

    .MuiButton-sizeLarge
      .MuiButton-root[aria-busy='true']
      .MuiButton-label
      > [role='progressbar'] {
      top: calc(50% - 12px);
      left: calc(50% - 12px);
      font-size: 24px;
    }

    .MuiButton-label {
      width: 100%;
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
    }

    .MuiButton-label > svg {
      font-size: 20px;
    }

    .MuiButton-sizeLarge .MuiButton-label > svg {
      font-size: 24px;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiButton-label > svg {
        font-size: 24px;
      }
    }

    .MuiButton-text[data-color='error'] {
      color: Color.Red300;
      box-shadow: 0 0 0 0 Color.Red100;
    }

    .MuiButton-text[data-color='success'] {
      color: Color.Green300;
      box-shadow: 0 0 0 0 Color.Green100;
    }

    .MuiButton-text[data-color='primary'] {
      color: Color.Blue300;
      box-shadow: 0 0 0 0 Color.Blue100;
    }

    .MuiButton-text[data-color='white'] {
      color: Color.White;
      box-shadow: 0 0 0 0 Color.White50;
    }

    .MuiButton-text[data-color='white'][aria-busy='true'] {
      color: Color.White50;
    }

    .MuiButton-text[data-color='white'].Mui-disabled:not([aria-busy='true']) {
      color: Color.White50;
    }

    .MuiButton-text[data-color='white']:not(.Mui-disabled):hover,
    .MuiButton-text[data-color='white']:not(.Mui-disabled):active,
    .MuiButton-text[data-color='white']:not(.Mui-disabled)[aria-expanded='true'] {
      background-color: Color.White10;
    }

    .MuiButton-text[data-color='white']:not(.Mui-disabled):focus {
      box-shadow: 0 0 0 2px Color.White50;
      background-color: Color.White10;
    }

    .MuiButton-text[data-color='primary'][aria-busy='true'] {
      color: Color.Blue200;
    }

    .MuiButton-text[data-color='primary'].Mui-disabled:not([aria-busy='true']) {
      color: Color.Blue100;
    }

    .MuiButton-text[data-color='primary']:not(.Mui-disabled):hover,
    .MuiButton-text[data-color='primary']:not(.Mui-disabled):active,
    .MuiButton-text[data-color='primary']:not(.Mui-disabled)[aria-expanded='true'] {
      background-color: Color.Blue50;
    }

    .MuiButton-text[data-color='primary']:not(.Mui-disabled):focus {
      box-shadow: 0 0 0 2px Color.Blue100;
      background-color: Color.Blue50;
    }

    .MuiButton-text[data-color='success'][aria-busy='true'] {
      color: Color.Green200;
    }

    .MuiButton-text[data-color='success'].Mui-disabled:not([aria-busy='true']) {
      color: Color.Green100;
    }

    .MuiButton-text[data-color='success']:not(.Mui-disabled):hover,
    .MuiButton-text[data-color='success']:not(.Mui-disabled):active,
    .MuiButton-text[data-color='success']:not(.Mui-disabled)[aria-expanded='true'] {
      background-color: Color.Green50;
    }

    .MuiButton-text[data-color='success']:not(.Mui-disabled):focus {
      box-shadow: 0 0 0 2px Color.Green100;
      background-color: Color.Green50;
    }

    .MuiButton-text[data-color='error'][aria-busy='true'] {
      color: Color.Red200;
    }

    .MuiButton-text[data-color='error'].Mui-disabled:not([aria-busy='true']) {
      color: Color.Red100;
    }

    .MuiButton-text[data-color='error']:not(.Mui-disabled):hover,
    .MuiButton-text[data-color='error']:not(.Mui-disabled):active,
    .MuiButton-text[data-color='error']:not(.Mui-disabled)[aria-expanded='true'] {
      background-color: Color.Red50;
    }

    .MuiButton-text[data-color='error']:not(.Mui-disabled):focus {
      box-shadow: 0 0 0 2px Color.Red100;
      background-color: Color.Red50;
    }

    .MuiButton-textPrimary {
      color: Color.Blue300;
    }

    .MuiButton-textPrimary:hover {
      background-color: rgba(0, 117, 255, 0.08);
    }

    @media (hover: none) {
      .MuiButton-textPrimary:hover {
        background-color: transparent;
      }
    }

    .MuiButton-textSecondary {
      color: #f50057;
    }

    .MuiButton-textSecondary:hover {
      background-color: rgba(245, 0, 87, 0.08);
    }

    @media (hover: none) {
      .MuiButton-textSecondary:hover {
        background-color: transparent;
      }
    }

    .MuiButton-outlined[data-color='error'] {
      color: Color.Red300;
      box-shadow: inset 0 0 0 1px Color.Red300, 0 0 0 0 Color.Red100;
      background-color: Color.White;
    }

    .MuiButton-outlined[data-color='success'] {
      color: Color.Green300;
      box-shadow: inset 0 0 0 1px Color.Green300, 0 0 0 0 Color.Green100;
      background-color: Color.White;
    }

    .MuiButton-outlined[data-color='primary'] {
      color: Color.Grey500;
      box-shadow: inset 0 0 0 1px Color.Silver500, 0 0 0 0 Color.Blue100;
      background-color: Color.White;
    }

    .MuiButton-outlined[data-color='white'] {
      color: Color.White;
      box-shadow: inset 0 0 0 1px Color.White50, 0 0 0 0 Color.White40;
      background-color: Color.Transparent;
    }

    .MuiButton-outlined[data-color='white'][aria-busy='true'] {
      color: Color.White50;
      box-shadow: inset 0 0 0 1px Color.White40, 0 0 0 0 Color.White40;
    }

    .MuiButton-outlined[data-color='white'].Mui-disabled:not([aria-busy='true']) {
      color: Color.White50;
      box-shadow: inset 0 0 0 1px Color.White40, 0 0 0 0 Color.White40;
    }

    .MuiButton-outlined[data-color='white']:not(.Mui-disabled):hover,
    .MuiButton-outlined[data-color='white']:not(.Mui-disabled):active,
    .MuiButton-outlined[data-color='white']:not(.Mui-disabled)[aria-expanded='true'] {
      color: Color.White;
      box-shadow: inset 0 0 0 1px Color.White50, 0 0 0 0 Color.White40;
      background-color: Color.White10;
    }

    .MuiButton-outlined[data-color='white']:not(.Mui-disabled):focus {
      box-shadow: inset 0 0 0 1px Color.White50, 0 0 0 2px Color.White40;
    }

    .MuiButton-outlined[data-color='primary'][aria-busy='true'] {
      color: Color.Grey200;
      box-shadow: inset 0 0 0 1px Color.Silver400, 0 0 0 0 Color.Blue100;
    }

    .MuiButton-outlined[data-color='primary'].Mui-disabled:not([aria-busy='true']) {
      color: Color.Silver500;
      box-shadow: inset 0 0 0 1px Color.Silver400, 0 0 0 0 Color.Blue100;
    }

    .MuiButton-outlined[data-color='primary']:not(.Mui-disabled):hover,
    .MuiButton-outlined[data-color='primary']:not(.Mui-disabled):active,
    .MuiButton-outlined[data-color='primary']:not(.Mui-disabled)[aria-expanded='true'] {
      color: Color.Blue300;
      box-shadow: inset 0 0 0 1px Color.Blue300, 0 0 0 0 Color.Blue100;
      background-color: Color.Blue50;
    }

    .MuiButton-outlined[data-color='primary']:not(.Mui-disabled):focus {
      box-shadow: inset 0 0 0 1px Color.Blue300, 0 0 0 2px Color.Blue100;
    }

    .MuiButton-outlined[data-color='success'][aria-busy='true'] {
      color: Color.Green300;
      box-shadow: inset 0 0 0 1px Color.Green100, 0 0 0 0 Color.Green100;
    }

    .MuiButton-outlined[data-color='success'].Mui-disabled:not([aria-busy='true']) {
      color: Color.Green100;
      box-shadow: inset 0 0 0 1px Color.Green100, 0 0 0 0 Color.Green100;
    }

    .MuiButton-outlined[data-color='success']:not(.Mui-disabled):hover,
    .MuiButton-outlined[data-color='success']:not(.Mui-disabled):active,
    .MuiButton-outlined[data-color='success']:not(.Mui-disabled)[aria-expanded='true'] {
      color: Color.Green300;
      box-shadow: inset 0 0 0 1px Color.Green300, 0 0 0 0 Color.Green100;
      background-color: Color.Green50;
    }

    .MuiButton-outlined[data-color='success']:not(.Mui-disabled):focus {
      box-shadow: inset 0 0 0 1px Color.Green300, 0 0 0 2px Color.Green100;
    }

    .MuiButton-outlined[data-color='error'][aria-busy='true'] {
      color: Color.Red300;
      box-shadow: inset 0 0 0 1px Color.Red100, 0 0 0 0 Color.Red100;
    }

    .MuiButton-outlined[data-color='error'].Mui-disabled:not([aria-busy='true']) {
      color: Color.Red100;
      box-shadow: inset 0 0 0 1px Color.Red100, 0 0 0 0 Color.Red100;
    }

    .MuiButton-outlined[data-color='error']:not(.Mui-disabled):hover,
    .MuiButton-outlined[data-color='error']:not(.Mui-disabled):active,
    .MuiButton-outlined[data-color='error']:not(.Mui-disabled)[aria-expanded='true'] {
      color: Color.Red300;
      box-shadow: inset 0 0 0 1px Color.Red300, 0 0 0 0 Color.Red100;
      background-color: Color.Red50;
    }

    .MuiButton-outlined[data-color='error']:not(.Mui-disabled):focus {
      box-shadow: inset 0 0 0 1px Color.Red300, 0 0 0 2px Color.Red100;
    }

    .MuiButton-outlinedPrimary {
      color: Color.Blue300;
    }

    @media (hover: none) {
      .MuiButton-outlinedPrimary:hover {
        background-color: transparent;
      }
    }

    .MuiButton-outlinedSecondary {
      color: #f50057;
      border: 1px solid rgba(245, 0, 87, 0.5);
    }

    .MuiButton-outlinedSecondary:hover {
      border: 1px solid #f50057;
      background-color: rgba(245, 0, 87, 0.08);
    }

    .MuiButton-outlinedSecondary.Mui-disabled {
      border: 1px solid Color.Silver400;
    }

    @media (hover: none) {
      .MuiButton-outlinedSecondary:hover {
        background-color: transparent;
      }
    }

    .MuiButton-contained {
      color: rgba(0, 0, 0, 0.87);
    }

    .MuiButton-contained[data-color='error'] {
      color: Color.White;
      background-color: Color.Red300;
    }

    .MuiButton-contained[data-color='success'] {
      color: Color.White;
      background-color: Color.Green300;
    }

    .MuiButton-contained[data-color='primary'] {
      color: Color.White;
      background-color: Color.Blue300;
    }

    .MuiButton-contained[data-color='white'] {
      color: Color.White;
      background-color: Color.White20;
    }

    .MuiButton-contained[data-color='white'].Mui-disabled {
      color: Color.White50;
      background-color: Color.White08;
    }

    .MuiButton-contained[data-color='white']:not(.Mui-disabled):focus {
      box-shadow: 0 0 0 3px Color.White40;
    }

    .MuiButton-contained[data-color='white']:not(.Mui-disabled):hover,
    .MuiButton-contained[data-color='white']:not(.Mui-disabled):active,
    .MuiButton-contained[data-color='white']:not(.Mui-disabled)[aria-expanded='true'] {
      background-color: Color.White40;
    }

    .MuiButton-contained[data-color='primary'].Mui-disabled {
      color: Color.White;
      background-color: Color.Blue100;
    }

    .MuiButton-contained[data-color='primary']:not(.Mui-disabled):focus {
      box-shadow: 0 0 0 3px Color.Blue100;
    }

    .MuiButton-contained[data-color='primary']:not(.Mui-disabled):hover,
    .MuiButton-contained[data-color='primary']:not(.Mui-disabled):active,
    .MuiButton-contained[data-color='primary']:not(.Mui-disabled)[aria-expanded='true'] {
      background-color: Color.Blue500;
    }

    .MuiButton-contained[data-color='success'].Mui-disabled {
      color: Color.White;
      background-color: Color.Green100;
    }

    .MuiButton-contained[data-color='success']:not(.Mui-disabled):focus {
      box-shadow: 0 0 0 3px Color.Green100;
    }

    .MuiButton-contained[data-color='success']:not(.Mui-disabled):hover,
    .MuiButton-contained[data-color='success']:not(.Mui-disabled):active,
    .MuiButton-contained[data-color='success']:not(.Mui-disabled)[aria-expanded='true'] {
      background-color: Color.Green500;
    }

    .MuiButton-contained[data-color='error'].Mui-disabled {
      color: Color.White;
      background-color: Color.Red100;
    }

    .MuiButton-contained[data-color='error']:not(.Mui-disabled):focus {
      box-shadow: 0 0 0 3px Color.Red100;
    }

    .MuiButton-contained[data-color='error']:not(.Mui-disabled):hover,
    .MuiButton-contained[data-color='error']:not(.Mui-disabled):active,
    .MuiButton-contained[data-color='error']:not(.Mui-disabled)[aria-expanded='true'] {
      background-color: Color.Red500;
    }

    .MuiButton-containedPrimary {
      color: Color.White;
      background-color: Color.Blue300;
    }

    .MuiButton-containedPrimary:hover {
      background-color: rgb(0, 81, 178);
    }

    @media (hover: none) {
      .MuiButton-containedPrimary:hover {
        background-color: Color.Blue300;
      }
    }

    .MuiButton-containedSecondary {
      color: Color.White;
      background-color: #f50057;
    }

    .MuiButton-containedSecondary:hover {
      background-color: #c51162;
    }

    @media (hover: none) {
      .MuiButton-containedSecondary:hover {
        background-color: #f50057;
      }
    }

    .MuiButton-disableElevation {
      box-shadow: none;
    }

    .MuiButton-disableElevation:hover {
      box-shadow: none;
    }

    .MuiButton-disableElevation.Mui-focusVisible {
      box-shadow: none;
    }

    .MuiButton-disableElevation:active {
      box-shadow: none;
    }

    .MuiButton-disableElevation.Mui-disabled {
      box-shadow: none;
    }

    .MuiButton-colorInherit {
      color: inherit;
      border-color: currentColor;
    }

    .MuiButton-sizeSmall {
      padding: 2px 16px;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiButton-sizeSmall {
        padding: 4px 24px;
      }
    }

    .MuiButton-sizeLarge {
      padding: 10px 40px;
      font-size: 16px;
      line-height: 24px;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiButton-sizeLarge {
        padding: 16px 64px;
      }
    }

    .MuiButton-fullWidth {
      width: 100%;
    }

    .MuiButton-startIcon {
      display: inherit;
      margin-left: -4px;
      margin-right: 8px;
    }

    .MuiButton-startIcon.MuiButton-iconSizeSmall {
      margin-left: -2px;
    }

    .MuiButton-endIcon {
      display: inherit;
      margin-left: 8px;
      margin-right: -4px;
    }

    .MuiButton-endIcon.MuiButton-iconSizeSmall {
      margin-right: -2px;
    }

    .MuiButton-iconSizeSmall > *:first-child {
      font-size: 18px;
    }

    .MuiButton-iconSizeMedium > *:first-child {
      font-size: 20px;
    }

    .MuiButton-iconSizeLarge > *:first-child {
      font-size: 22px;
    }
  `);
});
