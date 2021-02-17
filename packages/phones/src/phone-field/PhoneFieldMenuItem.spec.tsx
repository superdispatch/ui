import { renderCSS } from '@superdispatch/ui-testutils';
import { PhoneFieldMenuItem } from './PhoneFieldMenuItem';

test('css', () => {
  expect(
    renderCSS(<PhoneFieldMenuItem country="US" />, ['SD-PhoneFieldMenuItem']),
  ).toMatchInlineSnapshot(`
    .SD-PhoneFieldMenuItem-flag {
      margin-right: 8px;
    }
  `);
});
