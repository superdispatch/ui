import { SvgIcon } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiSvgIcon).toMatchInlineSnapshot(`undefined`);
});

it('checks component css', () => {
  expect(renderCSS(<SvgIcon />, ['MuiSvgIcon'])).toMatchInlineSnapshot(`
    .MuiSvgIcon-root {
      fill: currentColor;
      width: 1em;
      height: 1em;
      display: inherit;
      font-size: var(--mui-svg-icon-size, 32px);
      transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      flex-shrink: 0;
      user-select: none;
    }

    @media (min-width: 600px) {
      .MuiSvgIcon-root {
        font-size: var(--mui-svg-icon-size, 24px);
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
      font-size: var(--mui-svg-icon-size, 24px);
    }

    @media (min-width: 600px) {
      .MuiSvgIcon-fontSizeSmall {
        font-size: var(--mui-svg-icon-size, 16px);
      }
    }

    .MuiSvgIcon-fontSizeLarge {
      font-size: var(--mui-svg-icon-size, 32px);
    }
  `);
});
