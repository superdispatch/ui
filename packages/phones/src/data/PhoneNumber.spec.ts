import { PhoneNumber } from './PhoneNumber';

describe('.fromInternational', () => {
  test.each`
    input               | output
    ${''}               | ${undefined}
    ${null}             | ${undefined}
    ${undefined}        | ${undefined}
    ${'8'}              | ${undefined}
    ${'83'}             | ${{ region: 'US', nationalNumber: '83' }}
    ${'830'}            | ${{ region: 'US', nationalNumber: '830' }}
    ${'830-555'}        | ${{ region: 'US', nationalNumber: '830555' }}
    ${'830-555-0123'}   | ${{ region: 'US', nationalNumber: '(830) 555-0123' }}
    ${'1 830-555-0123'} | ${{ region: 'US', nationalNumber: '(830) 555-0123' }}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.fromInternational(input)).toEqual(output);
  });
});
