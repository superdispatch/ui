import * as api from '..';

test('api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "PhoneField": React.forwardRef(PhoneField),
      "PhoneLink": React.forwardRef(PhoneLink),
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
