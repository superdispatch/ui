import * as api from '..';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "DEFAULT_COUNTRY": "US",
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
      "PhoneService": [Function],
      "PhoneText": [Function],
      "formatCountry": [Function],
      "getCountryCode": [Function],
      "getPhonePrefix": [Function],
      "isCountryISO": [Function],
      "listCountries": [Function],
      "toCountryISO": [Function],
      "useFormattedPhoneNumber": [Function],
      "usePhoneService": [Function],
    }
  `);
});
