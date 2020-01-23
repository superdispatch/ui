import { Link } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiLink).toMatchInlineSnapshot(`
    Object {
      "underline": "none",
    }
  `);
});

it('checks component css', () => {
  expect(renderCSS(<Link>Text</Link>, ['MuiLink'])).toMatchInlineSnapshot(`
    .MuiLink-root {
      border-top: none;
      transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-left: none;
      border-right: none;
      border-bottom: 0.1em solid;
    }

    .MuiLink-root.MuiTypography-colorPrimary {
      color: Color.Grey500;
      border-color: Color.Silver500;
    }

    .MuiLink-root.MuiTypography-colorPrimary:focus {
      outline: none;
      border-color: Color.Blue300;
    }

    .MuiLink-root.MuiTypography-colorPrimary:hover,
    .MuiLink-root.MuiTypography-colorPrimary:active {
      color: Color.Blue300;
      border-color: currentColor;
    }

    .MuiLink-underlineNone {
      text-decoration: none;
    }

    .MuiLink-underlineHover {
      text-decoration: none;
    }

    .MuiLink-underlineHover:hover {
      text-decoration: underline;
    }

    .MuiLink-underlineAlways {
      text-decoration: underline;
    }

    .MuiLink-button {
      cursor: pointer;
      margin: 0;
      outline: 0;
      padding: 0;
      position: static;
      font-size: inherit;
      text-align: inherit;
      align-items: inherit;
      font-family: inherit;
      font-weight: inherit;
      line-height: inherit;
      user-select: inherit;
      border-radius: 0;
      vertical-align: inherit;
      -moz-appearance: none;
      background-color: transparent;
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;
    }

    .MuiLink-button::-moz-focus-inner {
      border-style: none;
    }

    .MuiLink-button.Mui-focusVisible {
      outline: auto;
    }
  `);
});
