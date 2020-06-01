import { Tooltip } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';
import React from 'react';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiTooltip).toMatchInlineSnapshot(`
    Object {
      "arrow": true,
    }
  `);
});

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
      z-index: 1500;
      pointer-events: none;
    }

    .MuiTooltip-popperInteractive {
      pointer-events: auto;
    }

    .MuiTooltip-popperArrow[x-placement*='bottom'] .MuiTooltip-arrow {
      top: 0;
      left: 0;
      margin-top: -0.71em;
      margin-left: 4px;
      margin-right: 4px;
    }

    .MuiTooltip-popperArrow[x-placement*='top'] .MuiTooltip-arrow {
      left: 0;
      bottom: 0;
      margin-left: 4px;
      margin-right: 4px;
      margin-bottom: -0.71em;
    }

    .MuiTooltip-popperArrow[x-placement*='right'] .MuiTooltip-arrow {
      left: 0;
      width: 0.71em;
      height: 1em;
      margin-top: 4px;
      margin-left: -0.71em;
      margin-bottom: 4px;
    }

    .MuiTooltip-popperArrow[x-placement*='left'] .MuiTooltip-arrow {
      right: 0;
      width: 0.71em;
      height: 1em;
      margin-top: 4px;
      margin-right: -0.71em;
      margin-bottom: 4px;
    }

    .MuiTooltip-popperArrow[x-placement*='left'] .MuiTooltip-arrow::before {
      transform-origin: 0 0;
      border-top-right-radius: 2px;
    }

    .MuiTooltip-popperArrow[x-placement*='right'] .MuiTooltip-arrow::before {
      transform-origin: 100% 100%;
      border-bottom-left-radius: 2px;
    }

    .MuiTooltip-popperArrow[x-placement*='top'] .MuiTooltip-arrow::before {
      transform-origin: 100% 0;
      border-bottom-right-radius: 2px;
    }

    .MuiTooltip-popperArrow[x-placement*='bottom'] .MuiTooltip-arrow::before {
      transform-origin: 0 100%;
      border-top-left-radius: 2px;
    }

    .MuiTooltip-tooltip {
      color: Color.White;
      padding: 8px 12px;
      font-size: 14px;
      max-width: 300px;
      word-wrap: break-word;
      font-family: SF Pro Text;
      font-weight: 400;
      line-height: 20px;
      border-radius: 4px;
      background-color: Color.Grey400;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiTooltip-tooltip {
        font-size: 16px;
        line-height: 24px;
      }
    }

    .MuiTooltip-tooltipArrow {
      margin: 0;
      position: relative;
    }

    .MuiTooltip-arrow {
      color: Color.Grey400;
      width: 1em;
      height: 0.71em;
      overflow: hidden;
      position: absolute;
      font-size: 8px;
    }

    .MuiTooltip-arrow::before {
      width: 100%;
      height: 100%;
      margin: auto;
      content: '';
      display: block;
      transform: rotate(45deg);
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
