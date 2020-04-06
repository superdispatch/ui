import { PhoneNumber } from '@superdispatch/phones';

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

  [PhoneNumber.getExample('US'), undefined],
  [PhoneNumber.toNational(PhoneNumber.getExample('US')), undefined],
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
