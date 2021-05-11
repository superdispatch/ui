import { Paper } from '@material-ui/core';
import { renderCSS, renderTheme } from '@superdispatch/ui-testutils';

it('checks default props', () => {
  const { props } = renderTheme();

  // FIXME Use proper type after after official release.
  expect((props as any).MuiPagination).toMatchInlineSnapshot(`
    Object {}
  `);
});

it('checks component css', () => {
  expect(renderCSS(<Paper />, ['MuiPagination'])).toMatchInlineSnapshot(``);
});
