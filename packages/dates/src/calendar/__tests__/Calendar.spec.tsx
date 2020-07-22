import { MockEvent } from '@superdispatch/jestutils';
import { renderCSS } from '@superdispatch/ui-testutils';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import {
  renderDateComponent,
  STUB_DATE,
} from '../../__testutils__/renderDateComponent';
import {
  DateLike,
  DateObject,
  DateUtils,
  NullableDateLike,
} from '../../DateUtils';
import { Calendar, CalendarDayHighlightColor } from '../Calendar';

it('renders month', () => {
  const wrapper = renderDateComponent(<Calendar />);

  expect(wrapper.getByRole('heading')).toHaveTextContent('May 2019');

  userEvent.click(wrapper.getByLabelText('Previous Month'));

  expect(wrapper.getByRole('heading')).toHaveTextContent('April 2019');

  userEvent.click(wrapper.getByLabelText('Next Month'));

  expect(wrapper.getByRole('heading')).toHaveTextContent('May 2019');
});

it('renders weeks', () => {
  const wrapper = renderDateComponent(<Calendar />);

  const [weeksRow] = wrapper.getAllByRole('row');

  expect(weeksRow).toBeTruthy();
  expect(weeksRow.childNodes).toHaveLength(7);
  expect(weeksRow.childNodes[0]).toHaveTextContent('S');
  expect(weeksRow.childNodes[1]).toHaveTextContent('M');
  expect(weeksRow.childNodes[2]).toHaveTextContent('T');
  expect(weeksRow.childNodes[3]).toHaveTextContent('W');
  expect(weeksRow.childNodes[4]).toHaveTextContent('T');
  expect(weeksRow.childNodes[5]).toHaveTextContent('F');
  expect(weeksRow.childNodes[6]).toHaveTextContent('S');
});

it('renders days', () => {
  const wrapper = renderDateComponent(<Calendar />);

  expect(wrapper.getByLabelText(/May 24 2019/)).toHaveTextContent('24');
});

it('modifies date base on time zone offset and initial time', () => {
  const variants: Array<[
    number,
    NullableDateLike,
    DateLike,
    Partial<DateObject>,
  ]> = [
    // Sets time to 00:00
    [-7, undefined, Date.UTC(2019, 4, 24, 7), { hour: 0 }],
    [-5, undefined, Date.UTC(2019, 4, 24, 5), { hour: 0 }],
    [-3, undefined, Date.UTC(2019, 4, 24, 3), { hour: 0 }],
    [7, undefined, Date.UTC(2019, 4, 23, 17), { hour: 0 }],
    [5, undefined, Date.UTC(2019, 4, 23, 19), { hour: 0 }],
    [3, undefined, Date.UTC(2019, 4, 23, 21), { hour: 0 }],

    // Gets time from 00:00Z
    [-7, Date.UTC(0, 0, 1, 0), Date.UTC(2019, 4, 25, 0), { hour: 17 }],
    [-5, Date.UTC(0, 0, 1, 0), Date.UTC(2019, 4, 25, 0), { hour: 19 }],
    [-3, Date.UTC(0, 0, 1, 0), Date.UTC(2019, 4, 25, 0), { hour: 21 }],
    [3, Date.UTC(0, 0, 1, 0), Date.UTC(2019, 4, 24, 0), { hour: 3 }],
    [5, Date.UTC(0, 0, 1, 0), Date.UTC(2019, 4, 24, 0), { hour: 5 }],
    [7, Date.UTC(0, 0, 1, 0), Date.UTC(2019, 4, 24, 0), { hour: 7 }],

    // Gets time from 5:00Z
    [-7, Date.UTC(0, 0, 1, 5), Date.UTC(2019, 4, 25, 5), { hour: 22 }],
    [-5, Date.UTC(0, 0, 1, 5), Date.UTC(2019, 4, 24, 5), { hour: 0 }],
    [-3, Date.UTC(0, 0, 1, 5), Date.UTC(2019, 4, 24, 5), { hour: 2 }],
    [3, Date.UTC(0, 0, 1, 5), Date.UTC(2019, 4, 24, 5), { hour: 8 }],
    [5, Date.UTC(0, 0, 1, 5), Date.UTC(2019, 4, 24, 5), { hour: 10 }],
    [7, Date.UTC(0, 0, 1, 5), Date.UTC(2019, 4, 24, 5), { hour: 12 }],

    // Gets time from 15:00Z
    [-7, Date.UTC(0, 0, 1, 15), Date.UTC(2019, 4, 24, 15), { hour: 8 }],
    [-5, Date.UTC(0, 0, 1, 15), Date.UTC(2019, 4, 24, 15), { hour: 10 }],
    [-3, Date.UTC(0, 0, 1, 15), Date.UTC(2019, 4, 24, 15), { hour: 12 }],
    [3, Date.UTC(0, 0, 1, 15), Date.UTC(2019, 4, 24, 15), { hour: 18 }],
    [5, Date.UTC(0, 0, 1, 15), Date.UTC(2019, 4, 24, 15), { hour: 20 }],
    [7, Date.UTC(0, 0, 1, 15), Date.UTC(2019, 4, 24, 15), { hour: 22 }],

    // Gets time from 20:00Z
    [-7, Date.UTC(0, 0, 1, 20), Date.UTC(2019, 4, 24, 20), { hour: 13 }],
    [-5, Date.UTC(0, 0, 1, 20), Date.UTC(2019, 4, 24, 20), { hour: 15 }],
    [-3, Date.UTC(0, 0, 1, 20), Date.UTC(2019, 4, 24, 20), { hour: 17 }],
    [3, Date.UTC(0, 0, 1, 20), Date.UTC(2019, 4, 24, 20), { hour: 23 }],
    [5, Date.UTC(0, 0, 1, 20), Date.UTC(2019, 4, 23, 20), { hour: 1 }],
    [7, Date.UTC(0, 0, 1, 20), Date.UTC(2019, 4, 23, 20), { hour: 3 }],
  ];

  for (const [
    timeZoneOffset,
    initialTime,
    expectedDate,
    expectedDateObject,
  ] of variants) {
    const handlers = {
      click: jest.fn(),
      keyDown: jest.fn(),
      mouseEnter: jest.fn(),
      mouseLeave: jest.fn(),
      mouseDown: jest.fn(),
      mouseUp: jest.fn(),
      touchEnd: jest.fn(),
      touchStart: jest.fn(),
    } as const;

    const wrapper = renderDateComponent(
      <Calendar
        initialTime={initialTime}
        onDayClick={handlers.click}
        onDayKeyDown={handlers.keyDown}
        onDayMouseEnter={handlers.mouseEnter}
        onDayMouseLeave={handlers.mouseLeave}
        onDayMouseDown={handlers.mouseDown}
        onDayMouseUp={handlers.mouseUp}
        onDayTouchEnd={handlers.touchEnd}
        onDayTouchStart={handlers.touchStart}
      />,
      { timeZoneOffset: timeZoneOffset * 60 },
    );

    for (const event of [
      'click',
      'keyDown',
      'mouseEnter',
      'mouseLeave',
      'mouseDown',
      'mouseUp',
      'touchEnd',
      'touchStart',
    ] as const) {
      const { [event]: handler } = handlers;

      expect(handler).not.toHaveBeenCalled();
      fireEvent[event](wrapper.getByLabelText(/May 24/));
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(new Date(expectedDate), {
        disabled: false,
        selected: false,
      });

      expect(new Date(expectedDate)).toEqual(
        wrapper.dateUtils.fromObject({
          year: 2019,
          month: 5,
          day: 24,
          ...expectedDateObject,
        }),
      );
    }

    wrapper.unmount();
  }
});

it('sets start of date when `initialTime` not passed', () => {
  const onDayClick = jest.fn();
  const wrapper = renderDateComponent(<Calendar onDayClick={onDayClick} />);

  expect(onDayClick).not.toHaveBeenCalled();
  MockEvent.click(wrapper.getByLabelText(/May 24 2019/));
  expect(onDayClick).toHaveBeenCalledTimes(1);
  expect(onDayClick).toHaveBeenCalledWith(
    wrapper.dateUtils.fromObject({ year: 2019, month: 5, day: 24 }),
    { disabled: false, selected: false },
  );
});

it('selects days', () => {
  const onDayClick = jest.fn();
  const wrapper = renderDateComponent(
    <Calendar
      onDayClick={onDayClick}
      selectedDays={(date, utils) => {
        const startDate = utils.fromObject({ year: 2019, month: 5, day: 24 });
        const finishDate = utils.endOf(
          utils.fromObject({ year: 2019, month: 5, day: 27 }),
          'day',
        );

        return date >= startDate && date <= finishDate;
      }}
    />,
  );

  expect(wrapper.getByLabelText(/May 23 2019/)).not.toHaveClass(
    'SD-Calendar-selected',
  );

  for (let day = 24; day <= 27; day++) {
    const element = wrapper.getByLabelText(new RegExp(`May ${day} 2019`));

    expect(element).toHaveClass('SD-Calendar-selected');

    MockEvent.click(element);

    expect(onDayClick).toHaveBeenCalledTimes(1);
    expect(onDayClick).toHaveBeenCalledWith(
      wrapper.dateUtils.fromObject({ year: 2019, month: 5, day }),
      { disabled: false, selected: true },
    );

    onDayClick.mockClear();
  }

  expect(wrapper.getByLabelText(/May 28 2019/)).not.toHaveClass(
    'SD-Calendar-selected',
  );
});

it('disables days', () => {
  const onDayClick = jest.fn();
  const wrapper = renderDateComponent(
    <Calendar
      onDayClick={onDayClick}
      disabledDays={(date, utils) => utils.isSameDate(date, STUB_DATE, 'day')}
    />,
  );

  expect(wrapper.getByLabelText(/May 24 2019/)).toHaveClass(
    'SD-Calendar-disabled',
  );

  MockEvent.click(wrapper.getByLabelText(/May 24 2019/));

  expect(onDayClick).toHaveBeenCalledTimes(1);
  expect(onDayClick).toHaveBeenCalledWith(
    wrapper.dateUtils.fromObject({ year: 2019, month: 5, day: 24 }),
    { disabled: true, selected: false },
  );
});

it('highlights days', () => {
  const wrapper = renderDateComponent(<div />);
  const highlights: CalendarDayHighlightColor[] = [
    'blue',
    'green',
    'purple',
    'red',
    'teal',
    'yellow',
  ];

  highlights.forEach((highlight) => {
    wrapper.rerender(
      <Calendar
        highlightedDays={{
          [highlight]: (value: Date, utils: DateUtils): boolean =>
            utils.isSameDate(value, STUB_DATE, 'day'),
        }}
      />,
    );

    const day = wrapper.getByLabelText(/May 24 2019/);

    expect(day).toHaveClass(`SD-Calendar-${highlight}`);
  });
});

it('checks component css', () => {
  expect(renderCSS(<Calendar />, ['SD-Calendar'])).toMatchInlineSnapshot(`
    .SD-Calendar-container {
      display: inline-block;
    }

    .SD-Calendar-wrapper {
      position: relative;
      user-select: none;
      flex-direction: row;
      padding-bottom: 16px;
    }

    .SD-Calendar-wrapper:focus {
      outline: none;
    }

    .SD-Calendar-navButtonPrev {
      top: 12px;
      left: 12px;
      position: absolute;
    }

    .SD-Calendar-navButtonNext {
      top: 12px;
      right: 12px;
      position: absolute;
    }

    .SD-Calendar-months {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .SD-Calendar-month {
      margin: 16px 16px 0px 16px;
      user-select: none;
    }

    .SD-Calendar-caption {
      display: table-caption;
      padding: 0px 8px;
      text-align: center;
      margin-bottom: 8px;
    }

    .SD-Calendar-weekdays {
      display: table-header-group;
    }

    .SD-Calendar-weekdaysRow {
      margin: 8px 0px;
      display: flex;
    }

    .SD-Calendar-weekday {
      color: Color.Grey300;
      width: 40px;
      height: 40px;
      margin: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    .SD-Calendar-body {
      display: flex;
      flex-direction: column;
    }

    .SD-Calendar-week {
      display: flex;
    }

    .SD-Calendar-day {
      width: 40px;
      height: 40px;
      margin: 1px;
      display: flex;
      z-index: 1;
      position: relative;
      transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      align-items: center;
      border-radius: 4px;
      justify-content: center;
    }

    .SD-Calendar-day:before {
      top: 0;
      left: -1px;
      right: -1px;
      bottom: 0;
      content: '';
      z-index: -1;
      position: absolute;
      transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      background-color: Color.Transparent;
    }

    .SD-Calendar-day:after {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      z-index: -1;
      position: absolute;
      transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 4px;
      background-color: Color.Transparent;
    }

    .SD-Calendar-day:hover,
    .SD-Calendar-day:focus {
      outline: none;
    }

    .SD-Calendar-day.SD-Calendar-disabled {
      color: Color.Grey100;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled) {
      color: Color.Grey500;
      cursor: pointer;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):active,
    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled).SD-Calendar-selected {
      color: Color.White;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):active:after,
    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled).SD-Calendar-selected:after {
      background-color: Color.Blue300;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-today {
      color: Color.Blue300;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active):hover,
    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active):focus {
      background-color: Color.Silver100;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-blue {
      color: Color.Blue500;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-green {
      color: Color.Green500;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-purple {
      color: Color.Purple500;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-red {
      color: Color.Red500;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-teal {
      color: Color.Teal500;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-yellow {
      color: Color.Yellow500;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-yellow {
      background-color: Color.Yellow50;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-teal {
      background-color: Color.Teal50;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-red {
      background-color: Color.Red50;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-purple {
      background-color: Color.Purple50;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-green {
      background-color: Color.Green50;
    }

    .SD-Calendar-day:not(.SD-Calendar-outside):not(.SD-Calendar-disabled):not(.SD-Calendar-selected):not(:active).SD-Calendar-blue {
      background-color: Color.Blue50;
    }

    .SD-Calendar-day.SD-Calendar-disabled.SD-Calendar-selected:not(.SD-Calendar-outside):after {
      background-color: Color.Silver300;
    }

    .SD-Calendar-day:last-child:before,
    .SD-Calendar-day.SD-Calendar-lastDayOfMonth:before {
      border-radius: 0px 4px 4px 0px;
    }

    .SD-Calendar-day:first-child:before,
    .SD-Calendar-day.SD-Calendar-firstDayOfMonth:before {
      border-radius: 4px 0px 0px 4px;
    }

    .SD-Calendar-footer {
      padding: 16px;
    }
  `);
});
