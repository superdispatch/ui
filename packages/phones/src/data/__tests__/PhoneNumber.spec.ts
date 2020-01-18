import { PhoneNumber } from '../PhoneNumber';

describe('.fromInternational', () => {
  test.each`
    input                | output
    ${''}                | ${undefined}
    ${null}              | ${undefined}
    ${undefined}         | ${undefined}
    ${'8'}               | ${undefined}
    ${'83'}              | ${{ region: 'US', nationalNumber: '83' }}
    ${'830-5'}           | ${{ region: 'US', nationalNumber: '8305' }}
    ${'830-55'}          | ${{ region: 'US', nationalNumber: '83055' }}
    ${'830-555'}         | ${{ region: 'US', nationalNumber: '830555' }}
    ${'830-555-0'}       | ${{ region: 'US', nationalNumber: '830-5550' }}
    ${'830-555-01'}      | ${{ region: 'US', nationalNumber: '83055501' }}
    ${'830-555-012'}     | ${{ region: 'US', nationalNumber: '830555012' }}
    ${'830-555-0123'}    | ${{ region: 'US', nationalNumber: '(830) 555-0123' }}
    ${'830-555-01234'}   | ${{ region: 'US', nationalNumber: '83055501234' }}
    ${'1 8'}             | ${undefined}
    ${'1 83'}            | ${{ region: 'US', nationalNumber: '83' }}
    ${'1 830-5'}         | ${{ region: 'US', nationalNumber: '8305' }}
    ${'1 830-55'}        | ${{ region: 'US', nationalNumber: '83055' }}
    ${'1 830-555'}       | ${{ region: 'US', nationalNumber: '830555' }}
    ${'1 830-555-0'}     | ${{ region: 'US', nationalNumber: '830-5550' }}
    ${'1 830-555-01'}    | ${{ region: 'US', nationalNumber: '83055501' }}
    ${'1 830-555-012'}   | ${{ region: 'US', nationalNumber: '830555012' }}
    ${'1 830-555-0123'}  | ${{ region: 'US', nationalNumber: '(830) 555-0123' }}
    ${'1 830-555-01234'} | ${{ region: 'US', nationalNumber: '83055501234' }}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.fromInternational(input)).toEqual(output);
  });
});

describe('.getExample', () => {
  test.each`
    input        | output
    ${'??'}      | ${{ region: 'US', nationalNumber: '(201) 555-0123' }}
    ${null}      | ${{ region: 'US', nationalNumber: '(201) 555-0123' }}
    ${undefined} | ${{ region: 'US', nationalNumber: '(201) 555-0123' }}
    ${'US'}      | ${{ region: 'US', nationalNumber: '(201) 555-0123' }}
    ${'CA'}      | ${{ region: 'CA', nationalNumber: '(506) 234-5678' }}
    ${'AU'}      | ${{ region: 'AU', nationalNumber: '(02) 1234 5678' }}
    ${'NZ'}      | ${{ region: 'NZ', nationalNumber: '03-234 5678' }}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.getExample(input)).toEqual(output);
  });
});

describe('.getCountryCode', () => {
  test.each`
    input        | output
    ${'??'}      | ${1}
    ${null}      | ${1}
    ${undefined} | ${1}
    ${'US'}      | ${1}
    ${'CA'}      | ${1}
    ${'AU'}      | ${61}
    ${'NZ'}      | ${64}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.getCountryCode(input)).toEqual(output);
  });
});

describe('.getRegionCode', () => {
  test.each`
    input        | output
    ${0}         | ${'US'}
    ${null}      | ${'US'}
    ${undefined} | ${'US'}
    ${1}         | ${'US'}
    ${61}        | ${'AU'}
    ${64}        | ${'NZ'}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.getRegionCode(input)).toEqual(output);
  });
});

describe('.isValid', () => {
  test.each`
    input                 | output
    ${''}                 | ${false}
    ${null}               | ${false}
    ${undefined}          | ${false}
    ${'8'}                | ${false}
    ${'83'}               | ${false}
    ${'830'}              | ${false}
    ${'830-5'}            | ${false}
    ${'830-55'}           | ${false}
    ${'830-555'}          | ${false}
    ${'830-555-0'}        | ${false}
    ${'830-555-01'}       | ${false}
    ${'830-555-012'}      | ${false}
    ${'830-555-0123'}     | ${true}
    ${'830-555-0123-4'}   | ${false}
    ${'1 8'}              | ${false}
    ${'1 83'}             | ${false}
    ${'1 830'}            | ${false}
    ${'1 830-5'}          | ${false}
    ${'1 830-55'}         | ${false}
    ${'1 830-555'}        | ${false}
    ${'1 830-555-0'}      | ${false}
    ${'1 830-555-01'}     | ${false}
    ${'1 830-555-012'}    | ${false}
    ${'1 830-555-0123'}   | ${true}
    ${'1 830-555-0123-4'} | ${false}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.isValid(input)).toEqual(output);
  });
});

describe('.validate', () => {
  test.each`
    input                 | output
    ${''}                 | ${'unknown'}
    ${null}               | ${'unknown'}
    ${undefined}          | ${'unknown'}
    ${'8'}                | ${'unknown'}
    ${'83'}               | ${'too-short'}
    ${'830'}              | ${'too-short'}
    ${'830-5'}            | ${'too-short'}
    ${'830-55'}           | ${'too-short'}
    ${'830-555'}          | ${'too-short'}
    ${'830-555-0'}        | ${'too-short'}
    ${'830-555-01'}       | ${'too-short'}
    ${'830-555-012'}      | ${'too-short'}
    ${'830-555-0123'}     | ${'is-possible'}
    ${'830-555-0123-4'}   | ${'too-long'}
    ${'1 8'}              | ${'unknown'}
    ${'1 83'}             | ${'too-short'}
    ${'1 830'}            | ${'too-short'}
    ${'1 830-5'}          | ${'too-short'}
    ${'1 830-55'}         | ${'too-short'}
    ${'1 830-555'}        | ${'too-short'}
    ${'1 830-555-0'}      | ${'too-short'}
    ${'1 830-555-01'}     | ${'too-short'}
    ${'1 830-555-012'}    | ${'too-short'}
    ${'1 830-555-0123'}   | ${'is-possible'}
    ${'1 830-555-0123-4'} | ${'too-long'}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.validate(input)).toEqual(output);
  });
});

describe('.toNational', () => {
  test.each`
    input                 | output
    ${''}                 | ${undefined}
    ${null}               | ${undefined}
    ${undefined}          | ${undefined}
    ${'8'}                | ${undefined}
    ${'83'}               | ${'83'}
    ${'830'}              | ${'830'}
    ${'830-5'}            | ${'8305'}
    ${'830-55'}           | ${'83055'}
    ${'830-555'}          | ${'830555'}
    ${'830-555-0'}        | ${'830-5550'}
    ${'830-555-01'}       | ${'83055501'}
    ${'830-555-012'}      | ${'830555012'}
    ${'830-555-0123'}     | ${'(830) 555-0123'}
    ${'830-555-0123-4'}   | ${'83055501234'}
    ${'1 8'}              | ${undefined}
    ${'1 83'}             | ${'83'}
    ${'1 830'}            | ${'830'}
    ${'1 830-5'}          | ${'8305'}
    ${'1 830-55'}         | ${'83055'}
    ${'1 830-555'}        | ${'830555'}
    ${'1 830-555-0'}      | ${'830-5550'}
    ${'1 830-555-01'}     | ${'83055501'}
    ${'1 830-555-012'}    | ${'830555012'}
    ${'1 830-555-0123'}   | ${'(830) 555-0123'}
    ${'1 830-555-0123-4'} | ${'83055501234'}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.toNational(input)).toEqual(output);
  });
});

describe('.toInternational', () => {
  test.each`
    input                 | output
    ${''}                 | ${undefined}
    ${null}               | ${undefined}
    ${undefined}          | ${undefined}
    ${'8'}                | ${undefined}
    ${'83'}               | ${'+1 83'}
    ${'830'}              | ${'+1 830'}
    ${'830-5'}            | ${'+1 8305'}
    ${'830-55'}           | ${'+1 83055'}
    ${'830-555'}          | ${'+1 830555'}
    ${'830-555-0'}        | ${'+1 8305550'}
    ${'830-555-01'}       | ${'+1 83055501'}
    ${'830-555-012'}      | ${'+1 830555012'}
    ${'830-555-0123'}     | ${'+1 830-555-0123'}
    ${'830-555-0123-4'}   | ${'+1 83055501234'}
    ${'1 8'}              | ${undefined}
    ${'1 83'}             | ${'+1 83'}
    ${'1 830'}            | ${'+1 830'}
    ${'1 830-5'}          | ${'+1 8305'}
    ${'1 830-55'}         | ${'+1 83055'}
    ${'1 830-555'}        | ${'+1 830555'}
    ${'1 830-555-0'}      | ${'+1 8305550'}
    ${'1 830-555-01'}     | ${'+1 83055501'}
    ${'1 830-555-012'}    | ${'+1 830555012'}
    ${'1 830-555-0123'}   | ${'+1 830-555-0123'}
    ${'1 830-555-0123-4'} | ${'+1 83055501234'}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.toInternational(input)).toEqual(output);
  });
});

describe('.toE164', () => {
  test.each`
    input                 | output
    ${''}                 | ${undefined}
    ${null}               | ${undefined}
    ${undefined}          | ${undefined}
    ${'8'}                | ${undefined}
    ${'83'}               | ${'+183'}
    ${'830'}              | ${'+1830'}
    ${'830-5'}            | ${'+18305'}
    ${'830-55'}           | ${'+183055'}
    ${'830-555'}          | ${'+1830555'}
    ${'830-555-0'}        | ${'+18305550'}
    ${'830-555-01'}       | ${'+183055501'}
    ${'830-555-012'}      | ${'+1830555012'}
    ${'830-555-0123'}     | ${'+18305550123'}
    ${'830-555-0123-4'}   | ${'+183055501234'}
    ${'1 8'}              | ${undefined}
    ${'1 83'}             | ${'+183'}
    ${'1 830'}            | ${'+1830'}
    ${'1 830-5'}          | ${'+18305'}
    ${'1 830-55'}         | ${'+183055'}
    ${'1 830-555'}        | ${'+1830555'}
    ${'1 830-555-0'}      | ${'+18305550'}
    ${'1 830-555-01'}     | ${'+183055501'}
    ${'1 830-555-012'}    | ${'+1830555012'}
    ${'1 830-555-0123'}   | ${'+18305550123'}
    ${'1 830-555-0123-4'} | ${'+183055501234'}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.toE164(input)).toEqual(output);
  });
});

describe('.toRFC3966', () => {
  test.each`
    input                 | output
    ${''}                 | ${undefined}
    ${null}               | ${undefined}
    ${undefined}          | ${undefined}
    ${'8'}                | ${undefined}
    ${'83'}               | ${'tel:+1-83'}
    ${'830'}              | ${'tel:+1-830'}
    ${'830-5'}            | ${'tel:+1-8305'}
    ${'830-55'}           | ${'tel:+1-83055'}
    ${'830-555'}          | ${'tel:+1-830555'}
    ${'830-555-0'}        | ${'tel:+1-8305550'}
    ${'830-555-01'}       | ${'tel:+1-83055501'}
    ${'830-555-012'}      | ${'tel:+1-830555012'}
    ${'830-555-0123'}     | ${'tel:+1-830-555-0123'}
    ${'830-555-0123-4'}   | ${'tel:+1-83055501234'}
    ${'1 8'}              | ${undefined}
    ${'1 83'}             | ${'tel:+1-83'}
    ${'1 830'}            | ${'tel:+1-830'}
    ${'1 830-5'}          | ${'tel:+1-8305'}
    ${'1 830-55'}         | ${'tel:+1-83055'}
    ${'1 830-555'}        | ${'tel:+1-830555'}
    ${'1 830-555-0'}      | ${'tel:+1-8305550'}
    ${'1 830-555-01'}     | ${'tel:+1-83055501'}
    ${'1 830-555-012'}    | ${'tel:+1-830555012'}
    ${'1 830-555-0123'}   | ${'tel:+1-830-555-0123'}
    ${'1 830-555-0123-4'} | ${'tel:+1-83055501234'}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.toRFC3966(input)).toEqual(output);
  });
});
