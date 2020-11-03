import * as api from '..';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "DEFAULT_COUNTRY": "US",
      "PhoneField": React.forwardRef(PhoneField),
      "PhoneLink": React.forwardRef(PhoneLink),
      "PhoneService": [Function],
      "PhoneText": [Function],
      "formatCountry": [Function],
      "getCountryCode": [Function],
      "isCountryISO": [Function],
      "listCountries": [Function],
      "toCountryISO": [Function],
      "useFormattedPhoneNumber": [Function],
      "usePhoneService": [Function],
    }
  `);
});
