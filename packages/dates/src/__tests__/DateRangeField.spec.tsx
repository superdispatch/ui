import { MockEvent } from '@superdispatch/jestutils';
import { renderCSS } from '@superdispatch/ui-testutils';
import { Matcher } from '@testing-library/react';
import React from 'react';

import { renderDateComponent } from '../__testutils__/renderDateComponent';
import { DateRangeField } from '../DateRangeField';
import { DateObject } from '../DateUtils';

it('merges time from current value or fallbacks to default', () => {
  const { dateUtils, ...wrapper } = renderDateComponent(<div />);

  const variants: Array<[
    [Partial<DateObject>?, Partial<DateObject>?],
    Matcher,
    [Partial<DateObject>?, Partial<DateObject>?],
  ]> = [
    [[], /May 24 2019/, [{ year: 2019, month: 5, day: 24 }]],

    [
      [{ year: 2019, month: 5, day: 29 }],
      /May 24 2019/,
      [
        { year: 2019, month: 5, day: 24 },
        {
          year: 2019,
          month: 5,
          day: 29,
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 999,
        },
      ],
    ],

    [
      [
        {
          year: 2019,
          month: 5,
          day: 29,
          hour: 10,
          minute: 11,
          second: 12,
          millisecond: 13,
        },
      ],
      /May 24 2019/,
      [
        {
          year: 2019,
          month: 5,
          day: 24,
          hour: 10,
          minute: 11,
          second: 12,
          millisecond: 13,
        },
        {
          year: 2019,
          month: 5,
          day: 29,
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 999,
        },
      ],
    ],

    [
      [
        {
          year: 2019,
          month: 5,
          day: 29,
          hour: 10,
          minute: 11,
          second: 12,
          millisecond: 13,
        },
      ],
      /May 24 2019/,
      [
        {
          year: 2019,
          month: 5,
          day: 24,
          hour: 10,
          minute: 11,
          second: 12,
          millisecond: 13,
        },
        {
          year: 2019,
          month: 5,
          day: 29,
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 999,
        },
      ],
    ],
  ];

  for (const [input, labelMatcher, expected] of variants) {
    const onChange = jest.fn();

    wrapper.rerender(
      <DateRangeField
        id="range"
        label="Range"
        onChange={onChange}
        value={[
          input[0] && dateUtils.fromObject(input[0]),
          input[1] && dateUtils.fromObject(input[1]),
        ]}
      />,
    );

    MockEvent.click(wrapper.getByLabelText('Range'));
    MockEvent.click(wrapper.getByLabelText(labelMatcher));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith([
      expected[0] && dateUtils.fromObject(expected[0]),
      expected[1] && dateUtils.fromObject(expected[1]),
    ]);
  }
});

it('updates time of selected days', () => {
  const onChange = jest.fn();
  const { dateUtils, ...wrapper } = renderDateComponent(
    <DateRangeField onChange={onChange} />,
  );

  MockEvent.click(wrapper.getByRole('textbox'));

  expect(wrapper.getByLabelText(/May 24 2019/)).not.toHaveClass(
    'SD-Calendar-selected',
  );

  expect(onChange).toHaveBeenCalledTimes(0);

  MockEvent.click(wrapper.getByLabelText(/May 24 2019/));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith([
    dateUtils.fromObject({ year: 2019, month: 5, day: 24 }),
    undefined,
  ]);

  wrapper.rerender(
    <DateRangeField
      onChange={onChange}
      value={[dateUtils.fromObject({ year: 2019, month: 5, day: 29 })]}
    />,
  );

  expect(onChange).toHaveBeenCalledTimes(1);

  MockEvent.click(wrapper.getByLabelText(/May 24 2019/));

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith([
    dateUtils.fromObject({ year: 2019, month: 5, day: 24 }),
    dateUtils.fromObject({
      year: 2019,
      month: 5,
      day: 29,
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999,
    }),
  ]);
});

it('checks component css', () => {
  expect(renderCSS(<DateRangeField />, ['SD-DateRangeField']))
    .toMatchInlineSnapshot(`
    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside).SD-DateRangeField-rangeStart:before {
      left: 4px;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside).SD-DateRangeField-rangeEnd:before {
      right: 4px;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside):not(.SD-DateRangeField-rangeStart):not(.SD-DateRangeField-rangeEnd):after {
      background-color: Color.Transparent;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside):not(.SD-DateRangeField-rangeStart):not(.SD-DateRangeField-rangeEnd):not(.SD-DateRangeField-disabled) {
      color: Color.Blue500;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside):not(.SD-DateRangeField-rangeStart):not(.SD-DateRangeField-rangeEnd):not(.SD-DateRangeField-disabled):before {
      background-color: Color.Blue50;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside):not(.SD-DateRangeField-rangeStart):not(.SD-DateRangeField-rangeEnd).SD-DateRangeField-disabled:before {
      background-color: Color.Silver100;
    }
  `);
});
