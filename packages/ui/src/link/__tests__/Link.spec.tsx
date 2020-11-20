import { Link } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiLink).toMatchInlineSnapshot(`
    Object {
      "color": "textPrimary",
      "underline": "none",
    }
  `);
});

it('checks component css', () => {
  expect(renderCSS(<Link>Text</Link>, ['MuiLink'])).toMatchInlineSnapshot(`
    .MuiLink-root {
      background-size: 100% 1px;
      background-color: Color.Transparent;
      background-repeat: repeat-x;
      background-position: 0 100%;
    }

    .MuiLink-root:focus {
      outline: none;
    }

    .MuiLink-root:hover,
    .MuiLink-root:active {
      background-image: linear-gradient(
        to right,
        currentColor 0%,
        currentColor 100%
      );
    }

    .MuiLink-root.MuiTypography-colorTextPrimary {
      background-image: linear-gradient(
        to right,
        Color.Silver500 0%,
        Color.Silver500 100%
      );
    }

    .MuiLink-root.MuiTypography-colorTextPrimary:focus,
    .MuiLink-root.MuiTypography-colorTextPrimary:hover,
    .MuiLink-root.MuiTypography-colorTextPrimary:active {
      color: Color.Blue300;
      background-image: linear-gradient(
        to right,
        Color.Blue300 0%,
        Color.Blue300 100%
      );
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
      border: 0;
      cursor: pointer;
      margin: 0;
      outline: 0;
      padding: 0;
      position: relative;
      font-size: inherit;
      text-align: inherit;
      line-height: inherit;
      user-select: inherit;
      border-radius: 0;
      vertical-align: inherit;
      -moz-appearance: none;
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
