import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

import { DateRangeField } from '../..';

it('checks component css', () => {
  const css = renderCSS(<DateRangeField />, ['SuperDispatchDateRangePicker']);

  expect(css).toMatchInlineSnapshot(`
    .SuperDispatchDateRangePicker-day.SuperDispatchDateRangePicker-selected:not(.SuperDispatchDateRangePicker-outside).SuperDispatchDateRangePicker-rangeStart:before {
      left: 4px;
    }

    .SuperDispatchDateRangePicker-day.SuperDispatchDateRangePicker-selected:not(.SuperDispatchDateRangePicker-outside).SuperDispatchDateRangePicker-rangeEnd:before {
      right: 4px;
    }

    .SuperDispatchDateRangePicker-day.SuperDispatchDateRangePicker-selected:not(.SuperDispatchDateRangePicker-outside):not(.SuperDispatchDateRangePicker-rangeStart):not(.SuperDispatchDateRangePicker-rangeEnd):after {
      background-color: Color.Transparent;
    }

    .SuperDispatchDateRangePicker-day.SuperDispatchDateRangePicker-selected:not(.SuperDispatchDateRangePicker-outside):not(.SuperDispatchDateRangePicker-rangeStart):not(.SuperDispatchDateRangePicker-rangeEnd):not(.SuperDispatchDateRangePicker-disabled) {
      color: Color.Blue500;
    }

    .SuperDispatchDateRangePicker-day.SuperDispatchDateRangePicker-selected:not(.SuperDispatchDateRangePicker-outside):not(.SuperDispatchDateRangePicker-rangeStart):not(.SuperDispatchDateRangePicker-rangeEnd):not(.SuperDispatchDateRangePicker-disabled):before {
      background-color: Color.Blue50;
    }

    .SuperDispatchDateRangePicker-day.SuperDispatchDateRangePicker-selected:not(.SuperDispatchDateRangePicker-outside):not(.SuperDispatchDateRangePicker-rangeStart):not(.SuperDispatchDateRangePicker-rangeEnd).SuperDispatchDateRangePicker-disabled:before {
      background-color: Color.Silver100;
    }
  `);
});
