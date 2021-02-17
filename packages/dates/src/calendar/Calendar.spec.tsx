import { Typography } from '@material-ui/core';
import {
  mockDate,
  renderComponent,
  renderCSS,
} from '@superdispatch/ui-testutils';
import { EventType, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateObjectUnits, DateTime } from 'luxon';
import { setDefaultTimeZone } from '../date-config/DateConfig';
import {
  DatePayload,
  DateString,
  NullableDateString,
} from '../date-time-utils/DateTimeUtils';
import {
  Calendar,
  CalendarDateEvent,
  CalendarDayHighlightColor,
} from './Calendar';
import {
  CalendarQuickSelection,
  CalendarQuickSelectionItem,
} from './CalendarQuickSelection';

type MockCalendarDayEventHandler = jest.Mock<void, [CalendarDateEvent]>;

beforeEach(() => {
  mockDate();
  setDefaultTimeZone('local');
});

test('month', () => {
  const wrapper = renderComponent(<Calendar />);

  expect(wrapper.getByRole('heading')).toHaveTextContent('May 2019');

  userEvent.click(wrapper.getByLabelText('Previous Month'));

  expect(wrapper.getByRole('heading')).toHaveTextContent('April 2019');

  userEvent.click(wrapper.getByLabelText('Next Month'));

  expect(wrapper.getByRole('heading')).toHaveTextContent('May 2019');
});

test('weeks', () => {
  const wrapper = renderComponent(<Calendar />);

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

test('days', () => {
  const wrapper = renderComponent(<Calendar />);

  expect(wrapper.getByLabelText(/May 24 2019/)).toHaveTextContent('24');
});

test.each<
  [
    initialTime: NullableDateString,
    ...cases: Array<
      [
        offset: number,
        expectedString: DateString,
        expectedObject: DateObjectUnits,
      ]
    >
  ]
>([
  // Sets time to 00:00
  [
    undefined,
    [-7, '2019-05-24T00:00:00.000-07:00', { hour: 0 }],
    [-5, '2019-05-24T00:00:00.000-05:00', { hour: 0 }],
    [-3, '2019-05-24T00:00:00.000-03:00', { hour: 0 }],
    [7, '2019-05-24T00:00:00.000+07:00', { hour: 0 }],
    [5, '2019-05-24T00:00:00.000+05:00', { hour: 0 }],
    [3, '2019-05-24T00:00:00.000+03:00', { hour: 0 }],
  ],

  // Gets time from 00:00Z
  [
    '0000-01-01T00:00:00.000Z',
    [-7, '2019-05-24T17:00:00.000-07:00', { hour: 17 }],
    [-5, '2019-05-24T19:00:00.000-05:00', { hour: 19 }],
    [-3, '2019-05-24T21:00:00.000-03:00', { hour: 21 }],
    [3, '2019-05-24T03:00:00.000+03:00', { hour: 3 }],
    [5, '2019-05-24T05:00:00.000+05:00', { hour: 5 }],
    [7, '2019-05-24T07:00:00.000+07:00', { hour: 7 }],
  ],

  // Gets time from 5:00Z
  [
    '0000-01-01T05:00:00.000Z',
    [-7, '2019-05-24T22:00:00.000-07:00', { hour: 22 }],
    [-5, '2019-05-24T00:00:00.000-05:00', { hour: 0 }],
    [-3, '2019-05-24T02:00:00.000-03:00', { hour: 2 }],
    [3, '2019-05-24T08:00:00.000+03:00', { hour: 8 }],
    [5, '2019-05-24T10:00:00.000+05:00', { hour: 10 }],
    [7, '2019-05-24T12:00:00.000+07:00', { hour: 12 }],
  ],

  // Gets time from 15:00Z
  [
    '0000-01-01T15:00:00.000Z',
    [-7, '2019-05-24T08:00:00.000-07:00', { hour: 8 }],
    [-5, '2019-05-24T10:00:00.000-05:00', { hour: 10 }],
    [-3, '2019-05-24T12:00:00.000-03:00', { hour: 12 }],
    [3, '2019-05-24T18:00:00.000+03:00', { hour: 18 }],
    [5, '2019-05-24T20:00:00.000+05:00', { hour: 20 }],
    [7, '2019-05-24T22:00:00.000+07:00', { hour: 22 }],
  ],

  // Gets time from 20:00Z
  [
    '0000-01-01T20:00:00.000Z',
    [-7, '2019-05-24T13:00:00.000-07:00', { hour: 13 }],
    [-5, '2019-05-24T15:00:00.000-05:00', { hour: 15 }],
    [-3, '2019-05-24T17:00:00.000-03:00', { hour: 17 }],
    [3, '2019-05-24T23:00:00.000+03:00', { hour: 23 }],
    [5, '2019-05-24T01:00:00.000+05:00', { hour: 1 }],
    [7, '2019-05-24T03:00:00.000+07:00', { hour: 3 }],
  ],
])('initialTime(%p)', (initialTime, ...cases) => {
  const wrapper = renderComponent(<Calendar />);

  for (const [offset, expectedString, expectedObject] of cases) {
    setDefaultTimeZone(offset * 60);

    const handlers: Partial<Record<EventType, jest.Mock>> = {
      click: jest.fn(),
      keyDown: jest.fn(),
      mouseEnter: jest.fn(),
      mouseLeave: jest.fn(),
      mouseDown: jest.fn(),
      mouseUp: jest.fn(),
      touchEnd: jest.fn(),
      touchStart: jest.fn(),
    };

    wrapper.rerender(
      <Calendar
        key={offset /* force rerender on offset change */}
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
    );

    for (const [event, handler] of Object.entries(handlers) as Array<
      [EventType, MockCalendarDayEventHandler]
    >) {
      expect(handler).not.toHaveBeenCalled();
      fireEvent[event](wrapper.getByLabelText(/May 24/));
      expect(handler).toHaveBeenCalledTimes(1);

      const [call] = handler.mock.calls;

      expect(call).toHaveLength(1);

      const [info] = call;

      expect(info.stringValue).toBe(expectedString);
      expect(info.dateValue.toObject()).toEqual({
        year: 2019,
        month: 5,
        day: 24,
        minute: 0,
        second: 0,
        millisecond: 0,
        ...expectedObject,
      });
    }
  }
});

test('onDayClick', () => {
  const onDayClick: MockCalendarDayEventHandler = jest.fn();

  const now = DateTime.local().startOf('day');
  const wrapper = renderComponent(
    <Calendar
      onDayClick={onDayClick}
      selectedDays={({ dateValue }) => dateValue >= now}
    />,
  );

  expect(wrapper.getByLabelText(/May 23 2019/)).not.toHaveClass(
    'SD-Calendar-selected',
  );

  for (let idx = 1; idx < now.day; idx++) {
    const day = String(idx).padStart(2, '0');
    const element = wrapper.getByLabelText(new RegExp(`May ${day} 2019`));

    expect(element).not.toHaveClass('SD-Calendar-selected');
  }

  for (let idx = now.day; idx <= now.daysInMonth; idx++) {
    const day = String(idx).padStart(2, '0');
    const element = wrapper.getByLabelText(new RegExp(`May ${day} 2019`));

    expect(element).toHaveClass('SD-Calendar-selected');

    userEvent.click(element);

    expect(onDayClick).toHaveBeenCalledTimes(1);

    const [[info]] = onDayClick.mock.calls;

    expect(info.stringValue).toBe(`2019-05-${day}T00:00:00.000-05:00`);

    onDayClick.mockClear();
  }
});

test('disabledDays', () => {
  const onDayClick: MockCalendarDayEventHandler = jest.fn();
  const wrapper = renderComponent(
    <Calendar
      onDayClick={onDayClick}
      disabledDays={({ dateValue }) => dateValue.day === 24}
    />,
  );

  expect(wrapper.getByLabelText(/May 24 2019/)).toHaveClass(
    'SD-Calendar-disabled',
  );

  userEvent.click(wrapper.getByLabelText(/May 24 2019/));

  expect(onDayClick).toHaveBeenCalledTimes(1);

  const [[info]] = onDayClick.mock.calls;

  expect(info.disabled).toBe(true);
  expect(info.selected).toBe(false);
  expect(info.stringValue).toBe('2019-05-24T00:00:00.000-05:00');
});

test('highlightedDays', () => {
  const wrapper = renderComponent(<Calendar />);
  const highlights: CalendarDayHighlightColor[] = [
    'blue',
    'green',
    'purple',
    'red',
    'teal',
    'yellow',
  ];

  function modifier({ dateValue }: DatePayload): boolean {
    return dateValue.day === 24;
  }

  for (const currentHighlight of highlights) {
    wrapper.rerender(
      <Calendar highlightedDays={{ [currentHighlight]: modifier }} />,
    );

    const day = wrapper.getByLabelText(/May 24 2019/);

    for (const highlight of highlights) {
      if (highlight === currentHighlight) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(day).toHaveClass(`SD-Calendar-${highlight}`);
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(day).not.toHaveClass(`SD-Calendar-${highlight}`);
      }
    }
  }
});

test('footer', () => {
  const wrapper = renderComponent(
    <Calendar
      footer={<Typography color="textSecondary">Footer helper text</Typography>}
    />,
  );

  expect(wrapper.getByText('Footer helper text')).toBeInTheDocument();
});

test('quickSelection', () => {
  const wrapper = renderComponent(
    <Calendar
      quickSelection={
        <CalendarQuickSelection>
          <CalendarQuickSelectionItem>Today</CalendarQuickSelectionItem>
          <CalendarQuickSelectionItem>Tomorrow</CalendarQuickSelectionItem>
          <CalendarQuickSelectionItem>Yesterday</CalendarQuickSelectionItem>
        </CalendarQuickSelection>
      }
    />,
  );

  expect(wrapper.getByText('Today')).toBeInTheDocument();
  expect(wrapper.getByText('Tomorrow')).toBeInTheDocument();
  expect(wrapper.getByText('Yesterday')).toBeInTheDocument();
});

test('css', () => {
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
