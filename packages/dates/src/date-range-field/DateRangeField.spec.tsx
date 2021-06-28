import {
  mockDate,
  renderComponent,
  renderCSS,
} from '@superdispatch/ui-testutils';
import { fireEvent, Matcher, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateTime } from 'luxon';
import { useState } from 'react';
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
      onChange={({ dateValue }) => {
        setValue(dateValue);
      }}
    />
  );
}

beforeEach(() => {
  mockDate();
});

test('basic', () => {
  const onChange = jest.fn();
  renderComponent(<DateRangeField label="Range" onChange={onChange} />);

  expect(screen.queryByRole('grid')).toBeNull();
  expect(screen.getByLabelText('Range')).toHaveValue('');

  userEvent.click(screen.getByLabelText('Range'));

  expect(onChange).not.toHaveBeenCalled();

  expect(screen.queryAllByRole('grid')).toHaveLength(2);

  userEvent.click(screen.getByRole('gridcell', { name: /May 24/ }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    dateValue: [expect.any(DateTime), null],
    stringValue: ['2019-05-24T00:00:00.000-05:00', null],
  });

  expect(screen.queryAllByRole('grid')).toHaveLength(2);
  expect(screen.getByLabelText('Range')).toHaveValue('');
});

test('uncontrolled', () => {
  renderComponent(<UncontrolledDateRangeField label="Range" />);

  expect(screen.getByLabelText('Range')).toHaveValue('');

  userEvent.click(screen.getByLabelText('Range'));

  userEvent.click(screen.getByRole('gridcell', { name: /May 24/ }));

  expect(screen.getByLabelText('Range')).toHaveValue('May 24, 2019 - …');

  userEvent.click(screen.getByRole('gridcell', { name: /May 30/ }));

  expect(screen.queryByRole('grid')).toBeNull();
  expect(screen.getByLabelText('Range')).toHaveValue('May 24 - May 30, 2019');
});

test('close on select', () => {
  renderComponent(<DateRangeField value={[Date.now()]} />);

  expect(screen.queryByRole('grid')).toBeNull();

  userEvent.click(screen.getByRole('textbox'));
  userEvent.click(screen.getByRole('gridcell', { name: /May 25/ }));

  expect(screen.queryByRole('grid')).toBeNull();
});

test('selected days', () => {
  renderComponent(<DateRangeField value={['2019-05-24T00:00:00.000-05:00']} />);

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

  userEvent.click(screen.getByRole('textbox'));

  assertSelection(24);

  fireEvent.mouseEnter(screen.getByRole('gridcell', { name: /May 24/ }));

  assertSelection(24, 24);

  fireEvent.mouseEnter(screen.getByRole('gridcell', { name: /May 26/ }));

  assertSelection(24, 26);

  fireEvent.mouseEnter(screen.getByRole('gridcell', { name: /May 20/ }));

  assertSelection(20, 24);
});

test('disabledDays', () => {
  const onChange = jest.fn();
  const onDayClick = jest.fn();

  renderComponent(
    <DateRangeField
      onChange={onChange}
      CalendarProps={{
        onDayClick,
        disabledDays: ({ dateValue }) => dateValue.day >= 24,
      }}
    />,
  );

  userEvent.click(screen.getByRole('textbox'));

  expect(onChange).not.toHaveBeenCalled();
  expect(onDayClick).not.toHaveBeenCalled();

  expect(screen.getByRole('gridcell', { name: /May 24/ })).toHaveClass(
    'SD-Calendar-disabled',
  );

  userEvent.click(screen.getByRole('gridcell', { name: /May 24/ }));

  expect(onChange).not.toHaveBeenCalled();
  expect(onDayClick).toHaveBeenCalledTimes(1);
});

test('enableClearable', () => {
  const onChange = jest.fn();
  const view = renderComponent(
    <DateRangeField onChange={onChange} enableClearable={true} />,
  );

  expect(screen.queryByRole('button', { name: 'clear' })).toBeNull();

  view.rerender(
    <DateRangeField
      onChange={onChange}
      enableClearable={true}
      value={[Date.now(), undefined]}
    />,
  );
  expect(screen.queryByRole('button', { name: 'clear' })).toBeNull();

  view.rerender(
    <DateRangeField
      onChange={onChange}
      enableClearable={true}
      value={[Date.now(), Date.now()]}
    />,
  );

  expect(screen.getByRole('button', { name: 'clear' })).toBeInTheDocument();

  expect(onChange).not.toHaveBeenCalled();

  userEvent.click(screen.getByRole('button', { name: 'clear' }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    dateValue: [null, null],
    stringValue: [null, null],
  });

  view.rerender(
    <DateRangeField
      label="Custom Label"
      onChange={onChange}
      enableClearable={true}
      value={[Date.now(), Date.now()]}
    />,
  );

  expect(screen.queryByRole('button', { name: 'clear' })).toBeNull();

  userEvent.click(screen.getByRole('button', { name: 'clear Custom Label' }));

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    dateValue: [null, null],
    stringValue: [null, null],
  });
});

test('time normalization', () => {
  const view = renderComponent(<DateRangeField />);

  const variants: Array<
    [
      input: undefined | DateStringRange,
      matcher: Matcher,
      result: DateStringRange,
    ]
  > = [
    [undefined, /May 24/, ['2019-05-24T00:00:00.000-05:00', null]],

    [
      ['2019-05-29T00:00:00.000-05:00', null],
      /May 24/,
      ['2019-05-24T00:00:00.000-05:00', '2019-05-29T23:59:59.999-05:00'],
    ],

    [
      ['2019-05-29T10:11:12.134-05:00', null],
      /May 24/,
      ['2019-05-24T10:11:12.134-05:00', '2019-05-29T23:59:59.999-05:00'],
    ],
  ];

  for (const [input, labelMatcher, stringValue] of variants) {
    const onChange = jest.fn();

    view.rerender(
      <DateRangeField
        id="range"
        label="Range"
        value={input}
        onChange={onChange}
      />,
    );

    userEvent.click(screen.getByLabelText('Range'));
    userEvent.click(screen.getByLabelText(labelMatcher));

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
