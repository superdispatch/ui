import {
  DateFormat,
  DateUnit,
  DateUtils,
  isDate,
  isDateLike,
  isSameDate,
  isValidDate,
  parseDate,
  stringifyDate,
  toDate,
  toDateRange,
} from '../DateUtils';

const INVALID_DATE = new Date(NaN);
const mockTimestamp = (timezoneOffset = 0) =>
  Date.UTC(2019, 4, 24, 1, 2 - timezoneOffset, 3, 45);
const mockDate = (timezoneOffset?: number) =>
  new Date(mockTimestamp(timezoneOffset));

const formatExamples = new Map<DateFormat, string>()
  .set('DateISO', '2019-05-24')
  .set('JodaISO', '2019-05-24T01:02:03.045+0000')
  .set('DateTimeISO', '2019-05-24T01:02:03.045Z');

const allFormats: DateFormat[] = Array.from(formatExamples.keys());
const allUnits: DateUnit[] = [
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'millisecond',
];

test.each`
  input                        | date     | dateLike | validDate
  ${null}                      | ${false} | ${false} | ${false}
  ${undefined}                 | ${false} | ${false} | ${false}
  ${''}                        | ${false} | ${false} | ${false}
  ${NaN}                       | ${false} | ${false} | ${false}
  ${Infinity}                  | ${false} | ${false} | ${false}
  ${0}                         | ${false} | ${true}  | ${false}
  ${0.1}                       | ${false} | ${false} | ${false}
  ${Date.UTC(2020, 0)}         | ${false} | ${true}  | ${false}
  ${new Date(0)}               | ${true}  | ${true}  | ${true}
  ${INVALID_DATE}              | ${true}  | ${true}  | ${false}
  ${new Date(0).toISOString()} | ${false} | ${false} | ${false}
`('validates "$input"', ({ input, date, dateLike, validDate }) => {
  expect(isDate(input)).toBe(date);
  expect(isDateLike(input)).toBe(dateLike);
  expect(isValidDate(input)).toBe(validDate);
});

test.each`
  input              | result
  ${null}            | ${INVALID_DATE}
  ${undefined}       | ${INVALID_DATE}
  ${'foo'}           | ${INVALID_DATE}
  ${NaN}             | ${INVALID_DATE}
  ${Infinity}        | ${INVALID_DATE}
  ${mockDate()}      | ${mockDate()}
  ${mockTimestamp()} | ${mockDate()}
`('toDate($input) => $result', ({ input, result }) => {
  expect(toDate(input)).toBeInstanceOf(Date);
  expect(toDate(input).getTime()).toBe(result.getTime());
});

test.each([
  [undefined, undefined, undefined, undefined],
  [INVALID_DATE, undefined, INVALID_DATE, undefined],
  [undefined, INVALID_DATE, INVALID_DATE, undefined],
  [INVALID_DATE, INVALID_DATE, INVALID_DATE, INVALID_DATE],
  [
    Date.UTC(2019, 4, 24),
    INVALID_DATE,
    new Date(Date.UTC(2019, 4, 24)),
    INVALID_DATE,
  ],
  [
    INVALID_DATE,
    Date.UTC(2019, 4, 24),
    INVALID_DATE,
    new Date(Date.UTC(2019, 4, 24)),
  ],
  [
    Date.UTC(2019, 4, 24),
    undefined,
    new Date(Date.UTC(2019, 4, 24)),
    undefined,
  ],
  [
    undefined,
    Date.UTC(2019, 4, 24),
    new Date(Date.UTC(2019, 4, 24)),
    undefined,
  ],
  [
    Date.UTC(2019, 4, 24),
    Date.UTC(2020, 4, 24),
    new Date(Date.UTC(2019, 4, 24)),
    new Date(Date.UTC(2020, 4, 24)),
  ],
  [
    Date.UTC(2020, 4, 24),
    Date.UTC(2019, 4, 24),
    new Date(Date.UTC(2019, 4, 24)),
    new Date(Date.UTC(2020, 4, 24)),
  ],
])('toDateRange(%p, %p)', (start, end, resultStart, resultEnd) => {
  const range = toDateRange([start, end]);

  expect(range[0]?.getTime()).toBe(resultStart?.getTime());
  expect(range[1]?.getTime()).toBe(resultEnd?.getTime());

  // console.log()

  // expect(toDateRange([start, end])).toEqual([resultStart, resultEnd]);
  // expect(toDateRange([end, start])).toEqual([resultStart, resultEnd]);
});

test.each`
  value              | compare            | result
  ${null}            | ${undefined}       | ${true}
  ${null}            | ${mockDate()}      | ${false}
  ${null}            | ${mockTimestamp()} | ${false}
  ${undefined}       | ${mockDate()}      | ${false}
  ${undefined}       | ${mockTimestamp()} | ${false}
  ${mockDate()}      | ${mockTimestamp()} | ${true}
  ${mockDate()}      | ${new Date()}      | ${false}
  ${mockTimestamp()} | ${new Date()}      | ${false}
  ${mockDate()}      | ${Date.now()}      | ${false}
  ${mockTimestamp()} | ${Date.now()}      | ${false}
`('isSameDate($value, $compare) => $result', ({ value, compare, result }) => {
  [undefined, ...allUnits].forEach(unit => {
    expect(isSameDate(value, compare, unit)).toBe(result);
    expect(isSameDate(compare, value, unit)).toBe(result);

    expect(isSameDate(value, value, unit)).toBe(true);
    expect(isSameDate(compare, compare, unit)).toBe(true);
  });
});

describe('parseDate', () => {
  test.each([
    [null, INVALID_DATE, INVALID_DATE, INVALID_DATE],
    [undefined, INVALID_DATE, INVALID_DATE, INVALID_DATE],
    ['', INVALID_DATE, INVALID_DATE, INVALID_DATE],
    [NaN, INVALID_DATE, INVALID_DATE, INVALID_DATE],
    [Infinity, INVALID_DATE, INVALID_DATE, INVALID_DATE],
    [0, new Date(0), new Date(0), new Date(0)],
    [0.1, INVALID_DATE, INVALID_DATE, INVALID_DATE],
    [INVALID_DATE, INVALID_DATE, INVALID_DATE, INVALID_DATE],
    [mockDate(), mockDate(), mockDate(), mockDate()],
    [mockTimestamp(), mockDate(), mockDate(), mockDate()],
    [
      '2019-05-24',
      new Date(Date.UTC(2019, 4, 24)),
      new Date(Date.UTC(2019, 4, 24)),
      INVALID_DATE,
    ],
    ['2019-05-24T01:02:03.045Z', mockDate(), mockDate(), INVALID_DATE],
    ['2019-05-24T01:02:03.045+0000', mockDate(), mockDate(), mockDate()],
    [
      '2019-05-24T01:02:03.045+0500',
      mockDate(+300),
      mockDate(+300),
      mockDate(+300),
    ],
    [
      '2019-05-24T01:02:03.045-0500',
      mockDate(-300),
      mockDate(-300),
      mockDate(-300),
    ],
  ])('parse %p', (input, date, dateTime, joda) => {
    expect(parseDate(input, 'toString' as any).getTime()).toBeNaN();
    expect(parseDate(input, 'DateISO').getTime()).toBe(date.getTime());
    expect(parseDate(input, 'DateTimeISO').getTime()).toBe(dateTime.getTime());
    expect(parseDate(input, 'JodaISO').getTime()).toBe(joda.getTime());
  });
});

describe('stringifyDate', () => {
  test.each(allFormats)('stringify invalid value with %p', format => {
    expect(stringifyDate(NaN, format)).toBe('Invalid Date');
    expect(stringifyDate(Infinity, format)).toBe('Invalid Date');
    expect(stringifyDate(INVALID_DATE, format)).toBe('Invalid Date');
  });

  test.each(Array.from(formatExamples))(
    'stringifyDate(value, %p)',
    (format, example) => {
      expect(stringifyDate(mockDate(), format)).toEqual(example);
    },
  );
});

test.each([
  [
    'year',
    Date.UTC(2019, 0, 1),
    Date.UTC(2019, 0, 1, -5),
    Date.UTC(2019, 0, 1, +5),
  ],
  [
    'month',
    Date.UTC(2019, 4, 1),
    Date.UTC(2019, 4, 1, -5),
    Date.UTC(2019, 4, 1, +5),
  ],
  [
    'day',
    Date.UTC(2019, 4, 24),
    Date.UTC(2019, 4, 24, -5),
    Date.UTC(2019, 4, 23, +5),
  ],
  ['hour', Date.UTC(2019, 4, 24, 1)],
  ['minute', Date.UTC(2019, 4, 24, 1, 2)],
  ['second', Date.UTC(2019, 4, 24, 1, 2, 3)],
])(
  'DateUtils#startOf(value, %p)',
  (unit: any, zero, plus300 = zero, minus300 = zero) => {
    const utils = new DateUtils();
    const utils0 = new DateUtils({ timeZoneOffset: 0 });
    const utilsPlus300 = new DateUtils({ timeZoneOffset: +300 });
    const utilsMinus300 = new DateUtils({ timeZoneOffset: -300 });

    expect(utils.startOf(mockDate(), unit)).toEqual(
      utils.startOf(mockTimestamp(), unit),
    );

    expect(utils.startOf(mockTimestamp(), unit)).toEqual(
      utils.startOf(mockDate(), unit),
    );

    expect(utils.startOf(mockDate(), unit)).toEqual(new Date(zero));
    expect(utils0.startOf(mockDate(), unit)).toEqual(new Date(zero));
    expect(utilsPlus300.startOf(mockDate(), unit)).toEqual(new Date(plus300));
    expect(utilsMinus300.startOf(mockDate(), unit)).toEqual(new Date(minus300));
  },
);

test.each([
  [
    'year',
    Date.UTC(2019, 11, 31, 23, 59, 59, 999),
    Date.UTC(2019, 11, 31, 18, 59, 59, 999),
    Date.UTC(2020, 0, 1, 4, 59, 59, 999),
  ],
  [
    'month',
    Date.UTC(2019, 4, 31, 23, 59, 59, 999),
    Date.UTC(2019, 4, 31, 18, 59, 59, 999),
    Date.UTC(2019, 5, 1, 4, 59, 59, 999),
  ],
  [
    'day',
    Date.UTC(2019, 4, 24, 23, 59, 59, 999),
    Date.UTC(2019, 4, 24, 18, 59, 59, 999),
    Date.UTC(2019, 4, 24, 4, 59, 59, 999),
  ],
  ['hour', Date.UTC(2019, 4, 24, 1, 59, 59, 999)],
  ['minute', Date.UTC(2019, 4, 24, 1, 2, 59, 999)],
  ['second', Date.UTC(2019, 4, 24, 1, 2, 3, 999)],
])(
  'DateUtils#endOf(value, %p)',
  (unit: any, zero, plus300 = zero, minus300 = zero) => {
    const utils = new DateUtils();
    const utils0 = new DateUtils({ timeZoneOffset: 0 });
    const utilsPlus300 = new DateUtils({ timeZoneOffset: +300 });
    const utilsMinus300 = new DateUtils({ timeZoneOffset: -300 });

    expect(utils.endOf(mockDate(), unit)).toEqual(
      utils.endOf(mockTimestamp(), unit),
    );

    expect(utils.endOf(mockTimestamp(), unit)).toEqual(
      utils.endOf(mockDate(), unit),
    );

    expect(utils.endOf(mockDate(), unit)).toEqual(new Date(zero));
    expect(utils0.endOf(mockDate(), unit)).toEqual(new Date(zero));
    expect(utilsPlus300.endOf(mockDate(), unit)).toEqual(new Date(plus300));
    expect(utilsMinus300.endOf(mockDate(), unit)).toEqual(new Date(minus300));
  },
);

test.each`
  tz      | result
  ${0}    | ${'May 24, 2019'}
  ${+300} | ${'May 24, 2019'}
  ${-300} | ${'May 23, 2019'}
`('DateUtils#formatDate', ({ tz, result }) => {
  const utils = new DateUtils({ timeZoneOffset: tz });

  expect(utils.formatDate(mockDate())).toBe(result);
  expect(utils.formatDate(mockTimestamp())).toBe(result);
});

test.each`
  tz      | result
  ${0}    | ${'May 24, 2019, 1:02 AM'}
  ${+300} | ${'May 24, 2019, 6:02 AM'}
  ${-300} | ${'May 23, 2019, 8:02 PM'}
`('DateUtils#formatDateTime', ({ tz, result }) => {
  const utils = new DateUtils({ timeZoneOffset: tz });

  expect(utils.formatDateTime(mockDate())).toBe(result);
  expect(utils.formatDateTime(mockTimestamp())).toBe(result);
});

test.each`
  tz      | result
  ${0}    | ${'May 24, 2019, 1:02 AM'}
  ${+300} | ${'May 24, 2019, 6:02 AM'}
  ${-300} | ${'May 23, 2019, 8:02 PM'}
`('DateUtils#formatDateRange', ({ tz, result }) => {
  const utils = new DateUtils({ timeZoneOffset: tz });

  expect(utils.formatDateTime(mockDate())).toBe(result);
  expect(utils.formatDateTime(mockTimestamp())).toBe(result);
});

test.each([
  [undefined, undefined, ''],
  [INVALID_DATE, undefined, 'Invalid Date Range'],
  [INVALID_DATE, INVALID_DATE, 'Invalid Date Range'],
  [Date.UTC(2020, 4, 24), INVALID_DATE, 'Invalid Date Range'],
  [Date.UTC(2020, 4, 24), undefined, 'May 24, 2020 - …'],
  [Date.UTC(2020, 4, 24), Date.UTC(2020, 5, 24), 'May 24 - Jun 24, 2020'],
  [Date.UTC(2020, 4, 24), Date.UTC(2019, 4, 24), 'May 24, 2019 - May 24, 2020'],
])('DateUtils#formatDateRange', (start, end, result) => {
  const utils = new DateUtils();

  expect(utils.formatDateRange([start, end])).toBe(result);
  expect(utils.formatDateRange([end, start])).toBe(result);
});

test.each`
  offset                     | result
  ${-3}                      | ${'in 3 seconds'}
  ${+3}                      | ${'3 seconds ago'}
  ${-3 * 60}                 | ${'in 3 minutes'}
  ${+3 * 60}                 | ${'3 minutes ago'}
  ${-3 * 60 * 60}            | ${'in 3 hours'}
  ${+3 * 60 * 60}            | ${'3 hours ago'}
  ${-3 * 60 * 60 * 24}       | ${'in 3 days'}
  ${+3 * 60 * 60 * 24}       | ${'3 days ago'}
  ${-3 * 60 * 60 * 24 * 31}  | ${'in 3 months'}
  ${+3 * 60 * 60 * 24 * 31}  | ${'3 months ago'}
  ${-3 * 60 * 60 * 24 * 366} | ${'in 3 years'}
  ${+3 * 60 * 60 * 24 * 366} | ${'3 years ago'}
`('DateUtils#formatRelativeTime', ({ offset, result }) => {
  const utils = new DateUtils();

  expect(
    utils.formatRelativeTime(mockTimestamp(), mockTimestamp() + offset * 1000),
  ).toBe(result);
});
