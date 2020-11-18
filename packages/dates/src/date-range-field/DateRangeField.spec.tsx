import {
  mockDate,
  renderComponent,
  renderCSS,
} from '@superdispatch/ui-testutils';
import { fireEvent, Matcher } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

import { defaultDateConfig } from '../date-config/DateConfig';
import {
  DateStringRange,
  DateTimeRange,
} from '../date-time-utils/DateTimeUtils';
import { DateRangeField, DateRangeFieldProps } from './DateRangeField';

function queryByClassName(classNames: string): Element[] {
  return Array.from(document.getElementsByClassName(classNames));
}

function UncontrolledDateRangeField(props: DateRangeFieldProps) {
  const [value, setValue] = useState<DateTimeRange>();

  return (
    <DateRangeField
      {...props}
      value={value}
      onChange={({ dateValue }) => setValue(dateValue)}
    />
  );
}

beforeEach(() => {
  mockDate();
});

test('basic', () => {
  const onChange = jest.fn();
  const wrapper = renderComponent(
    <DateRangeField label="Range" onChange={onChange} />,
  );

  expect(wrapper.queryByRole('grid')).toBeNull();
  expect(wrapper.getByLabelText('Range')).toHaveValue('');

  userEvent.click(wrapper.getByLabelText('Range'));

  expect(onChange).not.toHaveBeenCalled();

  expect(wrapper.queryAllByRole('grid')).toHaveLength(2);

  userEvent.click(wrapper.getByRole('gridcell', { name: /May 24/ }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    dateValue: [expect.any(DateTime), undefined],
    stringValue: ['2019-05-24T00:00:00.000-05:00', undefined],
  });

  expect(wrapper.queryAllByRole('grid')).toHaveLength(2);
  expect(wrapper.getByLabelText('Range')).toHaveValue('');
});

test('uncontrolled', () => {
  const wrapper = renderComponent(<UncontrolledDateRangeField label="Range" />);

  expect(wrapper.getByLabelText('Range')).toHaveValue('');

  userEvent.click(wrapper.getByLabelText('Range'));

  userEvent.click(wrapper.getByRole('gridcell', { name: /May 24/ }));

  expect(wrapper.getByLabelText('Range')).toHaveValue('May 24, 2019 - …');

  userEvent.click(wrapper.getByRole('gridcell', { name: /May 30/ }));

  expect(wrapper.queryByRole('grid')).toBeNull();
  expect(wrapper.getByLabelText('Range')).toHaveValue('May 24 - May 30, 2019');
});

test('close on select', () => {
  const wrapper = renderComponent(<DateRangeField value={[Date.now()]} />);

  expect(wrapper.queryByRole('grid')).toBeNull();

  userEvent.click(wrapper.getByRole('textbox'));
  userEvent.click(wrapper.getByRole('gridcell', { name: /May 25/ }));

  expect(wrapper.queryByRole('grid')).toBeNull();
});

test('selected days', () => {
  const wrapper = renderComponent(
    <DateRangeField value={['2019-05-24T00:00:00.000-05:00']} />,
  );

  function assertSelection(startDay: number, finishDay?: number): void {
    const selected = queryByClassName('SD-DateRangeField-selected').filter(
      (element) => !element.classList.contains('SD-DateRangeField-outside'),
    );

    const startDays = selected.filter((element) =>
      element.classList.contains('SD-DateRangeField-rangeStart'),
    );
    const finishDays = selected.filter((element) =>
      element.classList.contains('SD-DateRangeField-rangeFinish'),
    );

    const [startDate] = selected;
    const finishDate = selected[selected.length - 1];

    expect(startDays).toHaveLength(1);
    expect(startDays[0]).toHaveTextContent(String(startDay));

    if (finishDay == null) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(selected).toHaveLength(1);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(startDate).toBe(finishDate);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(finishDays).toHaveLength(0);
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(selected).toHaveLength(finishDay - startDay + 1);

      // eslint-disable-next-line jest/no-conditional-expect
      expect(finishDays).toHaveLength(1);
      // eslint-disable-next-line jest/no-conditional-expect
      expect(finishDays[0]).toHaveTextContent(String(finishDay));

      for (let i = 0; i < selected.length; i++) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(selected[i]).toHaveTextContent(String(startDay + i));
      }
    }
  }

  userEvent.click(wrapper.getByRole('textbox'));

  assertSelection(24);

  fireEvent.mouseEnter(wrapper.getByRole('gridcell', { name: /May 24/ }));

  assertSelection(24, 24);

  fireEvent.mouseEnter(wrapper.getByRole('gridcell', { name: /May 26/ }));

  assertSelection(24, 26);

  fireEvent.mouseEnter(wrapper.getByRole('gridcell', { name: /May 20/ }));

  assertSelection(20, 24);
});

test('disabledDays', () => {
  const onChange = jest.fn();
  const onDayClick = jest.fn();

  const wrapper = renderComponent(
    <DateRangeField
      onChange={onChange}
      CalendarProps={{
        onDayClick,
        disabledDays: ({ dateValue }) => dateValue.day >= 24,
      }}
    />,
  );

  userEvent.click(wrapper.getByRole('textbox'));

  expect(onChange).not.toHaveBeenCalled();
  expect(onDayClick).not.toHaveBeenCalled();

  expect(wrapper.getByRole('gridcell', { name: /May 24/ })).toHaveClass(
    'SD-Calendar-disabled',
  );

  userEvent.click(wrapper.getByRole('gridcell', { name: /May 24/ }));

  expect(onChange).not.toHaveBeenCalled();
  expect(onDayClick).toHaveBeenCalledTimes(1);
});

test('enableClearable', () => {
  const onChange = jest.fn();
  const wrapper = renderComponent(
    <DateRangeField onChange={onChange} enableClearable={true} />,
  );

  expect(wrapper.queryByRole('button', { name: 'clear' })).toBeNull();

  wrapper.rerender(
    <DateRangeField
      onChange={onChange}
      enableClearable={true}
      value={[Date.now(), undefined]}
    />,
  );
  expect(wrapper.queryByRole('button', { name: 'clear' })).toBeNull();

  wrapper.rerender(
    <DateRangeField
      onChange={onChange}
      enableClearable={true}
      value={[Date.now(), Date.now()]}
    />,
  );

  expect(wrapper.getByRole('button', { name: 'clear' })).toBeInTheDocument();

  expect(onChange).not.toHaveBeenCalled();

  userEvent.click(wrapper.getByRole('button', { name: 'clear' }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    dateValue: [undefined, undefined],
    stringValue: [undefined, undefined],
  });

  wrapper.rerender(
    <DateRangeField
      label="Custom Label"
      onChange={onChange}
      enableClearable={true}
      value={[Date.now(), Date.now()]}
    />,
  );

  expect(wrapper.queryByRole('button', { name: 'clear' })).toBeNull();

  userEvent.click(wrapper.getByRole('button', { name: 'clear Custom Label' }));

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    dateValue: [undefined, undefined],
    stringValue: [undefined, undefined],
  });
});

test('time normalization', () => {
  const wrapper = renderComponent(<DateRangeField />);

  const variants: Array<[
    input: undefined | DateStringRange,
    matcher: Matcher,
    result: DateStringRange,
  ]> = [
    [undefined, /May 24/, ['2019-05-24T00:00:00.000-05:00', undefined]],

    [
      ['2019-05-29T00:00:00.000-05:00', undefined],
      /May 24/,
      ['2019-05-24T00:00:00.000-05:00', '2019-05-29T23:59:59.999-05:00'],
    ],

    [
      ['2019-05-29T10:11:12.134-05:00', undefined],
      /May 24/,
      ['2019-05-24T10:11:12.134-05:00', '2019-05-29T23:59:59.999-05:00'],
    ],
  ];

  for (const [input, labelMatcher, stringValue] of variants) {
    const onChange = jest.fn();

    wrapper.rerender(
      <DateRangeField
        id="range"
        label="Range"
        value={input}
        onChange={onChange}
      />,
    );

    userEvent.click(wrapper.getByLabelText('Range'));
    userEvent.click(wrapper.getByLabelText(labelMatcher));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith({
      stringValue,
      config: defaultDateConfig,
      dateValue: stringValue.map((x) => x && expect.any(DateTime)),
    });
  }
});

test('css', () => {
  expect(renderCSS(<DateRangeField />, ['SD-DateRangeField']))
    .toMatchInlineSnapshot(`
    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside).SD-DateRangeField-rangeStart:before {
      left: 4px;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside).SD-DateRangeField-rangeFinish:before {
      right: 4px;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside):not(.SD-DateRangeField-rangeStart):not(.SD-DateRangeField-rangeFinish):after {
      background-color: Color.Transparent;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside):not(.SD-DateRangeField-rangeStart):not(.SD-DateRangeField-rangeFinish):not(.SD-DateRangeField-disabled) {
      color: Color.Blue500;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside):not(.SD-DateRangeField-rangeStart):not(.SD-DateRangeField-rangeFinish):not(.SD-DateRangeField-disabled):before {
      background-color: Color.Blue50;
    }

    .SD-DateRangeField-day.SD-DateRangeField-selected:not(.SD-DateRangeField-outside):not(.SD-DateRangeField-rangeStart):not(.SD-DateRangeField-rangeFinish).SD-DateRangeField-disabled:before {
      background-color: Color.Silver100;
    }
  `);
});
