import { MockEvent } from '@superdispatch/testutils/';
import { ThemeProvider } from '@superdispatch/ui';
import { renderCSS } from '@superdispatch/ui-testutils';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockDate from 'mockdate';
import React, { ComponentType, ReactElement } from 'react';

import { DateContextProvider } from '../../DateContext';
import { DateUtils } from '../../DateUtils';
import {
  Calendar,
  CalendarDayHighlightColor,
  CalendarModifier,
} from '../Calendar';

const stubTimeZoneOffset = -300;
const stubUtils = new DateUtils({ timeZoneOffset: stubTimeZoneOffset });
const stubModifier: CalendarModifier = (date, utils) =>
  utils.isSameDate(
    date,
    utils.fromObject({ year: 2019, month: 5, day: 24 }),
    'day',
  );

beforeEach(() => {
  MockDate.set(Date.UTC(2019, 4, 24, 1, 2, 3, 45));
});

afterEach(() => {
  MockDate.reset();
});

const Wrapper: ComponentType = ({ children }) => (
  <ThemeProvider>
    <DateContextProvider timeZoneOffset={stubTimeZoneOffset}>
      {children}
    </DateContextProvider>
  </ThemeProvider>
);

function renderCalendar(ui: ReactElement) {
  return render(ui, { wrapper: Wrapper });
}

it('renders month', () => {
  const wrapper = renderCalendar(<Calendar />);

  expect(wrapper.getByRole('heading')).toHaveTextContent('May 2019');

  userEvent.click(wrapper.getByLabelText('Previous Month'));

  expect(wrapper.getByRole('heading')).toHaveTextContent('April 2019');

  userEvent.click(wrapper.getByLabelText('Next Month'));

  expect(wrapper.getByRole('heading')).toHaveTextContent('May 2019');
});

it('renders weeks', () => {
  const wrapper = renderCalendar(<Calendar />);

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
  const wrapper = renderCalendar(<Calendar />);

  expect(wrapper.getByLabelText(/May 24 2019/)).toHaveTextContent('24');
});

it('sets start of date when `initialTime` not passed', () => {
  const onDayClick = jest.fn();
  const wrapper = renderCalendar(<Calendar onDayClick={onDayClick} />);

  expect(onDayClick).not.toHaveBeenCalled();
  MockEvent.click(wrapper.getByLabelText(/May 24 2019/));
  expect(onDayClick).toHaveBeenCalledTimes(1);
  expect(onDayClick).toHaveBeenCalledWith(
    stubUtils.fromObject({
      year: 2019,
      month: 5,
      day: 24,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    { disabled: false, selected: false },
  );
});

it('selects days', () => {
  const onDayClick = jest.fn();
  const wrapper = renderCalendar(
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
    'SuperDispatchCalendar-selected',
  );

  for (let day = 24; day <= 27; day++) {
    const element = wrapper.getByLabelText(new RegExp(`May ${day} 2019`));

    expect(element).toHaveClass('SuperDispatchCalendar-selected');

    MockEvent.click(element);

    expect(onDayClick).toHaveBeenCalledTimes(1);
    expect(onDayClick).toHaveBeenCalledWith(
      stubUtils.fromObject({ year: 2019, month: 5, day }),
      { disabled: false, selected: true },
    );

    onDayClick.mockClear();
  }

  expect(wrapper.getByLabelText(/May 28 2019/)).not.toHaveClass(
    'SuperDispatchCalendar-selected',
  );
});

it('disables day', () => {
  const onDayClick = jest.fn();
  const wrapper = renderCalendar(
    <Calendar onDayClick={onDayClick} disabledDays={stubModifier} />,
  );

  expect(wrapper.getByLabelText(/May 24 2019/)).toHaveClass(
    'SuperDispatchCalendar-disabled',
  );

  MockEvent.click(wrapper.getByLabelText(/May 24 2019/));

  expect(onDayClick).toHaveBeenCalledTimes(1);
  expect(onDayClick).toHaveBeenCalledWith(
    stubUtils.fromObject({ year: 2019, month: 5, day: 24 }),
    { disabled: true, selected: false },
  );
});

it('highlights days', () => {
  const wrapper = renderCalendar(<div />);
  const highlights: CalendarDayHighlightColor[] = [
    'blue',
    'green',
    'purple',
    'red',
    'teal',
    'yellow',
  ];

  highlights.forEach(highlight => {
    wrapper.rerender(
      <Calendar
        selectedDays={stubModifier}
        highlightedDays={{ [highlight]: stubModifier }}
      />,
    );

    const day = wrapper.getByLabelText(/May 24 2019/);

    expect(day).toHaveClass(`SuperDispatchCalendar-${highlight}`);
  });
});

it('checks component css', () => {
  expect(renderCSS(<Calendar />, ['SuperDispatchCalendar']))
    .toMatchInlineSnapshot(`
    .SuperDispatchCalendar-container {
      display: inline-block;
    }

    .SuperDispatchCalendar-wrapper {
      position: relative;
      user-select: none;
      flex-direction: row;
      padding-bottom: 16px;
    }

    .SuperDispatchCalendar-wrapper:focus {
      outline: none;
    }

    .SuperDispatchCalendar-navButtonPrev {
      top: 12px;
      left: 12px;
      position: absolute;
    }

    .SuperDispatchCalendar-navButtonNext {
      top: 12px;
      right: 12px;
      position: absolute;
    }

    .SuperDispatchCalendar-months {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .SuperDispatchCalendar-month {
      margin: 16px 16px 0px 16px;
      user-select: none;
    }

    .SuperDispatchCalendar-caption {
      display: table-caption;
      padding: 0px 8px;
      text-align: center;
      margin-bottom: 8px;
    }

    .SuperDispatchCalendar-weekdays {
      display: table-header-group;
    }

    .SuperDispatchCalendar-weekdaysRow {
      margin: 8px 0px;
      display: flex;
    }

    .SuperDispatchCalendar-weekday {
      color: Color.Grey300;
      width: 40px;
      height: 40px;
      margin: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    .SuperDispatchCalendar-body {
      display: flex;
      flex-direction: column;
    }

    .SuperDispatchCalendar-week {
      display: flex;
    }

    .SuperDispatchCalendar-day {
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

    .SuperDispatchCalendar-day:before {
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

    .SuperDispatchCalendar-day:after {
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

    .SuperDispatchCalendar-day:hover,
    .SuperDispatchCalendar-day:focus {
      outline: none;
    }

    .SuperDispatchCalendar-day.SuperDispatchCalendar-disabled {
      color: Color.Grey100;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled) {
      color: Color.Grey500;
      cursor: pointer;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):active,
    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled).SuperDispatchCalendar-selected {
      color: Color.White;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):active:after,
    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled).SuperDispatchCalendar-selected:after {
      background-color: Color.Blue300;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-today {
      color: Color.Blue300;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active):hover,
    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active):focus {
      background-color: Color.Silver100;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-blue {
      color: Color.Blue500;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-green {
      color: Color.Green500;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-purple {
      color: Color.Purple500;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-red {
      color: Color.Red500;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-teal {
      color: Color.Teal500;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-yellow {
      color: Color.Yellow500;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-yellow {
      background-color: Color.Yellow50;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-teal {
      background-color: Color.Teal50;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-red {
      background-color: Color.Red50;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-purple {
      background-color: Color.Purple50;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-green {
      background-color: Color.Green50;
    }

    .SuperDispatchCalendar-day:not(.SuperDispatchCalendar-outside):not(.SuperDispatchCalendar-disabled):not(.SuperDispatchCalendar-selected):not(:active).SuperDispatchCalendar-blue {
      background-color: Color.Blue50;
    }

    .SuperDispatchCalendar-day.SuperDispatchCalendar-disabled.SuperDispatchCalendar-selected:not(.SuperDispatchCalendar-outside):after {
      background-color: Color.Silver300;
    }

    .SuperDispatchCalendar-day:last-child:before,
    .SuperDispatchCalendar-day.SuperDispatchCalendar-lastDayOfMonth:before {
      border-radius: 0px 4px 4px 0px;
    }

    .SuperDispatchCalendar-day:first-child:before,
    .SuperDispatchCalendar-day.SuperDispatchCalendar-firstDayOfMonth:before {
      border-radius: 4px 0px 0px 4px;
    }

    .SuperDispatchCalendar-footer {
      padding: 16px;
    }
  `);
});
