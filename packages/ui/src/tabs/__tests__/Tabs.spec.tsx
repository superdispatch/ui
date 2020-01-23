import { Tab, Tabs } from '@material-ui/core';
import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

it('checks component css', () => {
  expect(
    renderCSS(
      <Tabs value="tab">
        <Tab value="tab" label="Text" />
      </Tabs>,
      ['MuiTabs', 'MuiTab'],
    ),
  ).toMatchInlineSnapshot(`
    .MuiTabs-root {
      display: flex;
      overflow: hidden;
      min-height: 40px;
      -webkit-overflow-scrolling: touch;
    }

    .MuiTabs-vertical {
      flex-direction: column;
    }

    .MuiTabs-flexContainer {
      display: flex;
    }

    .MuiTabs-flexContainerVertical {
      flex-direction: column;
    }

    .MuiTabs-centered {
      justify-content: center;
    }

    .MuiTabs-scroller {
      flex: 1 1 auto;
      display: inline-block;
      position: relative;
      white-space: nowrap;
    }

    .MuiTabs-fixed {
      width: 100%;
      overflow-x: hidden;
    }

    .MuiTabs-scrollable {
      overflow-x: scroll;
      scrollbar-width: none;
    }

    .MuiTabs-scrollable::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 599.95px) {
      .MuiTabs-scrollButtonsDesktop {
        display: none;
      }
    }

    .MuiTab-root {
      padding: 6px 12px;
      overflow: hidden;
      position: relative;
      font-size: 16px;
      max-width: 264px;
      min-width: 72px;
      box-sizing: border-box;
      min-height: 40px;
      text-align: center;
      transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      flex-shrink: 0;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      line-height: 24px;
      white-space: normal;
    }

    @media (min-width: 600px) {
      .MuiTab-root {
        padding: 6px 24px;
        font-size: 14px;
        line-height: 20px;
      }
    }

    .MuiTab-labelIcon {
      min-height: 72px;
      padding-top: 9px;
    }

    .MuiTab-labelIcon .MuiTab-wrapper > *:first-child {
      margin-bottom: 6px;
    }

    .MuiTab-textColorInherit {
      color: inherit;
      opacity: 0.7;
    }

    .MuiTab-textColorInherit.Mui-selected {
      opacity: 1;
    }

    .MuiTab-textColorInherit.Mui-disabled {
      opacity: 0.5;
    }

    .MuiTab-textColorPrimary {
      color: Color.Grey500;
    }

    .MuiTab-textColorPrimary.Mui-selected {
      color: Color.Blue300;
    }

    .MuiTab-textColorPrimary.Mui-disabled {
      color: Color.Grey100;
    }

    .MuiTab-textColorPrimary:hover,
    .MuiTab-textColorPrimary:focus {
      color: Color.Blue300;
    }

    .MuiTab-textColorSecondary {
      color: Color.Grey200;
    }

    .MuiTab-textColorSecondary.Mui-selected {
      color: #f50057;
    }

    .MuiTab-textColorSecondary.Mui-disabled {
      color: Color.Grey100;
    }

    .MuiTab-fullWidth {
      flex-grow: 1;
      max-width: none;
      flex-basis: 0;
      flex-shrink: 1;
    }

    .MuiTab-wrapped {
      font-size: 0.75rem;
      line-height: 1.5;
    }

    .MuiTab-wrapper {
      width: 100%;
      display: inline-flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }
  `);
});
