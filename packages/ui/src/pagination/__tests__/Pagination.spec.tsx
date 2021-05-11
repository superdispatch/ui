import { Pagination } from '@material-ui/lab';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';

it('checks default props', () => {
  const { props } = renderTheme();

  // FIXME Use proper type after after official release.
  expect((props as any).MuiPagination).toMatchInlineSnapshot(`undefined`);
  expect((props as any).MuiPaginationItem).toMatchInlineSnapshot(`Object {}`);
});

it('checks component css', () => {
  expect(renderCSS(<Pagination />, ['MuiPagination', 'MuiPaginationItem']))
    .toMatchInlineSnapshot(`
    .MuiPagination-ul {
      margin: 0;
      display: flex;
      padding: 0;
      flex-wrap: wrap;
      list-style: none;
      align-items: center;
    }

    .MuiPaginationItem-root {
      color: Color.Grey400;
      height: 32px;
      margin: 0 3px;
      padding: 0 6px;
      font-size: 14px;
      min-width: 32px;
      box-sizing: border-box;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      line-height: 20px;
      border-radius: 16px;
    }

    @media (min-width: 0px) and (max-width: 599.95px) {
      .MuiPaginationItem-root {
        font-size: 16px;
        line-height: 24px;
      }
    }

    .MuiPaginationItem-page {
      transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }

    .MuiPaginationItem-page:hover {
      background-color: Color.Silver200;
    }

    .MuiPaginationItem-page.Mui-focusVisible {
      border: 1px solid Color.Blue100;
      border-radius: 4px;
      background-color: Color.White;
    }

    .MuiPaginationItem-page.Mui-selected {
      background-color: Color.Silver400;
    }

    .MuiPaginationItem-page.Mui-disabled {
      color: Color.Grey100;
    }

    .MuiPaginationItem-page.Mui-selected:hover,
    .MuiPaginationItem-page.Mui-selected.Mui-focusVisible {
      background-color: Color.Silver400;
    }

    .MuiPaginationItem-page.Mui-selected.Mui-disabled {
      color: Color.Grey100;
      opacity: 1;
      background-color: Color.Silver400;
    }

    @media (hover: none) {
      .MuiPaginationItem-page.Mui-selected:hover,
      .MuiPaginationItem-page.Mui-selected.Mui-focusVisible {
        background-color: Color.Silver300;
      }
    }

    @media (hover: none) {
      .MuiPaginationItem-page:hover {
        background-color: transparent;
      }
    }

    .MuiPaginationItem-sizeSmall {
      height: 26px;
      margin: 0 1px;
      padding: 0 4px;
      min-width: 26px;
      border-radius: 13px;
    }

    .MuiPaginationItem-sizeSmall .MuiPaginationItem-icon {
      font-size: 1.125rem;
    }

    .MuiPaginationItem-sizeLarge {
      height: 40px;
      padding: 0 10px;
      font-size: 0.9375rem;
      min-width: 40px;
      border-radius: 20px;
    }

    .MuiPaginationItem-sizeLarge .MuiPaginationItem-icon {
      font-size: 1.375rem;
    }

    .MuiPaginationItem-textPrimary.Mui-selected {
      color: Color.White;
      background-color: Color.Blue300;
    }

    .MuiPaginationItem-textPrimary.Mui-selected:hover,
    .MuiPaginationItem-textPrimary.Mui-selected.Mui-focusVisible {
      background-color: rgb(0, 81, 178);
    }

    .MuiPaginationItem-textPrimary.Mui-selected.Mui-disabled {
      color: Color.Silver400;
    }

    @media (hover: none) {
      .MuiPaginationItem-textPrimary.Mui-selected:hover,
      .MuiPaginationItem-textPrimary.Mui-selected.Mui-focusVisible {
        background-color: Color.Blue300;
      }
    }

    .MuiPaginationItem-textSecondary.Mui-selected {
      color: Color.White;
      background-color: #f50057;
    }

    .MuiPaginationItem-textSecondary.Mui-selected:hover,
    .MuiPaginationItem-textSecondary.Mui-selected.Mui-focusVisible {
      background-color: #c51162;
    }

    .MuiPaginationItem-textSecondary.Mui-selected.Mui-disabled {
      color: Color.Silver400;
    }

    @media (hover: none) {
      .MuiPaginationItem-textSecondary.Mui-selected:hover,
      .MuiPaginationItem-textSecondary.Mui-selected.Mui-focusVisible {
        background-color: #f50057;
      }
    }

    .MuiPaginationItem-outlined {
      border: 1px solid rgba(0, 0, 0, 0.23);
    }

    .MuiPaginationItem-outlined.Mui-selected.Mui-disabled {
      border: 1px solid rgba(0, 0, 0, 0.12);
    }

    .MuiPaginationItem-outlinedPrimary.Mui-selected {
      color: Color.Blue300;
      border: 1px solid rgba(0, 117, 255, 0.5);
      background-color: rgba(0, 117, 255, 0.12);
    }

    .MuiPaginationItem-outlinedPrimary.Mui-selected:hover,
    .MuiPaginationItem-outlinedPrimary.Mui-selected.Mui-focusVisible {
      background-color: rgba(0, 117, 255, 0.16);
    }

    .MuiPaginationItem-outlinedPrimary.Mui-selected.Mui-disabled {
      color: Color.Silver400;
    }

    @media (hover: none) {
      .MuiPaginationItem-outlinedPrimary.Mui-selected:hover,
      .MuiPaginationItem-outlinedPrimary.Mui-selected.Mui-focusVisible {
        background-color: transparent;
      }
    }

    .MuiPaginationItem-outlinedSecondary.Mui-selected {
      color: #f50057;
      border: 1px solid rgba(245, 0, 87, 0.5);
      background-color: rgba(245, 0, 87, 0.12);
    }

    .MuiPaginationItem-outlinedSecondary.Mui-selected:hover,
    .MuiPaginationItem-outlinedSecondary.Mui-selected.Mui-focusVisible {
      background-color: rgba(245, 0, 87, 0.16);
    }

    .MuiPaginationItem-outlinedSecondary.Mui-selected.Mui-disabled {
      color: Color.Silver400;
    }

    @media (hover: none) {
      .MuiPaginationItem-outlinedSecondary.Mui-selected:hover,
      .MuiPaginationItem-outlinedSecondary.Mui-selected.Mui-focusVisible {
        background-color: transparent;
      }
    }

    .MuiPaginationItem-rounded {
      border-radius: 4px;
    }

    .MuiPaginationItem-ellipsis {
      height: auto;
    }

    .MuiPaginationItem-ellipsis.Mui-disabled {
      opacity: 0.38;
    }

    .MuiPaginationItem-icon {
      margin: 0 -8px;
      font-size: 1.25rem;
    }
  `);
});
