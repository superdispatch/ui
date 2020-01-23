import { Tooltip } from '@material-ui/core';
import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

it('checks component css', () => {
  expect(
    renderCSS(
      <Tooltip title="text">
        <div />
      </Tooltip>,
      ['MuiTooltip'],
    ),
  ).toMatchInlineSnapshot(`
    .MuiTooltip-popper {
      flip: false;
      z-index: 1500;
      pointer-events: none;
    }

    .MuiTooltip-popperInteractive {
      pointer-events: auto;
    }

    .MuiTooltip-popperArrow[x-placement*='bottom'] .MuiTooltip-arrow {
      top: 0;
      flip: false;
      margin-top: -0.5em;
      margin-left: 0.6em;
      margin-right: 0.6em;
      margin-bottom: 0.6em;
    }

    .MuiTooltip-popperArrow[x-placement*='top'] .MuiTooltip-arrow {
      flip: false;
      bottom: 0;
      margin-top: 0.6em;
      margin-left: 0.6em;
      margin-right: 0.6em;
      margin-bottom: -0.5em;
    }

    .MuiTooltip-popperArrow[x-placement*='right'] .MuiTooltip-arrow {
      flip: false;
      left: 0;
      margin-top: 0.6em;
      margin-left: -0.5em;
      margin-right: 0.6em;
      margin-bottom: 0.6em;
    }

    .MuiTooltip-popperArrow[x-placement*='left'] .MuiTooltip-arrow {
      flip: false;
      right: 0;
      margin-top: 0.6em;
      margin-left: 0.6em;
      margin-right: -0.5em;
      margin-bottom: 0.6em;
    }

    .MuiTooltip-popperArrow[x-placement*='left'] .MuiTooltip-arrow::before {
      flip: false;
      border-top-right-radius: 2px;
    }

    .MuiTooltip-popperArrow[x-placement*='right'] .MuiTooltip-arrow::before {
      flip: false;
      border-bottom-left-radius: 2px;
    }

    .MuiTooltip-popperArrow[x-placement*='top'] .MuiTooltip-arrow::before {
      flip: false;
      border-bottom-right-radius: 2px;
    }

    .MuiTooltip-popperArrow[x-placement*='bottom'] .MuiTooltip-arrow::before {
      flip: false;
      border-top-left-radius: 2px;
    }

    .MuiTooltip-tooltip {
      color: Color.White;
      padding: 8px 12px;
      position: relative;
      font-size: 14px;
      max-width: 300px;
      word-wrap: break-word;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 20px;
      border-radius: 4px;
      background-color: Color.Grey400;
    }

    .MuiTooltip-tooltipArrow {
      margin: 0;
      position: relative;
    }

    .MuiTooltip-arrow {
      color: Color.Grey400;
      position: absolute;
      font-size: 8px;
      transform: rotate3d(0, 0, 1, 45deg);
    }

    .MuiTooltip-arrow::before {
      width: 1em;
      height: 1em;
      margin: auto;
      content: '';
      display: block;
      background-color: currentColor;
    }

    .MuiTooltip-touch {
      padding: 8px 16px;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.14286em;
    }

    .MuiTooltip-tooltipPlacementLeft {
      margin: 0 24px;
      transform-origin: right center;
    }

    @media (min-width: 600px) {
      .MuiTooltip-tooltipPlacementLeft {
        margin: 0 14px;
      }
    }

    .MuiTooltip-tooltipPlacementRight {
      margin: 0 24px;
      transform-origin: left center;
    }

    @media (min-width: 600px) {
      .MuiTooltip-tooltipPlacementRight {
        margin: 0 14px;
      }
    }

    .MuiTooltip-tooltipPlacementTop {
      margin: 24px 0;
      transform-origin: center bottom;
    }

    @media (min-width: 600px) {
      .MuiTooltip-tooltipPlacementTop {
        margin: 14px 0;
      }
    }

    .MuiTooltip-tooltipPlacementBottom {
      margin: 24px 0;
      transform-origin: center top;
    }

    @media (min-width: 600px) {
      .MuiTooltip-tooltipPlacementBottom {
        margin: 14px 0;
      }
    }
  `);
});
