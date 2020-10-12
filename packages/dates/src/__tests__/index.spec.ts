import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Calendar": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "Calendar",
        "render": [Function],
      },
      "CalendarQuickSelection": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "CalendarQuickSelection",
        "render": [Function],
      },
      "CalendarQuickSelectionItem": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "CalendarQuickSelectionItem",
        "render": [Function],
      },
      "DateConfigProvider": [Function],
      "DateField": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "DateField",
        "render": [Function],
      },
      "DateRangeField": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "DateRangeField",
        "render": [Function],
      },
      "DateUtils": [Function],
      "FormattedDate": [Function],
      "FormattedRelativeTime": [Function],
      "TimeField": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "TimeField",
        "render": [Function],
      },
      "defaultDateConfig": Object {
        "format": "DateTimeISO",
      },
      "formatDate": [Function],
      "formatDateRange": [Function],
      "formatRelativeTime": [Function],
      "isDate": [Function],
      "isDateLike": [Function],
      "isDateRange": [Function],
      "isDateRangeLike": [Function],
      "isValidDate": [Function],
      "isValidDateRange": [Function],
      "parseDate": [Function],
      "parseDateRange": [Function],
      "setDefaultTimeZone": [Function],
      "setDefaultZone": [Function],
      "stringifyDate": [Function],
      "stringifyDateRange": [Function],
      "toDate": [Function],
      "toDatePayload": [Function],
      "toDateRange": [Function],
      "toDateRangePayload": [Function],
      "toPrimitiveDateInput": [Function],
      "toPrimitiveDateRangeInput": [Function],
      "useDateConfig": [Function],
      "useDateUtils": [Function],
      "useDefaultTimeZone": [Function],
      "useFormattedDate": [Function],
      "useFormattedRelativeTime": [Function],
    }
  `);
});
