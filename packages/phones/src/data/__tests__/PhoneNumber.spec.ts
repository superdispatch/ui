import { PhoneNumber } from '../PhoneNumber';

describe('.isPhoneNumberLike', () => {
  test.each`
    input                | output
    ${''}                | ${true}
    ${{ region: 'foo' }} | ${true}
    ${{ region: 1 }}     | ${false}
    ${null}              | ${false}
    ${undefined}         | ${false}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.isPhoneNumberLike(input)).toEqual(output);
  });
});

describe('.fromInternational', () => {
  test.each`
    input                | output
    ${''}                | ${undefined}
    ${null}              | ${undefined}
    ${undefined}         | ${undefined}
    ${'6'}               | ${undefined}
    ${'61'}              | ${{ region: 'US', nationalNumber: '61' }}
    ${'615-9'}           | ${{ region: 'US', nationalNumber: '6159' }}
    ${'615-99'}          | ${{ region: 'US', nationalNumber: '61599' }}
    ${'615-994'}         | ${{ region: 'US', nationalNumber: '615994' }}
    ${'615-994-3'}       | ${{ region: 'US', nationalNumber: '615-9943' }}
    ${'615-994-33'}      | ${{ region: 'US', nationalNumber: '61599433' }}
    ${'615-994-330'}     | ${{ region: 'US', nationalNumber: '615994330' }}
    ${'615-994-3300'}    | ${{ region: 'US', nationalNumber: '(615) 994-3300' }}
    ${'615-994-33001'}   | ${{ region: 'US', nationalNumber: '61599433001' }}
    ${'1 6'}             | ${{ region: 'US', nationalNumber: '16' }}
    ${'1 61'}            | ${{ region: 'US', nationalNumber: '161' }}
    ${'1 615-9'}         | ${{ region: 'US', nationalNumber: '16159' }}
    ${'1 615-99'}        | ${{ region: 'US', nationalNumber: '161599' }}
    ${'1 615-994'}       | ${{ region: 'US', nationalNumber: '1615994' }}
    ${'1 615-994-3'}     | ${{ region: 'US', nationalNumber: '16159943' }}
    ${'1 615-994-33'}    | ${{ region: 'US', nationalNumber: '161599433' }}
    ${'1 615-994-330'}   | ${{ region: 'US', nationalNumber: '1615994330' }}
    ${'1 615-994-3300'}  | ${{ region: 'US', nationalNumber: '(615) 994-3300' }}
    ${'1 615-994-33001'} | ${{ region: 'US', nationalNumber: '61599433001' }}
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
    ${'6'}                | ${'unknown'}
    ${'61'}               | ${'too-short'}
    ${'615-9'}            | ${'too-short'}
    ${'615-99'}           | ${'too-short'}
    ${'615-994'}          | ${'too-short'}
    ${'615-994-3'}        | ${'too-short'}
    ${'615-994-33'}       | ${'too-short'}
    ${'615-994-330'}      | ${'too-short'}
    ${'615-994-3300'}     | ${'is-possible'}
    ${'615-994-33001'}    | ${'too-long'}
    ${'1 6'}              | ${'too-short'}
    ${'1 61'}             | ${'too-short'}
    ${'1 615-9'}          | ${'too-short'}
    ${'1 615-99'}         | ${'too-short'}
    ${'1 615-994'}        | ${'too-short'}
    ${'1 615-994-3'}      | ${'too-short'}
    ${'1 615-994-33'}     | ${'too-short'}
    ${'1 615-994-330'}    | ${'too-short'}
    ${'1 615-994-3300'}   | ${'is-possible'}
    ${'1 615-994-33001'}  | ${'too-long'}
    ${'+1 6'}             | ${'unknown'}
    ${'+1 61'}            | ${'too-short'}
    ${'+1 615-9'}         | ${'too-short'}
    ${'+1 615-99'}        | ${'too-short'}
    ${'+1 615-994'}       | ${'too-short'}
    ${'+1 615-994-3'}     | ${'too-short'}
    ${'+1 615-994-33'}    | ${'too-short'}
    ${'+1 615-994-330'}   | ${'too-short'}
    ${'+1 615-994-3300'}  | ${'is-possible'}
    ${'+1 615-994-33001'} | ${'too-long'}
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
    ${'6'}                | ${undefined}
    ${'61'}               | ${'61'}
    ${'615-9'}            | ${'6159'}
    ${'615-99'}           | ${'61599'}
    ${'615-994'}          | ${'615994'}
    ${'615-994-3'}        | ${'615-9943'}
    ${'615-994-33'}       | ${'61599433'}
    ${'615-994-330'}      | ${'615994330'}
    ${'615-994-3300'}     | ${'(615) 994-3300'}
    ${'615-994-33001'}    | ${'61599433001'}
    ${'1 6'}              | ${'16'}
    ${'1 61'}             | ${'161'}
    ${'1 615-9'}          | ${'16159'}
    ${'1 615-99'}         | ${'161599'}
    ${'1 615-994'}        | ${'1615994'}
    ${'1 615-994-3'}      | ${'16159943'}
    ${'1 615-994-33'}     | ${'161599433'}
    ${'1 615-994-330'}    | ${'1615994330'}
    ${'1 615-994-3300'}   | ${'(615) 994-3300'}
    ${'1 615-994-33001'}  | ${'61599433001'}
    ${'+1 6'}             | ${undefined}
    ${'+1 61'}            | ${'61'}
    ${'+1 615-9'}         | ${'6159'}
    ${'+1 615-99'}        | ${'61599'}
    ${'+1 615-994'}       | ${'615994'}
    ${'+1 615-994-3'}     | ${'615-9943'}
    ${'+1 615-994-33'}    | ${'61599433'}
    ${'+1 615-994-330'}   | ${'615994330'}
    ${'+1 615-994-3300'}  | ${'(615) 994-3300'}
    ${'+1 615-994-33001'} | ${'61599433001'}
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
    ${'6'}                | ${undefined}
    ${'61'}               | ${'+1 61'}
    ${'615-9'}            | ${'+1 6159'}
    ${'615-99'}           | ${'+1 61599'}
    ${'615-994'}          | ${'+1 615994'}
    ${'615-994-3'}        | ${'+1 6159943'}
    ${'615-994-33'}       | ${'+1 61599433'}
    ${'615-994-330'}      | ${'+1 615994330'}
    ${'615-994-3300'}     | ${'+1 615-994-3300'}
    ${'615-994-33001'}    | ${'+1 61599433001'}
    ${'1 6'}              | ${'+1 16'}
    ${'1 61'}             | ${'+1 161'}
    ${'1 615-9'}          | ${'+1 16159'}
    ${'1 615-99'}         | ${'+1 161599'}
    ${'1 615-994'}        | ${'+1 1615994'}
    ${'1 615-994-3'}      | ${'+1 16159943'}
    ${'1 615-994-33'}     | ${'+1 161599433'}
    ${'1 615-994-330'}    | ${'+1 1615994330'}
    ${'1 615-994-3300'}   | ${'+1 615-994-3300'}
    ${'1 615-994-33001'}  | ${'+1 61599433001'}
    ${'+1 6'}             | ${undefined}
    ${'+1 61'}            | ${'+1 61'}
    ${'+1 615-9'}         | ${'+1 6159'}
    ${'+1 615-99'}        | ${'+1 61599'}
    ${'+1 615-994'}       | ${'+1 615994'}
    ${'+1 615-994-3'}     | ${'+1 6159943'}
    ${'+1 615-994-33'}    | ${'+1 61599433'}
    ${'+1 615-994-330'}   | ${'+1 615994330'}
    ${'+1 615-994-3300'}  | ${'+1 615-994-3300'}
    ${'+1 615-994-33001'} | ${'+1 61599433001'}
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
    ${'6'}                | ${undefined}
    ${'61'}               | ${'+161'}
    ${'615-9'}            | ${'+16159'}
    ${'615-99'}           | ${'+161599'}
    ${'615-994'}          | ${'+1615994'}
    ${'615-994-3'}        | ${'+16159943'}
    ${'615-994-33'}       | ${'+161599433'}
    ${'615-994-330'}      | ${'+1615994330'}
    ${'615-994-3300'}     | ${'+16159943300'}
    ${'615-994-33001'}    | ${'+161599433001'}
    ${'1 6'}              | ${'+116'}
    ${'1 61'}             | ${'+1161'}
    ${'1 615-9'}          | ${'+116159'}
    ${'1 615-99'}         | ${'+1161599'}
    ${'1 615-994'}        | ${'+11615994'}
    ${'1 615-994-3'}      | ${'+116159943'}
    ${'1 615-994-33'}     | ${'+1161599433'}
    ${'1 615-994-330'}    | ${'+11615994330'}
    ${'1 615-994-3300'}   | ${'+16159943300'}
    ${'1 615-994-33001'}  | ${'+161599433001'}
    ${'+1 6'}             | ${undefined}
    ${'+1 61'}            | ${'+161'}
    ${'+1 615-9'}         | ${'+16159'}
    ${'+1 615-99'}        | ${'+161599'}
    ${'+1 615-994'}       | ${'+1615994'}
    ${'+1 615-994-3'}     | ${'+16159943'}
    ${'+1 615-994-33'}    | ${'+161599433'}
    ${'+1 615-994-330'}   | ${'+1615994330'}
    ${'+1 615-994-3300'}  | ${'+16159943300'}
    ${'+1 615-994-33001'} | ${'+161599433001'}
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
    ${'6'}                | ${undefined}
    ${'61'}               | ${'tel:+1-61'}
    ${'615-9'}            | ${'tel:+1-6159'}
    ${'615-99'}           | ${'tel:+1-61599'}
    ${'615-994'}          | ${'tel:+1-615994'}
    ${'615-994-3'}        | ${'tel:+1-6159943'}
    ${'615-994-33'}       | ${'tel:+1-61599433'}
    ${'615-994-330'}      | ${'tel:+1-615994330'}
    ${'615-994-3300'}     | ${'tel:+1-615-994-3300'}
    ${'615-994-33001'}    | ${'tel:+1-61599433001'}
    ${'1 6'}              | ${'tel:+1-16'}
    ${'1 61'}             | ${'tel:+1-161'}
    ${'1 615-9'}          | ${'tel:+1-16159'}
    ${'1 615-99'}         | ${'tel:+1-161599'}
    ${'1 615-994'}        | ${'tel:+1-1615994'}
    ${'1 615-994-3'}      | ${'tel:+1-16159943'}
    ${'1 615-994-33'}     | ${'tel:+1-161599433'}
    ${'1 615-994-330'}    | ${'tel:+1-1615994330'}
    ${'1 615-994-3300'}   | ${'tel:+1-615-994-3300'}
    ${'1 615-994-33001'}  | ${'tel:+1-61599433001'}
    ${'+1 6'}             | ${undefined}
    ${'+1 61'}            | ${'tel:+1-61'}
    ${'+1 615-9'}         | ${'tel:+1-6159'}
    ${'+1 615-99'}        | ${'tel:+1-61599'}
    ${'+1 615-994'}       | ${'tel:+1-615994'}
    ${'+1 615-994-3'}     | ${'tel:+1-6159943'}
    ${'+1 615-994-33'}    | ${'tel:+1-61599433'}
    ${'+1 615-994-330'}   | ${'tel:+1-615994330'}
    ${'+1 615-994-3300'}  | ${'tel:+1-615-994-3300'}
    ${'+1 615-994-33001'} | ${'tel:+1-61599433001'}
  `('"$input" → "$output"', ({ input, output }) => {
    expect(PhoneNumber.toRFC3966(input)).toEqual(output);
  });
});
