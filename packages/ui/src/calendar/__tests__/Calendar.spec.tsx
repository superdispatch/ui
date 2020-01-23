import { renderCSS } from '@superdispatch/testutils';
import React from 'react';

import { Calendar } from '../..';

it('checks component css', () => {
  expect(renderCSS(<Calendar />, ['SuperDispatchCalendar']))
    .toMatchInlineSnapshot(`
    .SuperDispatchCalendar-container {
      display: inline-block;
      font-size: 16px;
      line-height: 24px;
    }

    @media (min-width: 600px) {
      .SuperDispatchCalendar-container {
        font-size: 14px;
        line-height: 20px;
      }
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
