import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Calendar": [Function],
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
      "DateContextProvider": [Function],
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
      "DateTextField": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "DateTextField",
        "render": [Function],
      },
      "DateUtils": [Function],
      "FormattedDate": [Function],
      "FormattedRelativeTime": [Function],
      "TimeField": [Function],
      "isDate": [Function],
      "isDateLike": [Function],
      "isDateRange": [Function],
      "isDateRangeLike": [Function],
      "isValidDate": [Function],
      "isValidDateRange": [Function],
      "parseDate": [Function],
      "stringifyDate": [Function],
      "toDate": [Function],
      "toDateRange": [Function],
      "useDateUtils": [Function],
      "useFormattedDate": [Function],
      "useFormattedRelativeTime": [Function],
    }
  `);
});
