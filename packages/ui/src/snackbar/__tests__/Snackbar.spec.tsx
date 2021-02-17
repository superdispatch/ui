import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';
import { Snackbar } from '../../index';

it('checks default props', () => {
  const { props } = renderTheme();

  expect(props.MuiSnackbar).toMatchInlineSnapshot(`undefined`);
  expect(props.MuiSnackbarContent).toMatchInlineSnapshot(`undefined`);
});

it('checks component css', () => {
  expect(
    renderCSS(<Snackbar open={true} />, [
      'MuiSnackbar',
      'MuiSnackbarContent',
      'SD-SnackbarContent',
    ]),
  ).toMatchInlineSnapshot(`
    .MuiSnackbar-root {
      left: 8px;
      right: 8px;
      display: flex;
      z-index: 1400;
      position: fixed;
      align-items: center;
      justify-content: center;
    }

    .MuiSnackbar-anchorOriginTopCenter {
      top: 8px;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginTopCenter {
        top: 24px;
        left: 50%;
        right: auto;
        transform: translateX(-50%);
      }
    }

    .MuiSnackbar-anchorOriginBottomCenter {
      left: 0;
      right: 0;
      bottom: 0;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginBottomCenter {
        left: 50%;
        right: auto;
        bottom: 24px;
        transform: translateX(-50%);
      }
    }

    .MuiSnackbar-anchorOriginTopRight {
      top: 8px;
      justify-content: flex-end;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginTopRight {
        top: 24px;
        left: auto;
        right: 24px;
      }
    }

    .MuiSnackbar-anchorOriginBottomRight {
      bottom: 8px;
      justify-content: flex-end;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginBottomRight {
        left: auto;
        right: 24px;
        bottom: 24px;
      }
    }

    .MuiSnackbar-anchorOriginTopLeft {
      top: 8px;
      justify-content: flex-start;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginTopLeft {
        top: 24px;
        left: 24px;
        right: auto;
      }
    }

    .MuiSnackbar-anchorOriginBottomLeft {
      bottom: 8px;
      justify-content: flex-start;
    }

    @media (min-width: 600px) {
      .MuiSnackbar-anchorOriginBottomLeft {
        left: 24px;
        right: auto;
        bottom: 24px;
      }
    }

    .MuiSnackbarContent-root {
      color: Color.White;
      width: 100%;
      display: flex;
      padding: 6px 16px;
      flex-grow: 1;
      flex-wrap: wrap;
      font-size: 14px;
      min-height: 60px;
      align-items: center;
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      line-height: 20px;
      border-radius: 0;
      background-color: rgb(49, 49, 49);
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiSnackbarContent-root {
        font-size: 16px;
        line-height: 24px;
      }
    }

    @media (min-width: 600px) {
      .MuiSnackbarContent-root {
        width: 432px;
        flex-grow: initial;
        max-width: 432px;
        min-width: 288px;
        border-radius: 4px;
      }
    }

    .MuiSnackbarContent-message {
      flex: 1;
      display: flex;
      padding: 8px 0;
    }

    .MuiSnackbarContent-action {
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-right: -8px;
      padding-left: 16px;
    }

    .SD-SnackbarContent-root {
      color: Color.White;
      background-color: Color.Grey500;
    }

    .SD-SnackbarContent-root.SD-SnackbarContent-variantError {
      color: Color.White;
      background-color: Color.Red500;
    }

    .SD-SnackbarContent-action {
      padding-left: 8px;
    }

    .SD-SnackbarContent-message {
      align-items: center;
    }

    @media (max-width: 599.95px) {
      .SD-SnackbarContent-message {
        font-size: 16px;
      }
    }

    .SD-SnackbarContent-icon {
      font-size: 24px;
      margin-right: 8px;
    }

    .SD-SnackbarContent-closeButton {
      color: Color.White40;
    }

    .SD-SnackbarContent-closeButton:hover,
    .SD-SnackbarContent-closeButton:focus {
      color: Color.White40;
      background-color: Color.White08;
    }
  `);
});
