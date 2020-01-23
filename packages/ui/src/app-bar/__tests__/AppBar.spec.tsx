import { AppBar } from '@material-ui/core';
import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

it('checks component css', () => {
  const css = renderCSS(<AppBar />, ['MuiAppBar']);

  expect(css).toMatchInlineSnapshot(`
    .MuiAppBar-root {
      width: 100%;
      display: flex;
      z-index: 1100;
      box-sizing: border-box;
      flex-shrink: 0;
      flex-direction: column;
    }

    .MuiAppBar-positionFixed {
      top: 0;
      left: auto;
      right: 0;
      position: fixed;
    }

    @media print {
      .MuiAppBar-positionFixed {
        position: absolute;
      }
    }

    .MuiAppBar-positionAbsolute {
      top: 0;
      left: auto;
      right: 0;
      position: absolute;
    }

    .MuiAppBar-positionSticky {
      top: 0;
      left: auto;
      right: 0;
      position: sticky;
    }

    .MuiAppBar-positionStatic {
      position: static;
      transform: translateZ(0);
    }

    .MuiAppBar-positionRelative {
      position: relative;
    }

    .MuiAppBar-colorDefault {
      color: rgba(0, 0, 0, 0.87);
      background-color: #f5f5f5;
    }

    .MuiAppBar-colorPrimary {
      color: Color.White;
      background-color: Color.Blue300;
    }

    .MuiAppBar-colorSecondary {
      color: Color.White;
      background-color: #f50057;
    }
  `);
});
