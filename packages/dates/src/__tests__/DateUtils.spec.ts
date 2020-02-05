import {
  DateFormat,
  DateObject,
  DateUnit,
  DateUtils,
  isDate,
  isDateLike,
  isValidDate,
  parseDate,
  stringifyDate,
  toDate,
  toDateRange,
} from '../DateUtils';

const invalidDate = () => new Date(NaN);
const invalidDateObject = (): DateObject => ({
  year: NaN,
  month: NaN,
  day: NaN,
  hour: NaN,
  minute: NaN,
  second: NaN,
  millisecond: NaN,
});
const mockDateObject = ({
  year = 2019,
  month = 5,
  day = 24,
  hour = 1,
  minute = 2,
  second = 3,
  millisecond = 45,
}: Partial<DateObject> = {}): DateObject => ({
  year,
  month,
  day,
  hour,
  minute,
  second,
  millisecond,
});
function mockTimestamp(values?: Partial<DateObject>): number {
  const {
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  } = mockDateObject(values);

  return Date.UTC(year, month - 1, day, hour, minute, second, millisecond);
}
function mockDate(values?: Partial<DateObject>): Date {
  return new Date(mockTimestamp(values));
}

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
  ${invalidDate()}             | ${true}  | ${true}  | ${false}
  ${new Date(0).toISOString()} | ${false} | ${false} | ${false}
`('validates "$input"', ({ input, date, dateLike, validDate }) => {
  expect(isDate(input)).toBe(date);
  expect(isDateLike(input)).toBe(dateLike);
  expect(isValidDate(input)).toBe(validDate);
});

test.each`
  input              | result
  ${null}            | ${invalidDate()}
  ${undefined}       | ${invalidDate()}
  ${'foo'}           | ${invalidDate()}
  ${NaN}             | ${invalidDate()}
  ${Infinity}        | ${invalidDate()}
  ${mockDate()}      | ${mockDate()}
  ${mockTimestamp()} | ${mockDate()}
`('toDate($input) => $result', ({ input, result }) => {
  expect(toDate(input)).toBeSameDate(result);
});

test.each([
  [undefined, undefined, undefined, undefined],
  [invalidDate(), undefined, invalidDate(), undefined],
  [undefined, invalidDate(), invalidDate(), undefined],
  [invalidDate(), invalidDate(), invalidDate(), invalidDate()],
  [mockTimestamp(), invalidDate(), invalidDate(), mockDate()],
  [invalidDate(), mockTimestamp(), invalidDate(), mockDate()],
  [mockTimestamp(), undefined, mockDate(), undefined],
  [undefined, mockTimestamp(), mockDate(), undefined],
  [
    mockTimestamp({ year: 2019 }),
    mockTimestamp({ year: 2020 }),
    mockDate({ year: 2019 }),
    mockDate({ year: 2020 }),
  ],
])(
  'toDateRange(%p, %p)',
  (rawStart, rawFinish, expectedStart, expectedFinish) => {
    const [start, finish] = toDateRange([rawStart, rawFinish]);

    expect(start).toBeSameDate(expectedStart);
    expect(finish).toBeSameDate(expectedFinish);
  },
);

describe('parseDate', () => {
  test.each([
    [null, invalidDate()],
    [undefined, invalidDate()],
    ['', invalidDate()],
    [NaN, invalidDate()],
    [Infinity, invalidDate()],
    [0.1, invalidDate()],
    [invalidDate(), invalidDate()],
    [mockDate(), mockDate()],
    [mockTimestamp(), mockDate()],
    [
      '2019-05-24',
      mockDate({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
      mockDate({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
      invalidDate(),
    ],
    ['2019-05-24T01:02:03.045Z', mockDate(), mockDate(), invalidDate()],
    ['2019-05-24T01:02:03.045+0000', mockDate()],
    ['2019-05-24T01:02:03.045+0500', mockDate({ day: 23, hour: 20 })],
    ['2019-05-24T01:02:03.045-0500', mockDate({ hour: 6 })],
    ['2019-05-24T01:02:03.045678+0000', mockDate(), mockDate(), invalidDate()],
    [
      '2019-05-24T01:02:03.045678+0500',
      mockDate({ day: 23, hour: 20 }),
      mockDate({ day: 23, hour: 20 }),
      invalidDate(),
    ],
    [
      '2019-05-24T01:02:03.045678-0500',
      mockDate({ hour: 6 }),
      mockDate({ hour: 6 }),
      invalidDate(),
    ],
  ])('parseDate(%p)', (input, date, dateTime = date, joda = date) => {
    expect(parseDate(input, 'toString' as any)).toBeSameDate(invalidDate());
    expect(parseDate(input, 'DateISO')).toBeSameDate(date);
    expect(parseDate(input, 'DateTimeISO')).toBeSameDate(dateTime);
    expect(parseDate(input, 'JodaISO')).toBeSameDate(joda);
  });
});

describe('stringifyDate', () => {
  test.each(allFormats)('stringify invalid value with %p', format => {
    expect(stringifyDate(NaN, format)).toBe('Invalid Date');
    expect(stringifyDate(Infinity, format)).toBe('Invalid Date');
    expect(stringifyDate(invalidDate(), format)).toBe('Invalid Date');
  });

  test.each(Array.from(formatExamples))(
    'stringifyDate(value, %p)',
    (format, example) => {
      expect(stringifyDate(mockDate(), format)).toEqual(example);
    },
  );
});

test('DateUtils#constructor', () => {
  const defaultUtils = new DateUtils();

  expect(defaultUtils.locale).toMatchInlineSnapshot(`"en-US"`);
  expect(defaultUtils.timeZoneOffset).toMatchInlineSnapshot(`0`);

  const utilsA = new DateUtils({ timeZoneOffset: 300 });

  expect(utilsA.locale).toMatchInlineSnapshot(`"en-US"`);
  expect(utilsA.timeZoneOffset).toMatchInlineSnapshot(`300`);

  const utilsB = new DateUtils({ timeZoneOffset: -300 });

  expect(utilsB.locale).toMatchInlineSnapshot(`"en-US"`);
  expect(utilsB.timeZoneOffset).toMatchInlineSnapshot(`-300`);
});

test.each([
  [
    invalidDate(),
    invalidDateObject(),
    invalidDateObject(),
    invalidDateObject(),
  ],
  [
    mockDate({ day: 24, hour: 1 }),
    mockDateObject({ day: 24, hour: 1 }),
    mockDateObject({ day: 24, hour: 6 }),
    mockDateObject({ day: 23, hour: 20 }),
  ],
  [
    mockTimestamp({ day: 24, hour: 1 }),
    mockDateObject({ day: 24, hour: 1 }),
    mockDateObject({ day: 24, hour: 6 }),
    mockDateObject({ day: 23, hour: 20 }),
  ],
])('DateUtils#toObject(%p)', (date, utc, plus300, minus300) => {
  const utils = new DateUtils();
  const utils0 = new DateUtils({ timeZoneOffset: 0 });
  const utilsPlus300 = new DateUtils({ timeZoneOffset: +300 });
  const utilsMinus300 = new DateUtils({ timeZoneOffset: -300 });

  expect(utils.toObject(date)).toEqual(utc);
  expect(utils0.toObject(date)).toEqual(utc);

  expect(utilsPlus300.toObject(date)).toEqual(plus300);
  expect(utilsMinus300.toObject(date)).toEqual(minus300);
});

test.each([
  [invalidDateObject(), invalidDate(), invalidDate(), invalidDate()],
  [
    mockDateObject({ day: 24, hour: 1 }),
    mockDate({ day: 24, hour: 1 }),
    mockDate({ day: 23, hour: 20 }),
    mockDate({ day: 24, hour: 6 }),
  ],
])('DateUtils#fromObject(%p)', (date, utc, plus300, minus300) => {
  const utils = new DateUtils();
  const utils0 = new DateUtils({ timeZoneOffset: 0 });
  const utilsPlus300 = new DateUtils({ timeZoneOffset: +300 });
  const utilsMinus300 = new DateUtils({ timeZoneOffset: -300 });

  expect(utils.fromObject(date)).toBeSameDate(utc);
  expect(utils0.fromObject(date)).toBeSameDate(utc);

  expect(utilsPlus300.fromObject(date)).toBeSameDate(plus300);
  expect(utilsMinus300.fromObject(date)).toBeSameDate(minus300);
});

test.each([
  ['year', invalidDate(), invalidDate()],
  [
    'year',
    mockDate({ year: 2019 }),
    mockDate({
      year: 2019,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    mockDate({
      year: 2018,
      month: 12,
      day: 31,
      hour: 19,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    mockDate({
      year: 2019,
      month: 1,
      day: 1,
      hour: 5,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
  ],
  [
    'month',
    mockDate({ month: 5 }),
    mockDate({
      month: 5,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    mockDate({
      month: 4,
      day: 30,
      hour: 19,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    mockDate({
      month: 5,
      day: 1,
      hour: 5,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
  ],
  [
    'day',
    mockDate({ day: 24 }),
    mockDate({
      day: 24,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    mockDate({
      day: 23,
      hour: 19,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    mockDate({
      day: 23,
      hour: 5,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
  ],
  [
    'hour',
    mockDate({ hour: 4 }),
    mockDate({ hour: 4, minute: 0, second: 0, millisecond: 0 }),
  ],
  [
    'minute',
    mockDate({ minute: 4 }),
    mockDate({ minute: 4, second: 0, millisecond: 0 }),
  ],
  ['second', mockDate({ second: 4 }), mockDate({ second: 4, millisecond: 0 })],
  ['millisecond', mockDate({ millisecond: 4 }), mockDate({ millisecond: 4 })],
])(
  'DateUtils#startOf(%p, %p)',
  (unit: any, value, zero, plus300 = zero, minus300 = zero) => {
    const utils = new DateUtils();
    const utils0 = new DateUtils({ timeZoneOffset: 0 });
    const utilsPlus300 = new DateUtils({ timeZoneOffset: +300 });
    const utilsMinus300 = new DateUtils({ timeZoneOffset: -300 });

    expect(utils.startOf(mockDate(), unit)).toBeSameDate(
      utils.startOf(mockTimestamp(), unit),
    );
    expect(utils.startOf(mockTimestamp(), unit)).toBeSameDate(
      utils.startOf(mockDate(), unit),
    );

    expect(utils.startOf(value, unit)).toBeSameDate(zero);
    expect(utils0.startOf(value, unit)).toBeSameDate(zero);
    expect(utilsPlus300.startOf(value, unit)).toBeSameDate(plus300);
    expect(utilsMinus300.startOf(value, unit)).toBeSameDate(minus300);
  },
);

test.each([
  [
    'year',
    mockDate({ year: 2019 }),
    mockDate({
      year: 2019,
      month: 12,
      day: 31,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
    mockDate({
      year: 2019,
      month: 12,
      day: 31,
      hour: 18,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
    mockDate({
      year: 2020,
      month: 1,
      day: 1,
      hour: 4,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
  ],
  [
    'month',
    mockDate({ month: 5, day: 24 }),
    mockDate({
      month: 5,
      day: 31,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
    mockDate({
      month: 5,
      day: 31,
      hour: 18,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
    mockDate({
      month: 6,
      day: 1,
      hour: 4,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
  ],
  [
    'day',
    mockDate({ year: 2019, month: 5, day: 24, hour: 4 }),
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 18,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 4,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
  ],
  [
    'hour',
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 4,
      minute: 4,
      second: 4,
      millisecond: 999,
    }),
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 4,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
  ],
  [
    'minute',
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 4,
      minute: 4,
      second: 4,
      millisecond: 999,
    }),
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 4,
      minute: 4,
      second: 59,
      millisecond: 999,
    }),
  ],
  [
    'second',
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 4,
      minute: 4,
      second: 4,
      millisecond: 0,
    }),
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 4,
      minute: 4,
      second: 4,
      millisecond: 999,
    }),
  ],
  [
    'millisecond',
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 4,
      minute: 4,
      second: 4,
      millisecond: 333,
    }),
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 4,
      minute: 4,
      second: 4,
      millisecond: 333,
    }),
  ],
])(
  'DateUtils#endOf(%p, %p)',
  (unit: any, value, zero, plus300 = zero, minus300 = zero) => {
    const utils = new DateUtils();
    const utils0 = new DateUtils({ timeZoneOffset: 0 });
    const utilsPlus300 = new DateUtils({ timeZoneOffset: +300 });
    const utilsMinus300 = new DateUtils({ timeZoneOffset: -300 });

    expect(utils.endOf(mockDate(), unit)).toBeSameDate(
      utils.endOf(mockTimestamp(), unit),
    );

    expect(utils.endOf(mockTimestamp(), unit)).toBeSameDate(
      utils.endOf(mockDate(), unit),
    );

    expect(utils.endOf(value, unit)).toBeSameDate(zero);
    expect(utils0.endOf(value, unit)).toBeSameDate(zero);
    expect(utilsPlus300.endOf(value, unit)).toBeSameDate(plus300);
    expect(utilsMinus300.endOf(value, unit)).toBeSameDate(minus300);
  },
);

test.each([
  [
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 1,
      minute: 2,
      second: 3,
      millisecond: 45,
    }),
    mockDateObject({
      year: 1,
      month: 2,
      day: 3,
      hour: 4,
      minute: 5,
      second: 6,
      millisecond: 7,
    }),
    mockDate({
      year: 2020,
      month: 7,
      day: 27,
      hour: 5,
      minute: 7,
      second: 9,
      millisecond: 52,
    }),
  ],
])('DateUtils#plus(%p, %p) => %p', (date, values, result) => {
  const utils = new DateUtils();

  expect(utils.plus(date, values)).toBeSameDate(result);
});

test.each([
  [
    mockDate({
      year: 2020,
      month: 7,
      day: 27,
      hour: 5,
      minute: 7,
      second: 9,
      millisecond: 52,
    }),
    mockDateObject({
      year: 1,
      month: 2,
      day: 3,
      hour: 4,
      minute: 5,
      second: 6,
      millisecond: 7,
    }),
    mockDate({
      year: 2019,
      month: 5,
      day: 24,
      hour: 1,
      minute: 2,
      second: 3,
      millisecond: 45,
    }),
  ],
])('DateUtils#minus(%p, %p) => %p', (date, values, result) => {
  const utils = new DateUtils();

  expect(utils.minus(date, values)).toBeSameDate(result);
});

test.each`
  value              | compare            | result
  ${null}            | ${undefined}       | ${true}
  ${null}            | ${mockDate()}      | ${false}
  ${null}            | ${mockTimestamp()} | ${false}
  ${undefined}       | ${mockDate()}      | ${false}
  ${undefined}       | ${mockTimestamp()} | ${false}
  ${mockDate()}      | ${new Date()}      | ${false}
  ${mockTimestamp()} | ${new Date()}      | ${false}
  ${mockDate()}      | ${Date.now()}      | ${false}
  ${mockTimestamp()} | ${Date.now()}      | ${false}
  ${mockDate()}      | ${mockTimestamp()} | ${true}
`(
  'DateRange#isSameDate($value, $compare) => $result',
  ({ value, compare, result }) => {
    const utils = new DateUtils();

    [undefined, ...allUnits].forEach(unit => {
      expect(utils.isSameDate(value, compare, unit)).toBe(result);
      expect(utils.isSameDate(compare, value, unit)).toBe(result);

      expect(utils.isSameDate(value, value, unit)).toBe(true);
      expect(utils.isSameDate(compare, compare, unit)).toBe(true);
    });
  },
);

test.each`
  value                         | compare                         | result
  ${[null, undefined]}          | ${[undefined, null]}            | ${true}
  ${[mockDate(), undefined]}    | ${[undefined, new Date()]}      | ${false}
  ${[mockDate(), undefined]}    | ${[undefined, mockTimestamp()]} | ${true}
  ${[invalidDate(), undefined]} | ${[undefined, invalidDate()]}   | ${false}
`(
  'DateRange#isSameDateRange($value, $compare) => $result',
  ({ value, compare, result }) => {
    const utils = new DateUtils();

    [undefined, ...allUnits].forEach(unit => {
      expect(utils.isSameDateRange(value, compare, unit)).toBe(result);
      expect(utils.isSameDateRange(compare, value, unit)).toBe(result);
    });
  },
);

test.each`
  unit             | value                       | compare                     | result
  ${'year'}        | ${mockDate({ year: 2019 })} | ${mockDate({ year: 2020 })} | ${-1}
  ${'month'}       | ${mockDate({ year: 2019 })} | ${mockDate({ year: 2020 })} | ${-12}
  ${'month'}       | ${mockDate({ month: 5 })}   | ${mockDate({ month: 12 })}  | ${-7}
  ${'day'}         | ${mockDate({ month: 5 })}   | ${mockDate({ month: 12 })}  | ${-214}
  ${'day'}         | ${mockDate({ day: 24 })}    | ${mockDate({ day: 30 })}    | ${-6}
  ${'hours'}       | ${mockDate({ day: 24 })}    | ${mockDate({ day: 30 })}    | ${-144}
  ${'hour'}        | ${mockDate({ hour: 15 })}   | ${mockDate({ hour: 40 })}   | ${-25}
  ${'minute'}      | ${mockDate({ hour: 15 })}   | ${mockDate({ hour: 40 })}   | ${-1500}
  ${'minute'}      | ${mockDate({ minute: 15 })} | ${mockDate({ minute: 40 })} | ${-25}
  ${'second'}      | ${mockDate({ minute: 15 })} | ${mockDate({ minute: 40 })} | ${-1500}
  ${'second'}      | ${mockDate({ second: 15 })} | ${mockDate({ second: 40 })} | ${-25}
  ${'millisecond'} | ${mockDate({ second: 15 })} | ${mockDate({ second: 40 })} | ${-25000}
`(
  'DateUtils#diff($value, $compare, $unit)',
  ({ value, compare, unit, result }) => {
    const utils = new DateUtils();

    expect(utils.diff(value, compare, unit)).toBe(result);
  },
);

test.each([
  [mockDate({ year: 2019 }), mockDate({ year: 2020 }), 'year', -1],
  [mockDate({ year: 2019 }), mockDate({ year: 2020 }), 'month', -12],
  [mockDate({ month: 5 }), mockDate({ month: 12 }), 'month', -7],
  [mockDate({ month: 5 }), mockDate({ month: 12 }), 'day', -214],
  [mockDate({ day: 24 }), mockDate({ day: 30 }), 'day', -6],
  [mockDate({ day: 24 }), mockDate({ day: 30 }), 'hours', -144],
  [mockDate({ hour: 15 }), mockDate({ hour: 40 }), 'hour', -25],
  [mockDate({ hour: 15 }), mockDate({ hour: 40 }), 'minute', -1500],
  [mockDate({ minute: 15 }), mockDate({ minute: 40 }), 'minute', -25],
  [mockDate({ minute: 15 }), mockDate({ minute: 40 }), 'second', -1500],
  [mockDate({ second: 15 }), mockDate({ second: 40 }), 'second', -25],
  [mockDate({ second: 15 }), mockDate({ second: 40 }), 'millisecond', -25000],
  [
    mockDate({ millisecond: 15 }),
    mockDate({ millisecond: 40 }),
    'millisecond',
    -25,
  ],
])('DateUtils#diff(%p, %p, %p)', (value, compare, unit: any, result) => {
  const utils = new DateUtils();

  expect(utils.diff(value, compare, unit)).toBe(result);
});

test.each`
  tz      | date              | shortDate   | time         | dateTime
  ${0}    | ${'May 24, 2019'} | ${'May 24'} | ${'1:02 AM'} | ${'May 24, 2019, 1:02 AM'}
  ${+300} | ${'May 24, 2019'} | ${'May 24'} | ${'6:02 AM'} | ${'May 24, 2019, 6:02 AM'}
  ${-300} | ${'May 23, 2019'} | ${'May 23'} | ${'8:02 PM'} | ${'May 23, 2019, 8:02 PM'}
`(
  'DateUtils({ timeZoneOffset: $tz })#format()',
  ({ tz, date, shortDate, time, dateTime }) => {
    const utils = new DateUtils({ timeZoneOffset: tz });

    expect(utils.format(mockDate(), 'date')).toBe(date);
    expect(utils.format(mockTimestamp(), 'date')).toBe(date);

    expect(utils.format(mockDate(), 'shortDate')).toBe(shortDate);
    expect(utils.format(mockTimestamp(), 'shortDate')).toBe(shortDate);

    expect(utils.format(mockDate(), 'time')).toBe(time);
    expect(utils.format(mockTimestamp(), 'time')).toBe(time);

    expect(utils.format(mockDate(), 'dateTime')).toBe(dateTime);
    expect(utils.format(mockTimestamp(), 'dateTime')).toBe(dateTime);
  },
);

test.each([
  [undefined, undefined, ''],
  [invalidDate(), undefined, 'Invalid Date Range'],
  [invalidDate(), invalidDate(), 'Invalid Date Range'],
  [mockDate(), invalidDate(), 'Invalid Date Range'],
  [mockDate(), undefined, 'May 24, 2019 - …'],
  [mockDate({ month: 5 }), mockDate({ month: 6 }), 'May 24 - Jun 24, 2019'],
  [
    mockDate({ year: 2020 }),
    mockDate({ year: 2019 }),
    'May 24, 2019 - May 24, 2020',
  ],
])('DateUtils#formatDateRange', (start, end, result) => {
  const utils = new DateUtils();

  expect(utils.formatRange([start, end])).toBe(result);
  expect(utils.formatRange([end, start])).toBe(result);
});

test.each`
  offsets                | narrow          | short           | long
  ${[NaN]}               | ${'in 0 sec.'}  | ${'in 0 sec.'}  | ${'in 0 seconds'}
  ${[-3]}                | ${'in 3 yr.'}   | ${'in 3 yr.'}   | ${'in 3 years'}
  ${[+3]}                | ${'3 yr. ago'}  | ${'3 yr. ago'}  | ${'3 years ago'}
  ${[0, -3]}             | ${'in 3 mo.'}   | ${'in 3 mo.'}   | ${'in 3 months'}
  ${[0, +3]}             | ${'3 mo. ago'}  | ${'3 mo. ago'}  | ${'3 months ago'}
  ${[0, 0, -3]}          | ${'in 3 days'}  | ${'in 3 days'}  | ${'in 3 days'}
  ${[0, 0, +3]}          | ${'3 days ago'} | ${'3 days ago'} | ${'3 days ago'}
  ${[0, 0, 0, -3]}       | ${'in 3 hr.'}   | ${'in 3 hr.'}   | ${'in 3 hours'}
  ${[0, 0, 0, +3]}       | ${'3 hr. ago'}  | ${'3 hr. ago'}  | ${'3 hours ago'}
  ${[0, 0, 0, 0, -3]}    | ${'in 3 min.'}  | ${'in 3 min.'}  | ${'in 3 minutes'}
  ${[0, 0, 0, 0, +3]}    | ${'3 min. ago'} | ${'3 min. ago'} | ${'3 minutes ago'}
  ${[0, 0, 0, 0, 0, -3]} | ${'in 3 sec.'}  | ${'in 3 sec.'}  | ${'in 3 seconds'}
  ${[0, 0, 0, 0, 0, +3]} | ${'3 sec. ago'} | ${'3 sec. ago'} | ${'3 seconds ago'}
`(
  'DateUtils#formatRelativeTime($offsets)',
  ({ offsets, narrow, short, long }) => {
    const utils = new DateUtils();
    const args = [2019, 4, 24, 0, 0, 0] as const;
    const value = new Date(...args);
    const compare = new Date(
      ...(args.map((arg, idx) => {
        const offset = offsets[idx];

        return arg + (offset == null ? 0 : offset);
      }) as [number]),
    );

    expect(utils.formatRelativeTime(value, compare, { style: 'narrow' })).toBe(
      narrow,
    );
    expect(utils.formatRelativeTime(value, compare, { style: 'short' })).toBe(
      short,
    );
    expect(utils.formatRelativeTime(value, compare, { style: 'long' })).toBe(
      long,
    );
    expect(utils.formatRelativeTime(value, compare)).toBe(long);
  },
);
