import { validatePhone } from '../FormikPhoneField';

const requiredMessage = 'This field is required';
const invalidMessage = 'Invalid phone number';
const tooLongMessage = 'Phone number is too long';
const tooShortMessage = 'Phone number is too short';
const typeMessage = 'Invalid Type';

test.each<[any, string | undefined, boolean?]>([
  [null, requiredMessage, true],
  [undefined, requiredMessage, true],
  [null, undefined],
  [undefined, undefined],
  [true, typeMessage],
  [1, typeMessage],
  [{}, typeMessage],
  [{ nationalNumber: '6', region: 'AC' }, invalidMessage],
  ['61', tooShortMessage],
  ['615-994-33001', tooLongMessage],

  [{ region: 'US', nationalNumber: '(615) 994-3300' }, undefined],
  ['615-994-3300', undefined],
])('validates %p phone %s', (...args: any[]) => {
  const [value, message, required] = args;
  expect(
    validatePhone(value, {
      required,
      typeMessage,
      requiredMessage,
      invalidMessage,
      tooLongMessage,
      tooShortMessage,
    }),
  ).toBe(message);
});
