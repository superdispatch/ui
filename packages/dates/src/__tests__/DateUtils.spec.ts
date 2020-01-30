import { DateTime } from 'luxon';

import {
  DateFormat,
  DateUnit,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  isDate,
  isDateLike,
  isSameDate,
  isValidDate,
  parseDate,
  setEndOfDate,
  setStartOfDate,
  stringifyDate,
  toDate,
} from '../DateUtils';

const invalidDate = () => new Date(NaN);
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

describe('validations', () => {
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
});

describe('transformations', () => {
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
    expect(toDate(input)).toBeInstanceOf(Date);
    expect(toDate(input).getTime()).toBe(result.getTime());
  });
});

describe('manipulations', () => {
  it.each(allUnits)('setStartOfDate(value, %p)', unit => {
    expect(setStartOfDate(mockDate(), unit)).toEqual(
      setStartOfDate(mockTimestamp(), unit),
    );

    expect(setStartOfDate(mockDate(), unit)).toEqual(
      DateTime.fromJSDate(mockDate())
        .toUTC()
        .startOf(unit)
        .toJSDate(),
    );

    expect(setStartOfDate(mockDate(), unit, 300)).toEqual(
      DateTime.fromJSDate(mockDate(), { zone: 'UTC+5' })
        .startOf(unit)
        .toJSDate(),
    );

    expect(setStartOfDate(mockDate(), unit, -300)).toEqual(
      DateTime.fromJSDate(mockDate(), { zone: 'UTC-5' })
        .startOf(unit)
        .toJSDate(),
    );
  });

  it.each(allUnits)('setEndOfDate(value, %p)', unit => {
    expect(setEndOfDate(mockDate(), unit)).toEqual(
      setEndOfDate(mockTimestamp(), unit),
    );

    expect(setEndOfDate(mockDate(), unit)).toEqual(
      DateTime.fromJSDate(mockDate())
        .toUTC()
        .endOf(unit)
        .toJSDate(),
    );

    expect(setEndOfDate(mockDate(), unit, 300)).toEqual(
      DateTime.fromJSDate(mockDate(), { zone: 'UTC+5' })
        .endOf(unit)
        .toJSDate(),
    );

    expect(setEndOfDate(mockDate(), unit, -300)).toEqual(
      DateTime.fromJSDate(mockDate(), { zone: 'UTC-5' })
        .endOf(unit)
        .toJSDate(),
    );
  });
});

describe('formatting', () => {
  describe('parseDate', () => {
    test.each([
      [null, invalidDate(), invalidDate(), invalidDate()],
      [undefined, invalidDate(), invalidDate(), invalidDate()],
      ['', invalidDate(), invalidDate(), invalidDate()],
      [NaN, invalidDate(), invalidDate(), invalidDate()],
      [Infinity, invalidDate(), invalidDate(), invalidDate()],
      [0, new Date(0), new Date(0), new Date(0)],
      [0.1, invalidDate(), invalidDate(), invalidDate()],
      [invalidDate(), invalidDate(), invalidDate(), invalidDate()],
      [mockDate(), mockDate(), mockDate(), mockDate()],
      [mockTimestamp(), mockDate(), mockDate(), mockDate()],
      [
        '2019-05-24',
        new Date(Date.UTC(2019, 4, 24)),
        new Date(Date.UTC(2019, 4, 24)),
        invalidDate(),
      ],
      ['2019-05-24T01:02:03.045Z', mockDate(), mockDate(), invalidDate()],
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
    ])('parse %p', (input, dateISO, dateTimeISO, jodaISO) => {
      expect(parseDate(input, 'DateISO').getTime()).toBe(dateISO.getTime());
      expect(parseDate(input, 'JodaISO').getTime()).toBe(jodaISO.getTime());
      expect(parseDate(input, 'DateTimeISO').getTime()).toBe(
        dateTimeISO.getTime(),
      );
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

  test.each`
    input              | tz      | date              | dateTime
    ${mockDate()}      | ${0}    | ${'May 24, 2019'} | ${'May 24, 2019, 1:02 AM'}
    ${mockTimestamp()} | ${0}    | ${'May 24, 2019'} | ${'May 24, 2019, 1:02 AM'}
    ${mockDate()}      | ${-300} | ${'May 23, 2019'} | ${'May 23, 2019, 8:02 PM'}
    ${mockTimestamp()} | ${-300} | ${'May 23, 2019'} | ${'May 23, 2019, 8:02 PM'}
    ${mockDate()}      | ${300}  | ${'May 24, 2019'} | ${'May 24, 2019, 6:02 AM'}
    ${mockTimestamp()} | ${300}  | ${'May 24, 2019'} | ${'May 24, 2019, 6:02 AM'}
  `('formats $input with $tz', ({ input, tz, date, dateTime }) => {
    expect(formatDate(input, { timeZoneOffset: tz })).toBe(date);
    expect(formatDateTime(input, { timeZoneOffset: tz })).toBe(dateTime);
  });

  test.each`
    input              | tz      | date              | dateTime
    ${mockDate()}      | ${0}    | ${'May 24, 2019'} | ${'May 24, 2019, 1:02 AM'}
    ${mockTimestamp()} | ${0}    | ${'May 24, 2019'} | ${'May 24, 2019, 1:02 AM'}
    ${mockDate()}      | ${-300} | ${'May 23, 2019'} | ${'May 23, 2019, 8:02 PM'}
    ${mockTimestamp()} | ${-300} | ${'May 23, 2019'} | ${'May 23, 2019, 8:02 PM'}
    ${mockDate()}      | ${300}  | ${'May 24, 2019'} | ${'May 24, 2019, 6:02 AM'}
    ${mockTimestamp()} | ${300}  | ${'May 24, 2019'} | ${'May 24, 2019, 6:02 AM'}
  `('formats $input with $tz', ({ input, tz, date, dateTime }) => {
    expect(formatDate(input, { timeZoneOffset: tz })).toBe(date);
    expect(formatDateTime(input, { timeZoneOffset: tz })).toBe(dateTime);
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
  `('formats with $offset', ({ offset, result }) => {
    expect(
      formatRelativeTime(mockTimestamp(), mockTimestamp() + offset * 1000),
    ).toBe(result);
  });
});
