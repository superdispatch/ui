import * as api from '..';

it('exposes public api', () => {
  expect(api).toMatchInlineSnapshot(`
    Object {
      "Calendar": [Function],
      "CalendarCaption": [Function],
      "CalendarNavbar": [Function],
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
      "CalendarWeekDay": [Function],
      "DateField": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "DateField",
        "render": [Function],
      },
      "DatePicker": [Function],
      "DatePickerBase": [Function],
      "DateRangeField": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "DateRangeField",
        "render": [Function],
      },
      "DateRangePicker": [Function],
      "DateTextField": Object {
        "$$typeof": Symbol(react.forward_ref),
        "displayName": "DateTextField",
        "render": [Function],
      },
      "formatDate": [Function],
      "formatDateRange": [Function],
      "isFirstDayOfMonth": [Function],
      "isLastDayOfMonth": [Function],
      "isSameDate": [Function],
      "isSameDateRange": [Function],
      "isValidDate": [Function],
      "normalizeDateRange": [Function],
      "useDatePickerPopoverState": [Function],
      "useDateRangePickerStyles": [Function],
    }
  `);
});
