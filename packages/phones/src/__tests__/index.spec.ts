import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "PhoneField": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "PhoneField",
        "render": [Function],
      },
      "PhoneFieldFlag": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "PhoneFieldFlag",
        "render": [Function],
      },
      "PhoneLink": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "PhoneLink",
        "render": [Function],
      },
      "PhoneNumber": [Function],
      "PhoneText": [Function],
      "usePhoneNumber": [Function],
    }
  `);
});
