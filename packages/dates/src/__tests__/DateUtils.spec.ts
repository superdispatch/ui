import {
  DateFormat,
  isDate,
  isDateLike,
  isSameDate,
  isValidDate,
  toDate,
  tryParseDate,
} from '../DateUtils';

test('isDate', () => {
  expect(isDate('foo')).toBe(false);
  expect(isDate(NaN)).toBe(false);
  expect(isDate(Infinity)).toBe(false);
  expect(isDate(Date.now())).toBe(false);
  expect(isDate(new Date())).toBe(true);
  expect(isDate(new Date(NaN))).toBe(true);
});

test('isDateLike', () => {
  expect(isDateLike('foo')).toBe(false);
  expect(isDateLike(NaN)).toBe(false);
  expect(isDateLike(Infinity)).toBe(false);
  expect(isDateLike(Date.now())).toBe(true);
  expect(isDateLike(new Date())).toBe(true);
  expect(isDateLike(new Date(NaN))).toBe(true);
});

test('isValidDate', () => {
  expect(isValidDate('foo')).toBe(false);
  expect(isValidDate(NaN)).toBe(false);
  expect(isValidDate(Infinity)).toBe(false);
  expect(isValidDate(Date.now())).toBe(true);
  expect(isValidDate(new Date())).toBe(true);
  expect(isValidDate(new Date(NaN))).toBe(false);
});

test('toDate', () => {
  const timestamp = Date.UTC(2019, 4, 23, 20, 15, 10);
  const date = new Date(timestamp);

  expect(toDate(timestamp)).toBeInstanceOf(Date);
  expect(toDate(timestamp)).toEqual(date);
  expect(toDate(timestamp)).not.toBe(date);

  expect(toDate(date)).toBeInstanceOf(Date);
  expect(toDate(date)).toEqual(date);
  expect(toDate(date)).not.toBe(date);

  expect(toDate(null as any).getTime()).toBeNaN();
  expect(toDate('foo' as any).getTime()).toBeNaN();
  expect(toDate(undefined as any).getTime()).toBeNaN();
});

test('isSameDate', () => {
  const timestamp = Date.UTC(2019, 4, 23, 20, 15, 10);
  const date = new Date(timestamp);

  expect(isSameDate(null, null)).toBe(true);
  expect(isSameDate(null, undefined)).toBe(true);
  expect(isSameDate(undefined, null)).toBe(true);
  expect(isSameDate(undefined, undefined)).toBe(true);

  expect(isSameDate(null, date)).toBe(false);
  expect(isSameDate(null, timestamp)).toBe(false);
  expect(isSameDate(date, null)).toBe(false);
  expect(isSameDate(timestamp, null)).toBe(false);

  expect(isSameDate(undefined, date)).toBe(false);
  expect(isSameDate(undefined, timestamp)).toBe(false);
  expect(isSameDate(date, undefined)).toBe(false);
  expect(isSameDate(timestamp, undefined)).toBe(false);

  expect(isSameDate(date, Date.now())).toBe(false);
  expect(isSameDate(timestamp, Date.now())).toBe(false);
  expect(isSameDate(Date.now(), date)).toBe(false);
  expect(isSameDate(Date.now(), timestamp)).toBe(false);

  expect(isSameDate(date, new Date())).toBe(false);
  expect(isSameDate(timestamp, new Date())).toBe(false);
  expect(isSameDate(new Date(), date)).toBe(false);
  expect(isSameDate(new Date(), timestamp)).toBe(false);

  expect(isSameDate(date, timestamp)).toBe(true);
  expect(isSameDate(timestamp, date)).toBe(true);
});

describe('tryParseDate', () => {
  const allFormats: DateFormat[] = ['DateISO', 'JodaISO', 'DateTimeISO'];

  test.each(allFormats)('parse invalid value with %p', format => {
    expect(tryParseDate('', format)).toBeUndefined();
    expect(tryParseDate('foo', format)).toBeUndefined();
    expect(tryParseDate(NaN, format)).toBeUndefined();
    expect(tryParseDate(null, format)).toBeUndefined();
    expect(tryParseDate(Infinity, format)).toBeUndefined();
    expect(tryParseDate(undefined, format)).toBeUndefined();
    expect(tryParseDate(new Date(NaN), format)).toBeUndefined();
  });

  test.each(allFormats)('parse date like value with %p', format => {
    const timestamp = Date.UTC(2019, 4, 23, 20, 15, 10);
    const date = new Date(timestamp);

    expect(tryParseDate(date, format)).toEqual(date);
    expect(tryParseDate(date, format)).not.toBe(date);
    expect(tryParseDate(timestamp, format)).toEqual(date);
    expect(tryParseDate(timestamp, format)).not.toBe(date);
  });

  test('parse string value with "DateISO"', () => {
    expect(tryParseDate('2019-05-24', 'DateISO')).toEqual(
      new Date(Date.UTC(2019, 4, 24)),
    );
  });

  test('parse string value with "DateTimeISO"', () => {
    expect(tryParseDate('2019-05-24T01:02:03.045Z', 'DateTimeISO')).toEqual(
      new Date(Date.UTC(2019, 4, 24, 1, 2, 3, 45)),
    );
  });

  test('parse string value with "JodaISO"', () => {
    expect(tryParseDate('2019-05-24T01:02:03.045+0000', 'JodaISO')).toEqual(
      new Date(Date.UTC(2019, 4, 24, 1, 2, 3, 45)),
    );

    expect(tryParseDate('2019-05-24T01:02:03.045-0500', 'JodaISO')).toEqual(
      new Date(Date.UTC(2019, 4, 24, 1 + 5, 2, 3, 45)),
    );

    expect(tryParseDate('2019-05-24T01:02:03.045+0500', 'JodaISO')).toEqual(
      new Date(Date.UTC(2019, 4, 24, 1 - 5, 2, 3, 45)),
    );
  });
});
