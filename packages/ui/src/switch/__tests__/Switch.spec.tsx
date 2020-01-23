import { Switch } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiSwitch).toMatchInlineSnapshot(`
    Object {
      color: primary,
      disableFocusRipple: true,
      disableRipple: true,
    }
  `);
});

it('checks component css', () => {
  expect(renderCSS(<Switch />, ['MuiSwitch'])).toMatchInlineSnapshot(`
    .MuiSwitch-root {
      width: 76px;
      height: 44px;
      display: inline-flex;
      padding: 6px 12px;
      z-index: 0;
      overflow: hidden;
      position: relative;
      box-sizing: border-box;
      flex-shrink: 0;
      vertical-align: middle;
    }

    @media (min-width: 600px) {
      .MuiSwitch-root {
        width: 64px;
        height: 32px;
        padding: 4px 12px;
      }
    }

    .MuiSwitch-edgeStart {
      margin-left: -8px;
    }

    .MuiSwitch-edgeEnd {
      margin-right: -8px;
    }

    .MuiSwitch-switchBase {
      top: 0;
      left: 8px;
      color: #fafafa;
      padding: 10px 8px;
      z-index: 1;
      position: absolute;
      transition: left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .MuiSwitch-switchBase.Mui-checked {
      transform: translateX(20px);
    }

    .MuiSwitch-switchBase.Mui-disabled {
      color: #bdbdbd;
    }

    @media (min-width: 600px) {
      .MuiSwitch-switchBase {
        padding: 8px;
      }
    }

    @media (min-width: 600px) {
      .MuiSwitch-switchBase.Mui-checked {
        transform: translateX(16px);
      }
    }

    .MuiSwitch-colorPrimary.Mui-disabled {
      color: #bdbdbd;
    }

    .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track {
      background-color: Color.Blue300;
    }

    .MuiSwitch-colorPrimary.Mui-disabled + .MuiSwitch-track {
      background-color: Color.Silver300;
    }

    .MuiSwitch-colorPrimary + .MuiSwitch-track {
      background-color: Color.Silver500;
    }

    .MuiSwitch-colorPrimary.Mui-checked.Mui-disabled + .MuiSwitch-track {
      background-color: Color.Blue100;
    }

    .MuiSwitch-colorPrimary:hover + .MuiSwitch-track {
      background-color: Color.Grey100;
    }

    .MuiSwitch-colorPrimary.Mui-focusVisible + .MuiSwitch-track {
      box-shadow: 0 0 0 3px Color.Blue100;
    }

    @media (hover: none) {
      .MuiSwitch-colorPrimary.Mui-checked:hover {
        background-color: transparent;
      }
    }

    .MuiSwitch-colorPrimary.Mui-checked:hover + .MuiSwitch-track {
      background-color: Color.Blue400;
    }

    .MuiSwitch-colorSecondary.Mui-checked {
      color: #f50057;
    }

    .MuiSwitch-colorSecondary.Mui-disabled {
      color: #bdbdbd;
    }

    .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track {
      background-color: #f50057;
    }

    .MuiSwitch-colorSecondary.Mui-disabled + .MuiSwitch-track {
      background-color: #000;
    }

    .MuiSwitch-colorSecondary.Mui-checked:hover {
      background-color: rgba(245, 0, 87, 0.08);
    }

    @media (hover: none) {
      .MuiSwitch-colorSecondary.Mui-checked:hover {
        background-color: transparent;
      }
    }

    .MuiSwitch-sizeSmall {
      width: 40px;
      height: 24px;
      padding: 7px;
    }

    .MuiSwitch-sizeSmall .MuiSwitch-thumb {
      width: 16px;
      height: 16px;
    }

    .MuiSwitch-sizeSmall .MuiSwitch-switchBase {
      padding: 4px;
    }

    .MuiSwitch-sizeSmall .MuiSwitch-switchBase.Mui-checked {
      transform: translateX(16px);
    }

    .MuiSwitch-input {
      left: -100%;
      width: 300%;
    }

    .MuiSwitch-thumb {
      color: Color.White;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: currentColor;
    }

    @media (min-width: 600px) {
      .MuiSwitch-thumb {
        width: 16px;
        height: 16px;
      }
    }

    .MuiSwitch-track {
      width: 100%;
      height: 100%;
      z-index: -1;
      box-shadow: 0 0 0 0 Color.Transparent;
      transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 16px;
      background-color: #000;
    }

    @media (min-width: 600px) {
      .MuiSwitch-track {
        border-radius: 13px;
      }
    }
  `);
});
