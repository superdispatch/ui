import { setDefaultTimeZone } from '../date-config/DateConfig';
import {
  DateObject,
  DateUtils,
  isDate,
  isDateLike,
  isDateRange,
  isDateRangeLike,
  isValidDate,
  isValidDateRange,
  NullableDateLike,
  toDate,
  toDateRange,
} from './DateUtils';

function invalidDate() {
  return new Date(NaN);
}

function stubDateObject({
  year = 2019,
  month = 5,
  day = 24,
  hour = 1,
  minute = 2,
  second = 3,
  millisecond = 45,
}: Partial<DateObject> = {}): DateObject {
  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  };
}

function stubTimestamp(values?: Partial<DateObject>): number {
  const { year, month, day, hour, minute, second, millisecond } =
    stubDateObject(values);

  return Date.UTC(year, month - 1, day, hour, minute, second, millisecond);
}
function stubDate(values?: Partial<DateObject>): Date {
  return new Date(stubTimestamp(values));
}

beforeEach(() => {
  setDefaultTimeZone('local');
});

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
  input                                                  | range    | rangeLike | validRange
  ${null}                                                | ${false} | ${false}  | ${false}
  ${undefined}                                           | ${false} | ${false}  | ${false}
  ${{}}                                                  | ${false} | ${false}  | ${false}
  ${''}                                                  | ${false} | ${false}  | ${false}
  ${[]}                                                  | ${true}  | ${true}   | ${true}
  ${[stubTimestamp()]}                                   | ${false} | ${true}   | ${false}
  ${[stubTimestamp(), stubTimestamp()]}                  | ${false} | ${true}   | ${false}
  ${[stubTimestamp(), stubTimestamp(), stubTimestamp()]} | ${false} | ${false}  | ${false}
  ${[stubDate()]}                                        | ${true}  | ${true}   | ${true}
  ${[stubDate(), stubDate()]}                            | ${true}  | ${true}   | ${true}
  ${[stubDate(), stubDate(), stubDate()]}                | ${false} | ${false}  | ${false}
  ${[invalidDate()]}                                     | ${true}  | ${true}   | ${false}
  ${[invalidDate(), invalidDate()]}                      | ${true}  | ${true}   | ${false}
  ${[invalidDate(), invalidDate(), invalidDate()]}       | ${false} | ${false}  | ${false}
`('validates "$input" range', ({ input, range, rangeLike, validRange }) => {
  expect(isDateRange(input)).toBe(range);
  expect(isDateRangeLike(input)).toBe(rangeLike);
  expect(isValidDateRange(input)).toBe(validRange);
});

test.each`
  input              | result
  ${null}            | ${invalidDate()}
  ${undefined}       | ${invalidDate()}
  ${'foo'}           | ${invalidDate()}
  ${NaN}             | ${invalidDate()}
  ${Infinity}        | ${invalidDate()}
  ${stubDate()}      | ${stubDate()}
  ${stubTimestamp()} | ${stubDate()}
`('toDate($input) => $result', ({ input, result }) => {
  expect(toDate(input)).toBeSameDate(result);
});

test.each([
  [undefined, undefined, undefined, undefined],
  [invalidDate(), undefined, invalidDate(), undefined],
  [undefined, invalidDate(), invalidDate(), undefined],
  [invalidDate(), invalidDate(), invalidDate(), invalidDate()],
  [stubTimestamp(), invalidDate(), invalidDate(), stubDate()],
  [invalidDate(), stubTimestamp(), invalidDate(), stubDate()],
  [stubTimestamp(), undefined, stubDate(), undefined],
  [undefined, stubTimestamp(), stubDate(), undefined],
  [
    stubTimestamp({ year: 2019 }),
    stubTimestamp({ year: 2020 }),
    stubDate({ year: 2019 }),
    stubDate({ year: 2020 }),
  ],
])(
  'toDateRange(%p, %p)',
  (rawStart, rawFinish, expectedStart, expectedFinish) => {
    const [start, finish] = toDateRange([rawStart, rawFinish]);

    expect(start).toBeSameDate(expectedStart);
    expect(finish).toBeSameDate(expectedFinish);
  },
);

test.each`
  tz      | date              | shortDate   | time         | dateTime
  ${0}    | ${'May 24, 2019'} | ${'May 24'} | ${'1:02 AM'} | ${'May 24, 2019, 1:02 AM'}
  ${+300} | ${'May 24, 2019'} | ${'May 24'} | ${'6:02 AM'} | ${'May 24, 2019, 6:02 AM'}
  ${-300} | ${'May 23, 2019'} | ${'May 23'} | ${'8:02 PM'} | ${'May 23, 2019, 8:02 PM'}
`(
  'DateUtils({ zone: $tz })#format()',
  ({ tz, date, shortDate, time, dateTime }) => {
    const utils = new DateUtils();

    setDefaultTimeZone(tz);

    expect(utils.format(stubDate(), 'date')).toBe(date);
    expect(utils.format(stubTimestamp(), 'date')).toBe(date);

    expect(utils.format(stubDate(), 'shortDate')).toBe(shortDate);
    expect(utils.format(stubTimestamp(), 'shortDate')).toBe(shortDate);

    expect(utils.format(stubDate(), 'time')).toBe(time);
    expect(utils.format(stubTimestamp(), 'time')).toBe(time);

    expect(utils.format(stubDate(), 'dateTime')).toBe(dateTime);
    expect(utils.format(stubTimestamp(), 'dateTime')).toBe(dateTime);
  },
);

test.each<[NullableDateLike, NullableDateLike, string | undefined, string]>([
  [undefined, undefined, undefined, ''],
  [undefined, undefined, 'Empty Text', 'Empty Text'],
  [invalidDate(), undefined, undefined, 'Invalid Date Range'],
  [invalidDate(), invalidDate(), undefined, 'Invalid Date Range'],
  [stubDate(), invalidDate(), undefined, 'Invalid Date Range'],
  [stubDate(), undefined, undefined, 'May 24, 2019 - …'],
  [
    stubDate({ month: 5 }),
    stubDate({ month: 6 }),
    undefined,
    'May 24 - Jun 24, 2019',
  ],
  [
    stubDate({ year: 2020 }),
    stubDate({ year: 2019 }),
    undefined,
    'May 24, 2019 - May 24, 2020',
  ],
])(
  'DateUtils#formatDateRange([%p, %p]) -> %p',
  (start, end, emptyText, result) => {
    const utils = new DateUtils();

    setDefaultTimeZone(0);

    expect(utils.formatRange([start, end], emptyText)).toBe(result);
    expect(utils.formatRange([end, start], emptyText)).toBe(result);
  },
);

test.each([
  [[NaN], 'in 0 sec.', 'in 0 sec.', 'in 0 seconds'],
  [[-3], 'in 3 yr.', 'in 3 yr.', 'in 3 years'],
  [[+3], '3 yr. ago', '3 yr. ago', '3 years ago'],
  [[0, -3], 'in 3 mo.', 'in 3 mo.', 'in 3 months'],
  [[0, +3], '3 mo. ago', '3 mo. ago', '3 months ago'],
  [[0, 0, -3], 'in 3 days', 'in 3 days', 'in 3 days'],
  [[0, 0, +3], '3 days ago', '3 days ago', '3 days ago'],
  [[0, 0, 0, -3], 'in 3 hr.', 'in 3 hr.', 'in 3 hours'],
  [[0, 0, 0, +3], '3 hr. ago', '3 hr. ago', '3 hours ago'],
  [[0, 0, 0, 0, -3], 'in 3 min.', 'in 3 min.', 'in 3 minutes'],
  [[0, 0, 0, 0, +3], '3 min. ago', '3 min. ago', '3 minutes ago'],
  [[0, 0, 0, 0, 0, -3], 'in 3 sec.', 'in 3 sec.', 'in 3 seconds'],
  [[0, 0, 0, 0, 0, +3], '3 sec. ago', '3 sec. ago', '3 seconds ago'],
])(
  'DateUtils#formatRelativeTime($offsets)',
  (
    [years = 0, months = 0, days = 0, hours = 0, minutes = 0, seconds = 0],
    short,
    narrow,
    long,
  ) => {
    const utils = new DateUtils();
    const input = new Date(Date.UTC(2019, 4, 24));
    const base = new Date(
      Date.UTC(years + 2019, months + 4, days + 24, hours, minutes, seconds),
    );

    expect(
      utils.formatRelativeTime(input, { compare: base, style: 'narrow' }),
    ).toBe(narrow);
    expect(
      utils.formatRelativeTime(input, { compare: base, style: 'short' }),
    ).toBe(short);
    expect(
      utils.formatRelativeTime(input, { compare: base, style: 'long' }),
    ).toBe(long);
    expect(utils.formatRelativeTime(input, { compare: base })).toBe(long);

    jest.spyOn(Date, 'now').mockImplementation(() => base.getTime());
    expect(Date.now).toHaveBeenCalledTimes(0);
    expect(utils.formatRelativeTime(input)).toBe(long);
    expect(Date.now).toHaveBeenCalledTimes(1);
  },
);
