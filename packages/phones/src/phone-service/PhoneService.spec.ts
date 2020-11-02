import AwesomePhoneNumber from 'awesome-phonenumber';

import { CountryISO } from '../country-code-metadata/CountryCodeMetadata';
import {
  PhoneNumberFormat,
  PhoneService,
  PhoneValidationRules,
} from '../phone-service/PhoneService';

test.each([
  ['', 'US', ''],
  ['5', 'US', '5'],
  ['50', 'US', '50'],
  ['506', 'US', '506'],
  ['506', 'US', '506'],
  ['506', 'US', '506'],
  ['5062', 'US', '5062'],
  ['50623', 'US', '50623'],
  ['506234', 'US', '506234'],
  ['5062345', 'US', '506-2345'],
  ['50623456', 'US', '50623456'],
  ['506234567', 'US', '506234567'],
  ['5062345678', 'US', '(506) 234-5678'],
  ['5062345678 ', 'US', '(506) 234-5678'],
  ['50623456789', 'US', '50623456789'],
  ['506234567890', 'US', '506234567890'],
  ['1', 'US', '1'],
  ['15', 'US', '15'],
  ['150', 'US', '150'],
  ['1506', 'US', '1506'],
  ['15062', 'US', '15062'],
  ['150623', 'US', '150623'],
  ['1506234', 'US', '1506234'],
  ['15062345', 'US', '15062345'],
  ['150623456', 'US', '150623456'],
  ['1506234567', 'US', '1506234567'],
  ['15062345678', 'US', '(506) 234-5678'],
  ['150623456789', 'US', '50623456789'],
  ['1506234567890', 'US', '506234567890'],
  ['+', 'US', ''],
  ['+1', 'US', ''],
  ['+15', 'US', '5'],
  ['+150', 'US', '50'],
  ['+1506', 'US', '506'],
  ['+1506', 'US', '506'],
  ['+1506 ', 'US', '506'],
  ['+15062', 'US', '5062'],
  ['+150623', 'US', '50623'],
  ['+1506234', 'US', '506234'],
  ['+15062345', 'US', '506-2345'],
  ['+150623456', 'US', '50623456'],
  ['+1506234567', 'US', '506234567'],
  ['+15062345678', 'CA', '(506) 234-5678'],
  ['+150623456789', 'US', '50623456789'],
  ['+1506234567890', 'US', '506234567890'],
  ['+15062345678,+15062345679,+15062345680', 'CA', '(506) 234-5678'],
])(
  '#getInfo(%p): { country: %p, nationalNumber: %p }',
  (input, country, nationalNumber) => {
    expect(new PhoneService(AwesomePhoneNumber).getInfo(input)).toEqual({
      country,
      nationalNumber,
    });
  },
);

test.each<
  [
    input: string,
    format: undefined | PhoneNumberFormat,
    country: undefined | CountryISO,
    expected: string,
  ]
>([
  // Normalizes national number
  ['!+@1#1$', undefined, undefined, '+11'],
  ['!+@6#4$1', undefined, undefined, '+641'],

  // Uses `e164` by default
  ['', undefined, undefined, ''],
  ['5', undefined, undefined, '+15'],
  ['50', undefined, undefined, '+150'],
  ['506', undefined, undefined, '+1506'],
  ['506', undefined, undefined, '+1506'],
  ['5062', undefined, undefined, '+15062'],
  ['50623', undefined, undefined, '+150623'],
  ['506234', undefined, undefined, '+1506234'],
  ['5062345', undefined, undefined, '+15062345'],
  ['50623456', undefined, undefined, '+150623456'],
  ['506234567', undefined, undefined, '+1506234567'],
  ['5062345678', undefined, undefined, '+15062345678'],
  ['50623456789', undefined, undefined, '+150623456789'],
  ['506234567890', undefined, undefined, '+1506234567890'],

  ['', 'e164', undefined, ''],
  ['5', 'e164', undefined, '+15'],
  ['50', 'e164', undefined, '+150'],
  ['506', 'e164', undefined, '+1506'],
  ['506', 'e164', undefined, '+1506'],
  ['5062', 'e164', undefined, '+15062'],
  ['50623', 'e164', undefined, '+150623'],
  ['506234', 'e164', undefined, '+1506234'],
  ['5062345', 'e164', undefined, '+15062345'],
  ['50623456', 'e164', undefined, '+150623456'],
  ['506234567', 'e164', undefined, '+1506234567'],
  ['5062345678', 'e164', undefined, '+15062345678'],
  ['50623456789', 'e164', undefined, '+150623456789'],
  ['506234567890', 'e164', undefined, '+1506234567890'],

  ['', 'rfc3966', undefined, ''],
  ['5', 'rfc3966', undefined, 'tel:+1-5'],
  ['50', 'rfc3966', undefined, 'tel:+1-50'],
  ['506', 'rfc3966', undefined, 'tel:+1-506'],
  ['506', 'rfc3966', undefined, 'tel:+1-506'],
  ['5062', 'rfc3966', undefined, 'tel:+1-5062'],
  ['50623', 'rfc3966', undefined, 'tel:+1-50623'],
  ['506234', 'rfc3966', undefined, 'tel:+1-506234'],
  ['5062345', 'rfc3966', undefined, 'tel:+1-5062345'],
  ['50623456', 'rfc3966', undefined, 'tel:+1-50623456'],
  ['506234567', 'rfc3966', undefined, 'tel:+1-506234567'],
  ['5062345678', 'rfc3966', undefined, 'tel:+1-506-234-5678'],
  ['50623456789', 'rfc3966', undefined, 'tel:+1-50623456789'],
  ['506234567890', 'rfc3966', undefined, 'tel:+1-506234567890'],

  ['', 'national', undefined, ''],
  ['5', 'national', undefined, '5'],
  ['50', 'national', undefined, '50'],
  ['506', 'national', undefined, '506'],
  ['5062', 'national', undefined, '5062'],
  ['50623', 'national', undefined, '50623'],
  ['506234', 'national', undefined, '506234'],
  ['5062345', 'national', undefined, '506-2345'],
  ['50623456', 'national', undefined, '50623456'],
  ['506234567', 'national', undefined, '506234567'],
  ['5062345678', 'national', undefined, '(506) 234-5678'],
  ['50623456789', 'national', undefined, '50623456789'],
  ['506234567890', 'national', undefined, '506234567890'],

  ['', 'national', 'NZ', ''],
  ['5', 'national', 'NZ', '5'],
  ['50', 'national', 'NZ', '50'],
  ['506', 'national', 'NZ', '506'],
  ['5062', 'national', 'NZ', '5062'],
  ['50623', 'national', 'NZ', '50623'],
  ['506234', 'national', 'NZ', '506234'],
  ['5062345', 'national', 'NZ', '0506 23 45'],
  ['50623456', 'national', 'NZ', '0506 23 456'],
  ['506234567', 'national', 'NZ', '0506 234 567'],
  ['5062345678', 'national', 'NZ', '0506 234 5678'],
  ['50623456789', 'national', 'NZ', '50623456789'],
  ['506234567890', 'national', 'NZ', '506234567890'],

  ['', 'international', undefined, ''],
  ['5', 'international', undefined, '+1 5'],
  ['50', 'international', undefined, '+1 50'],
  ['506', 'international', undefined, '+1 506'],
  ['5062', 'international', undefined, '+1 5062'],
  ['50623', 'international', undefined, '+1 50623'],
  ['506234', 'international', undefined, '+1 506234'],
  ['5062345', 'international', undefined, '+1 5062345'],
  ['50623456', 'international', undefined, '+1 50623456'],
  ['506234567', 'international', undefined, '+1 506234567'],
  ['5062345678', 'international', undefined, '+1 506-234-5678'],
  ['50623456789', 'international', undefined, '+1 50623456789'],
  ['506234567890', 'international', undefined, '+1 506234567890'],
])('formatPhoneNumber(%p, %p): %p', (input, format, country, phone) => {
  expect(
    new PhoneService(AwesomePhoneNumber).format(input, { format, country }),
  ).toBe(phone);
});

test.each([
  ['', 'unknown'],
  ['6', 'unknown'],
  ['61', 'too-short'],
  ['615-9', 'too-short'],
  ['615-99', 'too-short'],
  ['615-994', 'too-short'],
  ['615-994-3', 'too-short'],
  ['615-994-33', 'too-short'],
  ['615-994-330', 'too-short'],
  ['615-994-3300', 'is-possible'],
  ['615-994-33001', 'too-long'],
  ['1 6', 'too-short'],
  ['1 61', 'too-short'],
  ['1 615-9', 'too-short'],
  ['1 615-99', 'too-short'],
  ['1 615-994', 'too-short'],
  ['1 615-994-3', 'too-short'],
  ['1 615-994-33', 'too-short'],
  ['1 615-994-330', 'too-short'],
  ['1 615-994-3300', 'is-possible'],
  ['1 615-994-33001', 'too-long'],
  ['+1 6', 'unknown'],
  ['+1 61', 'too-short'],
  ['+1 615-9', 'too-short'],
  ['+1 615-99', 'too-short'],
  ['+1 615-994', 'too-short'],
  ['+1 615-994-3', 'too-short'],
  ['+1 615-994-33', 'too-short'],
  ['+1 615-994-330', 'too-short'],
  ['+1 615-994-3300', 'is-possible'],
  ['+1 615-994-33001', 'too-long'],
])('#checkPossibility(%p): %p', (input, expected) => {
  expect(new PhoneService(AwesomePhoneNumber).checkPossibility(input)).toBe(
    expected,
  );
});

test.each<
  [
    input: unknown,
    rules: undefined | PhoneValidationRules,
    expected: string | undefined,
  ]
>([
  [null, { required: true }, 'This field is required'],
  [null, { required: true, requiredMessage: 'Required.' }, 'Required.'],
  [undefined, { required: true }, 'This field is required'],
  [undefined, { required: true, requiredMessage: 'Required.' }, 'Required.'],

  ['615', undefined, 'Phone number is too short'],
  ['615', { tooShortMessage: 'Too short.' }, 'Too short.'],

  ['615-994-3300 00', undefined, 'Phone number is too long'],
  ['615-994-3300 00', { tooLongMessage: 'Too long.' }, 'Too long.'],

  ['615-994-3300', undefined, undefined],
])('#validate(%p, %j): %p', (input, rules, expected) => {
  expect(new PhoneService(AwesomePhoneNumber).validate(input, rules)).toBe(
    expected,
  );
});