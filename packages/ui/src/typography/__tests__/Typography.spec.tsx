import { Typography } from '@material-ui/core';
import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

it('checks component css', () => {
  expect(renderCSS(<Typography />, ['MuiTypography'])).toMatchInlineSnapshot(`
    .MuiTypography-root {
      margin: 0;
    }

    .MuiTypography-body2 {
      font-size: 16px;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 24px;
    }

    @media (min-width: 600px) {
      .MuiTypography-body2 {
        font-size: 14px;
        line-height: 20px;
      }
    }

    .MuiTypography-body1 {
      font-size: 16px;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 600;
      line-height: 24px;
    }

    @media (min-width: 600px) {
      .MuiTypography-body1 {
        font-size: 14px;
        line-height: 20px;
      }
    }

    .MuiTypography-caption {
      font-size: 13px;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 18px;
    }

    @media (min-width: 600px) {
      .MuiTypography-caption {
        font-size: 12px;
        line-height: 16px;
      }
    }

    .MuiTypography-button {
      font-size: 0.875rem;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 1.75;
      text-transform: uppercase;
    }

    .MuiTypography-h1 {
      font-size: 34px;
      font-family: SF Pro Display, -apple-system, BlinkMacSystemFont,
        'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial',
        sans-serif;
      font-weight: 700;
      line-height: 44px;
    }

    @media (min-width: 600px) {
      .MuiTypography-h1 {
        font-size: 32px;
        line-height: 40px;
      }
    }

    .MuiTypography-h2 {
      font-size: 26px;
      font-family: SF Pro Display, -apple-system, BlinkMacSystemFont,
        'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial',
        sans-serif;
      font-weight: 500;
      line-height: 32px;
    }

    @media (min-width: 600px) {
      .MuiTypography-h2 {
        font-size: 24px;
        line-height: 28px;
      }
    }

    .MuiTypography-h3 {
      font-size: 22px;
      font-family: SF Pro Display, -apple-system, BlinkMacSystemFont,
        'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial',
        sans-serif;
      font-weight: 500;
      line-height: 32px;
    }

    @media (min-width: 600px) {
      .MuiTypography-h3 {
        font-size: 20px;
        line-height: 28px;
      }
    }

    .MuiTypography-h4 {
      font-size: 18px;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 28px;
    }

    @media (min-width: 600px) {
      .MuiTypography-h4 {
        font-size: 16px;
        line-height: 24px;
      }
    }

    .MuiTypography-h5 {
      font-size: 16px;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 600;
      line-height: 24px;
    }

    @media (min-width: 600px) {
      .MuiTypography-h5 {
        font-size: 14px;
        line-height: 20px;
      }
    }

    .MuiTypography-h6 {
      font-size: 13px;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 700;
      line-height: 18px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    @media (min-width: 600px) {
      .MuiTypography-h6 {
        font-size: 12px;
        line-height: 16px;
      }
    }

    .MuiTypography-subtitle1 {
      font-size: 1rem;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 1.75;
    }

    .MuiTypography-subtitle2 {
      font-size: 0.875rem;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 1.57;
    }

    .MuiTypography-overline {
      font-size: 0.75rem;
      font-family: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco',
        'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 2.66;
      text-transform: uppercase;
    }

    .MuiTypography-srOnly {
      width: 1px;
      height: 1px;
      overflow: hidden;
      position: absolute;
    }

    .MuiTypography-alignLeft {
      text-align: left;
    }

    .MuiTypography-alignCenter {
      text-align: center;
    }

    .MuiTypography-alignRight {
      text-align: right;
    }

    .MuiTypography-alignJustify {
      text-align: justify;
    }

    .MuiTypography-noWrap {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .MuiTypography-gutterBottom {
      margin-bottom: 0.35em;
    }

    .MuiTypography-paragraph {
      margin-bottom: 16px;
    }

    .MuiTypography-colorInherit {
      color: inherit;
    }

    .MuiTypography-colorPrimary {
      color: Color.Blue300;
    }

    .MuiTypography-colorSecondary {
      color: #f50057;
    }

    .MuiTypography-colorTextPrimary {
      color: Color.Grey500;
    }

    .MuiTypography-colorTextSecondary {
      color: Color.Grey200;
    }

    .MuiTypography-colorError {
      color: Color.Red300;
    }

    .MuiTypography-displayInline {
      display: inline;
    }

    .MuiTypography-displayBlock {
      display: block;
    }
  `);
});
