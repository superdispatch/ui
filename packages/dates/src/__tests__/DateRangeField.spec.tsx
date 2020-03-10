import { renderCSS } from '@superdispatch/ui-testutils';
import React from 'react';

import { DateRangeField } from '../DateRangeField';

it('checks component css', () => {
  expect(renderCSS(<DateRangeField />, ['SuperDispatchDateRangeField']))
    .toMatchInlineSnapshot(`
    .SuperDispatchDateRangeField-day.SuperDispatchDateRangeField-selected:not(.SuperDispatchDateRangeField-outside).SuperDispatchDateRangeField-rangeStart:before {
      left: 4px;
    }

    .SuperDispatchDateRangeField-day.SuperDispatchDateRangeField-selected:not(.SuperDispatchDateRangeField-outside).SuperDispatchDateRangeField-rangeEnd:before {
      right: 4px;
    }

    .SuperDispatchDateRangeField-day.SuperDispatchDateRangeField-selected:not(.SuperDispatchDateRangeField-outside):not(.SuperDispatchDateRangeField-rangeStart):not(.SuperDispatchDateRangeField-rangeEnd):after {
      background-color: Color.Transparent;
    }

    .SuperDispatchDateRangeField-day.SuperDispatchDateRangeField-selected:not(.SuperDispatchDateRangeField-outside):not(.SuperDispatchDateRangeField-rangeStart):not(.SuperDispatchDateRangeField-rangeEnd):not(.SuperDispatchDateRangeField-disabled) {
      color: Color.Blue500;
    }

    .SuperDispatchDateRangeField-day.SuperDispatchDateRangeField-selected:not(.SuperDispatchDateRangeField-outside):not(.SuperDispatchDateRangeField-rangeStart):not(.SuperDispatchDateRangeField-rangeEnd):not(.SuperDispatchDateRangeField-disabled):before {
      background-color: Color.Blue50;
    }

    .SuperDispatchDateRangeField-day.SuperDispatchDateRangeField-selected:not(.SuperDispatchDateRangeField-outside):not(.SuperDispatchDateRangeField-rangeStart):not(.SuperDispatchDateRangeField-rangeEnd).SuperDispatchDateRangeField-disabled:before {
      background-color: Color.Silver100;
    }
  `);
});
