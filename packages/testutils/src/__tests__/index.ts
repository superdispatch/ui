import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "MockSchema": [Function],
    }
  `);
});
