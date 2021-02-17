import { mockDate } from '@superdispatch/ui-testutils';
import { DateTime, FixedOffsetZone } from 'luxon';
import { DateFormat, setDefaultTimeZone } from '../date-config/DateConfig';
import {
  DateDisplayVariant,
  DateString,
  DateStringRange,
  DateTimeRange,
  formatDate,
  formatDateRange,
  formatRelativeTime,
  NullableDateInput,
  NullableDateRangeInput,
  parseDate,
  parseDateRange,
  PrimitiveDateInput,
  stringifyDate,
  stringifyDateRange,
  toPrimitiveDateInput,
} from './DateTimeUtils';

const STUB_UTC = Date.UTC(2019, 4, 24, 1, 2, 3, 4);

beforeEach(() => {
  mockDate();
  setDefaultTimeZone('local');
});

test.each<[NullableDateInput, PrimitiveDateInput]>([
  [NaN, NaN],
  [null, NaN],
  [undefined, NaN],
  ['', ''],
  ['invalid', 'invalid'],
  ['2019-05-24T05:06:07.008Z', '2019-05-24T05:06:07.008Z'],
  [STUB_UTC, STUB_UTC],
  [new Date(STUB_UTC), STUB_UTC],
  [DateTime.fromMillis(STUB_UTC), STUB_UTC],
])('toPrimitiveDateInput', (input, expected) => {
  expect(toPrimitiveDateInput(input)).toBe(expected);
});

test.each<[input: NullableDateInput, result: null | string]>([
  [null, null],
  [undefined, null],
  [STUB_UTC, '2019-05-23T20:02:03.004-05:00'],
  [new Date(STUB_UTC), '2019-05-23T20:02:03.004-05:00'],
  [DateTime.fromMillis(STUB_UTC), '2019-05-23T20:02:03.004-05:00'],
  [
    DateTime.fromMillis(STUB_UTC).setZone(FixedOffsetZone.instance(0)),
    '2019-05-23T20:02:03.004-05:00',
  ],
])('parseDate(%p): %p', (input, result) => {
  expect(parseDate(input).toISO()).toBe(result);
});

test.each<[NullableDateInput, Record<DateFormat, null | string>]>([
  [null, { JodaISO: null, DateISO: null, DateTimeISO: null }],
  [undefined, { JodaISO: null, DateISO: null, DateTimeISO: null }],
  ['0000-00-00', { JodaISO: null, DateISO: null, DateTimeISO: null }],

  [
    '2019-05-24',
    {
      JodaISO: null,
      DateISO: '2019-05-24T00:00:00.000+02:00',
      DateTimeISO: '2019-05-24T00:00:00.000+02:00',
    },
  ],

  [
    '2019-05-24T01:02:03.045Z',
    {
      JodaISO: null,
      DateISO: '2019-05-24T03:02:03.045+02:00',
      DateTimeISO: '2019-05-24T03:02:03.045+02:00',
    },
  ],

  [
    '2019-05-24T01:02:03.045+0000',
    {
      JodaISO: '2019-05-24T03:02:03.045+02:00',
      DateISO: '2019-05-24T03:02:03.045+02:00',
      DateTimeISO: '2019-05-24T03:02:03.045+02:00',
    },
  ],

  [
    '2019-05-24T01:02:03.045+0500',
    {
      JodaISO: '2019-05-23T22:02:03.045+02:00',
      DateISO: '2019-05-23T22:02:03.045+02:00',
      DateTimeISO: '2019-05-23T22:02:03.045+02:00',
    },
  ],

  [
    '2019-05-24T01:02:03.045-0500',
    {
      JodaISO: '2019-05-24T08:02:03.045+02:00',
      DateISO: '2019-05-24T08:02:03.045+02:00',
      DateTimeISO: '2019-05-24T08:02:03.045+02:00',
    },
  ],

  [
    '2019-05-24T01:02:03.045678+0000',
    {
      JodaISO: null,
      DateISO: '2019-05-24T03:02:03.045+02:00',
      DateTimeISO: '2019-05-24T03:02:03.045+02:00',
    },
  ],

  [
    '2019-05-24T01:02:03.045678+0500',
    {
      JodaISO: null,
      DateISO: '2019-05-23T22:02:03.045+02:00',
      DateTimeISO: '2019-05-23T22:02:03.045+02:00',
    },
  ],

  [
    '2019-05-24T01:02:03.045678-0500',
    {
      JodaISO: null,
      DateISO: '2019-05-24T08:02:03.045+02:00',
      DateTimeISO: '2019-05-24T08:02:03.045+02:00',
    },
  ],
])('parseDate(%p)', (input, expectations) => {
  const results: Record<string, any> = {};

  setDefaultTimeZone(120);

  for (const format of Object.keys(expectations) as DateFormat[]) {
    results[format] = parseDate(input, { format }).toJSON();
  }

  expect(results).toEqual(expectations);
});

test.each<
  [
    input: null | undefined | string,
    ...cases: Array<
      [offset: number, results: Record<DateFormat, string | undefined>]
    >
  ]
>([
  [
    null,
    [0, { JodaISO: undefined, DateISO: undefined, DateTimeISO: undefined }],
  ],
  [
    undefined,
    [0, { JodaISO: undefined, DateISO: undefined, DateTimeISO: undefined }],
  ],

  [
    '0000-00-00',
    [0, { JodaISO: undefined, DateISO: undefined, DateTimeISO: undefined }],
  ],

  [
    '2019-05-24T00:00:00.000Z',
    [
      0,
      {
        JodaISO: '2019-05-24T00:00:00.000+0000',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T00:00:00.000Z',
      },
    ],

    [
      3,
      {
        JodaISO: '2019-05-24T03:00:00.000+0300',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T03:00:00.000+03:00',
      },
    ],

    [
      -3,
      {
        JodaISO: '2019-05-23T21:00:00.000-0300',
        DateISO: '2019-05-23',
        DateTimeISO: '2019-05-23T21:00:00.000-03:00',
      },
    ],
  ],

  [
    '2019-05-24T12:13:14.156Z',
    [
      0,
      {
        JodaISO: '2019-05-24T12:13:14.156+0000',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T12:13:14.156Z',
      },
    ],

    [
      3,
      {
        JodaISO: '2019-05-24T15:13:14.156+0300',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T15:13:14.156+03:00',
      },
    ],

    [
      -3,
      {
        JodaISO: '2019-05-24T09:13:14.156-0300',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T09:13:14.156-03:00',
      },
    ],
  ],

  [
    '2019-05-24T12:13:14.156+0500',
    [
      0,
      {
        JodaISO: '2019-05-24T07:13:14.156+0000',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T07:13:14.156Z',
      },
    ],

    [
      3,
      {
        JodaISO: '2019-05-24T10:13:14.156+0300',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T10:13:14.156+03:00',
      },
    ],

    [
      -3,
      {
        JodaISO: '2019-05-24T04:13:14.156-0300',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T04:13:14.156-03:00',
      },
    ],
  ],

  [
    '2019-05-24T12:13:14.156-0500',
    [
      0,
      {
        JodaISO: '2019-05-24T17:13:14.156+0000',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T17:13:14.156Z',
      },
    ],

    [
      3,
      {
        JodaISO: '2019-05-24T20:13:14.156+0300',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T20:13:14.156+03:00',
      },
    ],

    [
      -3,
      {
        JodaISO: '2019-05-24T14:13:14.156-0300',
        DateISO: '2019-05-24',
        DateTimeISO: '2019-05-24T14:13:14.156-03:00',
      },
    ],
  ],
])('stringifyDate(%p)', (input, ...cases) => {
  for (const [offset, expectations] of cases) {
    const results: Record<string, any> = {};

    for (const format of Object.keys(expectations) as DateFormat[]) {
      setDefaultTimeZone(offset * 60);

      if (input == null) {
        results[format] = stringifyDate(input, { format });
      } else {
        results[format] = stringifyDate(DateTime.fromISO(input), { format });
      }
    }

    expect(results).toEqual(expectations);
  }
});

test('stringifyDate(…)', () => {
  expect(stringifyDate(DateTime.local())).toBe('2019-05-24T07:13:14.015-05:00');
});

test.each<
  [
    offset: number,
    input: DateString,
    fallback: string | undefined,
    results: Record<DateDisplayVariant, string>,
  ]
>([
  [
    0,
    '0000-00-00',
    undefined,
    {
      ShortDate: 'Invalid Date',
      Date: 'Invalid Date',
      Time: 'Invalid Date',
      DateTime: 'Invalid Date',
    },
  ],

  [
    0,
    '0000-00-00',
    'Custom Empty Text',
    {
      ShortDate: 'Custom Empty Text',
      Date: 'Custom Empty Text',
      Time: 'Custom Empty Text',
      DateTime: 'Custom Empty Text',
    },
  ],

  [
    0,
    '2019-05-24T12:13:14.156Z',
    undefined,
    {
      ShortDate: 'May 24',
      Date: 'May 24, 2019',
      Time: '12:13 PM',
      DateTime: 'May 24, 2019, 12:13 PM',
    },
  ],

  [
    3,
    '2019-05-24T05:06:07.008Z',
    undefined,
    {
      ShortDate: 'May 24',
      Date: 'May 24, 2019',
      Time: '8:06 AM',
      DateTime: 'May 24, 2019, 8:06 AM',
    },
  ],

  [
    -3,
    '2019-05-24T05:06:07.008Z',
    undefined,
    {
      ShortDate: 'May 24',
      Date: 'May 24, 2019',
      Time: '2:06 AM',
      DateTime: 'May 24, 2019, 2:06 AM',
    },
  ],

  [
    7,
    '2019-05-24T05:06:07.008Z',
    undefined,
    {
      ShortDate: 'May 24',
      Date: 'May 24, 2019',
      Time: '12:06 PM',
      DateTime: 'May 24, 2019, 12:06 PM',
    },
  ],

  [
    -7,
    '2019-05-24T05:06:07.008Z',
    undefined,
    {
      ShortDate: 'May 23',
      Date: 'May 23, 2019',
      Time: '10:06 PM',
      DateTime: 'May 23, 2019, 10:06 PM',
    },
  ],
])(
  '(tz: %p) formatDate(%p, { fallback: %p })',
  (offset, input, fallback, expectations) => {
    const dateResults: Record<string, any> = {};
    const stringResults: Record<string, any> = {};

    for (const variant of Object.keys(expectations) as DateDisplayVariant[]) {
      setDefaultTimeZone(offset * 60);

      dateResults[variant] = formatDate(DateTime.fromISO(input), {
        variant,
        fallback,
      });

      stringResults[variant] = formatDate(input, {
        variant,
        fallback,
      });
    }

    expect(dateResults).toEqual(expectations);
    expect(stringResults).toEqual(expectations);
  },
);

test('formatRelative(…)', () => {
  expect(formatRelativeTime('2019-05-24')).toBe('7 hr. ago');
  expect(formatRelativeTime('2019-05-24T05:00:00Z')).toBe('7 hr. ago');
  expect(formatRelativeTime('2019-05-24T05:00:00-0000')).toBe('7 hr. ago');
  expect(formatRelativeTime('2019-05-24T00:00:00-0500')).toBe('7 hr. ago');
  expect(formatRelativeTime('2019-05-24T10:00:00+0500')).toBe('7 hr. ago');
});

test.each<[NullableDateRangeInput, Record<DateFormat, DateTimeRange>]>([
  [
    null,
    {
      JodaISO: [undefined, undefined],
      DateISO: [undefined, undefined],
      DateTimeISO: [undefined, undefined],
    },
  ],
  [
    undefined,
    {
      JodaISO: [undefined, undefined],
      DateISO: [undefined, undefined],
      DateTimeISO: [undefined, undefined],
    },
  ],
  [
    [null, undefined],
    {
      JodaISO: [undefined, undefined],
      DateISO: [undefined, undefined],
      DateTimeISO: [undefined, undefined],
    },
  ],

  [
    [NaN, '0000-00-00'],
    {
      JodaISO: [undefined, undefined],
      DateISO: [undefined, undefined],
      DateTimeISO: [undefined, undefined],
    },
  ],

  [
    [null, STUB_UTC],

    {
      JodaISO: [DateTime.fromMillis(STUB_UTC), undefined],
      DateISO: [DateTime.fromMillis(STUB_UTC), undefined],
      DateTimeISO: [DateTime.fromMillis(STUB_UTC), undefined],
    },
  ],

  [
    [null, new Date(STUB_UTC)],

    {
      JodaISO: [DateTime.fromMillis(STUB_UTC), undefined],
      DateISO: [DateTime.fromMillis(STUB_UTC), undefined],
      DateTimeISO: [DateTime.fromMillis(STUB_UTC), undefined],
    },
  ],

  [
    [null, DateTime.fromMillis(STUB_UTC)],

    {
      JodaISO: [DateTime.fromMillis(STUB_UTC), undefined],
      DateISO: [DateTime.fromMillis(STUB_UTC), undefined],
      DateTimeISO: [DateTime.fromMillis(STUB_UTC), undefined],
    },
  ],

  [
    [null, '2019-05-24'],
    {
      JodaISO: [undefined, undefined],
      DateISO: [DateTime.fromISO('2019-05-24'), undefined],
      DateTimeISO: [DateTime.fromISO('2019-05-24'), undefined],
    },
  ],

  [
    [null, '2019-05-24T01:02:03.004Z'],

    {
      JodaISO: [undefined, undefined],
      DateISO: [DateTime.fromMillis(STUB_UTC), undefined],
      DateTimeISO: [DateTime.fromMillis(STUB_UTC), undefined],
    },
  ],

  [
    ['2019-05-24T03:02:03.004-02:00', '2000-01-02T03:04:05.678+02:00'],
    {
      JodaISO: [undefined, undefined],
      DateISO: [
        DateTime.fromISO('2000-01-02T03:04:05.678+02:00'),
        DateTime.fromISO('2019-05-24T03:02:03.004-02:00'),
      ],
      DateTimeISO: [
        DateTime.fromISO('2000-01-02T03:04:05.678+02:00'),
        DateTime.fromISO('2019-05-24T03:02:03.004-02:00'),
      ],
    },
  ],

  [
    ['2019-05-24T03:02:03.004-0200', '2000-01-02T03:04:05.678+0200'],
    {
      JodaISO: [
        DateTime.fromISO('2000-01-02T03:04:05.678+02:00'),
        DateTime.fromISO('2019-05-24T03:02:03.004-02:00'),
      ],
      DateISO: [
        DateTime.fromISO('2000-01-02T03:04:05.678+02:00'),
        DateTime.fromISO('2019-05-24T03:02:03.004-02:00'),
      ],
      DateTimeISO: [
        DateTime.fromISO('2000-01-02T03:04:05.678+02:00'),
        DateTime.fromISO('2019-05-24T03:02:03.004-02:00'),
      ],
    },
  ],
])('parseDateRange(%p)', (input, expectations) => {
  const results: Record<string, any> = {};

  for (const format of Object.keys(expectations)) {
    results[format] = parseDateRange(input, { format: format as DateFormat });
  }

  expect(results).toEqual(expectations);
});

test.each<[DateStringRange, Record<DateFormat, DateStringRange>]>([
  [
    [undefined, undefined],
    {
      JodaISO: [undefined, undefined],
      DateISO: [undefined, undefined],
      DateTimeISO: [undefined, undefined],
    },
  ],

  [
    [undefined, '0000-00-00'],
    {
      JodaISO: [undefined, undefined],
      DateISO: [undefined, undefined],
      DateTimeISO: [undefined, undefined],
    },
  ],

  [
    [undefined, '2019-05-24T00:00:00.000Z'],
    {
      JodaISO: ['2019-05-23T19:00:00.000-0500', undefined],
      DateISO: ['2019-05-23', undefined],
      DateTimeISO: ['2019-05-23T19:00:00.000-05:00', undefined],
    },
  ],

  [
    ['2019-05-24T12:13:14.156Z', '2019-05-24T00:00:00.000Z'],
    {
      DateISO: ['2019-05-23', '2019-05-24'],
      DateTimeISO: [
        '2019-05-23T19:00:00.000-05:00',
        '2019-05-24T07:13:14.156-05:00',
      ],
      JodaISO: ['2019-05-23T19:00:00.000-0500', '2019-05-24T07:13:14.156-0500'],
    },
  ],

  [
    ['2019-05-24T01:11:11.111-0500', '2019-05-24T01:22:22.222+0500'],
    {
      DateISO: ['2019-05-23', '2019-05-24'],
      DateTimeISO: [
        '2019-05-23T15:22:22.222-05:00',
        '2019-05-24T01:11:11.111-05:00',
      ],
      JodaISO: ['2019-05-23T15:22:22.222-0500', '2019-05-24T01:11:11.111-0500'],
    },
  ],
])('stringifyDateRange(%p)', ([start, finish], expectations) => {
  const results: Record<string, any> = {};

  for (const format of Object.keys(expectations)) {
    results[format] = stringifyDateRange(
      [
        !start ? undefined : DateTime.fromISO(start),
        !finish ? undefined : DateTime.fromISO(finish),
      ],
      { format: format as DateFormat },
    );
  }

  expect(results).toEqual(expectations);
});

test.each<[DateStringRange, string | undefined, string]>([
  [[undefined, undefined], '', ''],
  [[undefined, undefined], undefined, 'Invalid Date Range'],
  [[undefined, '0000-00-00'], 'Custom Empty Text', 'Custom Empty Text'],

  [[undefined, '2019-05-24T00:00:00.000Z'], undefined, 'May 23, 2019 - …'],

  [
    ['2019-05-24T12:13:14.156Z', '2019-05-24T00:00:00.000Z'],
    undefined,
    'May 23 - May 24, 2019',
  ],

  [
    ['2019-05-24T12:13:14.156Z', '2020-05-24T00:00:00.000Z'],
    undefined,
    'May 24, 2019 - May 23, 2020',
  ],
])('formatDateRange(%p, %p): %p', ([start, finish], fallback, expected) => {
  expect(formatDateRange([start, finish], { fallback })).toEqual(expected);
  expect(
    formatDateRange(
      [
        !start ? undefined : DateTime.fromISO(start),
        !finish ? undefined : DateTime.fromISO(finish),
      ],
      { fallback },
    ),
  ).toEqual(expected);
});
