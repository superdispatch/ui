import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Calendar": React.forwardRef(Calendar),
      "CalendarQuickSelection": React.forwardRef(CalendarQuickSelection),
      "CalendarQuickSelectionItem": React.forwardRef(CalendarQuickSelectionItem),
      "DateConfigProvider": [Function],
      "DateField": React.forwardRef(DateField),
      "DateRangeField": React.forwardRef(DateRangeField),
      "DateUtils": [Function],
      "FormattedDate": [Function],
      "FormattedRelativeTime": [Function],
      "TimeField": React.forwardRef(TimeField),
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
      "stringifyDate": [Function],
      "stringifyDateRange": [Function],
      "toDate": [Function],
      "toDatePayload": [Function],
      "toDateRange": [Function],
      "toDateRangePayload": [Function],
      "toPrimitiveDateInput": [Function],
      "toPrimitiveDateRangeInput": [Function],
      "useDateConfig": [Function],
      "useDateTime": [Function],
      "useDateTimeRange": [Function],
      "useDateUtils": [Function],
      "useDefaultTimeZone": [Function],
      "useFormattedDate": [Function],
      "useFormattedRelativeTime": [Function],
    }
  `);
});
