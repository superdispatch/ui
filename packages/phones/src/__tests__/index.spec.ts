import * as api from '..';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "PhoneField": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "PhoneField",
        "render": [Function],
      },
      "PhoneLink": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "PhoneLink",
        "render": [Function],
      },
      "PhoneText": [Function],
      "formatCountry": [Function],
      "formatPhoneNumber": [Function],
      "getCountryCode": [Function],
      "getExamplePhoneNumber": [Function],
      "isCountryISO": [Function],
      "listCountries": [Function],
      "parsePhoneNumber": [Function],
      "toCountryISO": [Function],
      "useFormattedPhoneNumber": [Function],
      "validatePhoneNumber": [Function],
    }
  `);
});
