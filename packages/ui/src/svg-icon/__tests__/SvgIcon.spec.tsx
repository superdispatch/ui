import { SvgIcon } from '@material-ui/core';
import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

it('checks component css', () => {
  expect(renderCSS(<SvgIcon />, ['MuiSvgIcon'])).toMatchInlineSnapshot(`
    .MuiSvgIcon-root {
      fill: currentColor;
      width: 1em;
      height: 1em;
      display: inline-block;
      font-size: 24px;
      transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      flex-shrink: 0;
      user-select: none;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiSvgIcon-root {
        font-size: 32px;
      }
    }

    .MuiSvgIcon-colorPrimary {
      color: Color.Blue300;
    }

    .MuiSvgIcon-colorSecondary {
      color: #f50057;
    }

    .MuiSvgIcon-colorAction {
      color: Color.Grey100;
    }

    .MuiSvgIcon-colorError {
      color: Color.Red300;
    }

    .MuiSvgIcon-colorDisabled {
      color: Color.Silver400;
    }

    .MuiSvgIcon-fontSizeInherit {
      font-size: inherit;
    }

    .MuiSvgIcon-fontSizeSmall {
      font-size: 16px;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiSvgIcon-fontSizeSmall {
        font-size: 24px;
      }
    }

    .MuiSvgIcon-fontSizeLarge {
      font-size: 32px;
    }
  `);
});
