import { Typography } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/testutils';
import React from 'react';

it('checks default typography', () => {
  const { typography } = renderTheme();

  expect(typography).toMatchInlineSnapshot(`
    Object {
      body1: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 1rem,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 0.875rem,
        fontWeight: 400,
        lineHeight: 1.43,
      },
      button: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 0.875rem,
        fontWeight: 500,
        lineHeight: 1.75,
        textTransform: uppercase,
      },
      caption: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 0.75rem,
        fontWeight: 400,
        lineHeight: 1.66,
      },
      fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
      fontSize: 14,
      fontWeightBold: 700,
      fontWeightLight: 300,
      fontWeightMedium: 500,
      fontWeightRegular: 400,
      h1: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 6rem,
        fontWeight: 300,
        lineHeight: 1.167,
      },
      h2: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 3.75rem,
        fontWeight: 300,
        lineHeight: 1.2,
      },
      h3: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 3rem,
        fontWeight: 400,
        lineHeight: 1.167,
      },
      h4: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 2.125rem,
        fontWeight: 400,
        lineHeight: 1.235,
      },
      h5: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 1.5rem,
        fontWeight: 400,
        lineHeight: 1.334,
      },
      h6: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 1.25rem,
        fontWeight: 500,
        lineHeight: 1.6,
      },
      htmlFontSize: 16,
      overline: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 0.75rem,
        fontWeight: 400,
        lineHeight: 2.66,
        textTransform: uppercase,
      },
      pxToRem: [Function],
      round: [Function],
      subtitle1: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 1rem,
        fontWeight: 400,
        lineHeight: 1.75,
      },
      subtitle2: Object {
        fontFamily: SF Pro Text, -apple-system, BlinkMacSystemFont, 'San Francisco', 'Roboto', 'Segoe UI', 'Helvetica Neue', 'Ubuntu', 'Arial', sans-serif,
        fontSize: 0.875rem,
        fontWeight: 500,
        lineHeight: 1.57,
      },
    }
  `);
});

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiTypography).toMatchInlineSnapshot(`
    Object {
      variant: body2,
    }
  `);
});

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
