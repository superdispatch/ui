import { validatePhone, ValidatePhoneRules } from '../FormikPhoneField';

test.each<[unknown, undefined | ValidatePhoneRules, string | unknown]>([
  [null, { required: true }, 'This field is required'],
  [null, { required: true, requiredMessage: 'Required.' }, 'Required.'],
  [undefined, { required: true }, 'This field is required'],
  [undefined, { required: true, requiredMessage: 'Required.' }, 'Required.'],

  ['615', undefined, 'Phone number is too short'],
  ['615', { tooShortMessage: 'Too short.' }, 'Too short.'],

  ['615-994-3300 00', undefined, 'Phone number is too long'],
  ['615-994-3300 00', { tooLongMessage: 'Too long.' }, 'Too long.'],

  ['615-994-3300', undefined, undefined],
])('validatePhone(%p, %p): %p', (value, rules, expected) => {
  expect(validatePhone(value, rules)).toBe(expected);
});
