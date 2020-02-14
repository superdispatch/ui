import { Divider, Grid, GridDirection, Hidden, Theme } from '@material-ui/core';
import { ClassNameMap, makeStyles } from '@material-ui/styles';
import { Color, ColorVariant } from '@superdispatch/ui';
import React, { ReactNode, useCallback, useMemo } from 'react';
import DayPicker, {
  ClassNames,
  DayModifiers,
  DayPickerProps,
  FunctionModifier,
} from 'react-day-picker';

import { CalendarCaption } from './CalendarCaption';
import { CalendarNavbar } from './CalendarNavbar';
import { CalendarWeekDay } from './CalendarWeekDay';
import { useDateUtils } from './DateContext';
import {
  DateRangeLike,
  DateUtils,
  isValidDate,
  NullableDate,
  toDateRange,
} from './DateUtils';

export type CalendarDayHighlightColor = Exclude<
  ColorVariant,
  'grey' | 'silver'
>;
export type CalendarClassNames =
  | keyof ClassNames
  | CalendarDayHighlightColor
  | 'firstDayOfMonth'
  | 'lastDayOfMonth';

const useStyles = makeStyles<Theme, {}, CalendarClassNames>(
  theme => ({
    container: { display: 'inline-block' },

    wrapper: {
      userSelect: 'none',
      position: 'relative',
      flexDirection: 'row',
      paddingBottom: theme.spacing(2),
      '&:focus': { outline: 'none' },
    },

    interactionDisabled: {},

    navBar: {},
    navButtonPrev: {
      position: 'absolute',
      top: theme.spacing(1.5),
      left: theme.spacing(1.5),
    },
    navButtonNext: {
      position: 'absolute',
      top: theme.spacing(1.5),
      right: theme.spacing(1.5),
    },
    navButtonInteractionDisabled: {},

    months: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' },
    month: { userSelect: 'none', margin: theme.spacing(2, 2, 0, 2) },

    caption: {
      textAlign: 'center',
      display: 'table-caption',
      marginBottom: theme.spacing(1),
      padding: theme.spacing(0, 1),
    },

    weekdays: { display: 'table-header-group' },
    weekdaysRow: { display: 'flex', margin: theme.spacing(1, 0) },
    weekday: {
      margin: '1px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',

      color: Color.Grey300,
      width: theme.spacing(5),
      height: theme.spacing(5),
    },

    weekNumber: {},

    body: { display: 'flex', flexDirection: 'column' },
    week: { display: 'flex' },

    // Day modifiers.
    today: {},
    outside: {},
    selected: {},
    disabled: {},
    firstDayOfMonth: {},
    lastDayOfMonth: {},

    blue: {},
    green: {},
    purple: {},
    red: {},
    teal: {},
    yellow: {},

    day: {
      zIndex: 1,
      margin: '1px',
      width: theme.spacing(5),
      height: theme.spacing(5),
      borderRadius: theme.spacing(0.5),

      position: 'relative',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      transition: theme.transitions.create(['color', 'background-color']),

      '&:before': {
        content: '""',
        top: 0,
        left: -1,
        right: -1,
        bottom: 0,
        zIndex: -1,
        position: 'absolute',
        backgroundColor: Color.Transparent,
        transition: theme.transitions.create('background-color'),
      },

      '&:first-child, &$firstDayOfMonth': {
        '&:before': { borderRadius: theme.spacing(0.5, 0, 0, 0.5) },
      },

      '&:last-child, &$lastDayOfMonth': {
        '&:before': { borderRadius: theme.spacing(0, 0.5, 0.5, 0) },
      },

      '&:after': {
        content: '""',
        borderRadius: theme.spacing(0.5),

        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        position: 'absolute',
        backgroundColor: Color.Transparent,
        transition: theme.transitions.create('background-color'),
      },

      '&:hover, &:focus': { outline: 'none' },

      '&$disabled': {
        color: Color.Grey100,
        '&$selected:not($outside):after': { backgroundColor: Color.Silver300 },
      },

      '&:not($outside):not($disabled)': {
        cursor: 'pointer',
        color: Color.Grey500,

        '&:not($selected):not(:active)': {
          '&$today': { color: Color.Blue300 },
          '&:hover, &:focus': { backgroundColor: Color.Silver100 },

          '&$blue': {
            color: Color.Blue500,
            '&': { backgroundColor: Color.Blue50 },
          },
          '&$green': {
            color: Color.Green500,
            '&': { backgroundColor: Color.Green50 },
          },
          '&$purple': {
            color: Color.Purple500,
            '&': { backgroundColor: Color.Purple50 },
          },
          '&$red': {
            color: Color.Red500,
            '&': { backgroundColor: Color.Red50 },
          },
          '&$teal': {
            color: Color.Teal500,
            '&': { backgroundColor: Color.Teal50 },
          },
          '&$yellow': {
            color: Color.Yellow500,
            '&': { backgroundColor: Color.Yellow50 },
          },
        },

        '&:active, &$selected': {
          color: Color.White,
          '&:after': { backgroundColor: Color.Blue300 },
        },
      },
    },

    footer: { padding: theme.spacing(2) },

    todayButton: {},
  }),
  { name: 'SuperDispatchCalendar' },
);

function toLocalDate(utils: DateUtils, date: NullableDate): undefined | Date {
  if (!isValidDate(date)) {
    return undefined;
  }

  const object = utils.toObject(date);

  return new Date(
    object.year,
    object.month - 1,
    object.day,
    object.hour,
    object.minute,
    object.second,
    object.millisecond,
  );
}

function fromLocalDate(utils: DateUtils, date: Date): Date {
  return utils.fromObject({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds(),
  });
}

export interface CalendarDayModifiers {
  disabled: boolean;
  selected: boolean;
}

type CalendarDayEventHandlerName =
  | 'onDayClick'
  | 'onDayKeyDown'
  | 'onDayMouseEnter'
  | 'onDayMouseLeave'
  | 'onDayMouseDown'
  | 'onDayMouseUp'
  | 'onDayTouchEnd'
  | 'onDayTouchStart';

export type CalendarDayEventHandler = (
  date: Date,
  modifiers: CalendarDayModifiers,
) => void;

type CalendarDayEventProps = Partial<
  Record<CalendarDayEventHandlerName, CalendarDayEventHandler>
>;

type ReactDayPickerDayEventHandler = (
  day: Date,
  modifiers: DayModifiers,
) => void;

function wrapHandlers(
  utils: DateUtils,
  styles: ClassNameMap<keyof ClassNames>,
  initialTime: NullableDate,
  onDayClick: undefined | CalendarDayEventHandler,
  onDayKeyDown: undefined | CalendarDayEventHandler,
  onDayMouseEnter: undefined | CalendarDayEventHandler,
  onDayMouseLeave: undefined | CalendarDayEventHandler,
  onDayMouseDown: undefined | CalendarDayEventHandler,
  onDayMouseUp: undefined | CalendarDayEventHandler,
  onDayTouchEnd: undefined | CalendarDayEventHandler,
  onDayTouchStart: undefined | CalendarDayEventHandler,
): Partial<Record<CalendarDayEventHandlerName, ReactDayPickerDayEventHandler>> {
  const wrap = (
    fn: undefined | CalendarDayEventHandler,
  ): undefined | ReactDayPickerDayEventHandler =>
    fn &&
    ((date, modifiers) =>
      fn(
        utils.fromObject({
          ...utils.toObject(
            isValidDate(initialTime)
              ? initialTime
              : utils.startOf(Date.now(), 'day'),
          ),

          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        }),
        {
          disabled: !!modifiers[styles.disabled],
          selected: !!modifiers[styles.selected],
        },
      ));

  return {
    onDayClick: wrap(onDayClick),
    onDayKeyDown: wrap(onDayKeyDown),
    onDayMouseEnter: wrap(onDayMouseEnter),
    onDayMouseLeave: wrap(onDayMouseLeave),
    onDayMouseDown: wrap(onDayMouseDown),
    onDayMouseUp: wrap(onDayMouseUp),
    onDayTouchEnd: wrap(onDayTouchEnd),
    onDayTouchStart: wrap(onDayTouchStart),
  };
}

function wrapModifier(
  utils: DateUtils,
  modifier: undefined | CalendarModifier,
): undefined | FunctionModifier {
  return modifier && (date => modifier(fromLocalDate(utils, date)));
}

export type CalendarModifier = (date: Date) => boolean;
export interface CalendarModifiers {
  today?: CalendarModifier;
  outside?: CalendarModifier;
  [other: string]: undefined | CalendarModifier;
}

export interface CalendarProps
  extends CalendarDayEventProps,
    Omit<
      DayPickerProps,
      | 'month'
      | 'months'
      | 'modifiers'
      | 'initialMonth'
      | 'selectedDays'
      | 'disabledDays'
      | 'classNames'
      | 'navbarElement'
      | 'captionElement'
      | 'weekdayElement'
      | 'weekdaysLong'
      | 'weekdaysShort'
      | CalendarDayEventHandlerName
    > {
  selectedDays?: DateRangeLike;

  direction?: GridDirection;
  classes?: Partial<ClassNameMap<keyof ClassNames>>;

  footer?: ReactNode;
  quickSelection?: ReactNode;

  disabledDays?: CalendarModifier;
  modifiers?: CalendarModifiers;
  highlightedDays?: Partial<
    Record<CalendarDayHighlightColor, CalendarModifier>
  >;
}

export function Calendar({
  footer,
  classes,
  direction,
  quickSelection,
  selectedDays,
  disabledDays,

  onDayClick,
  onDayKeyDown,
  onDayMouseEnter,
  onDayMouseLeave,
  onDayMouseDown,
  onDayMouseUp,
  onDayTouchEnd,
  onDayTouchStart,

  modifiers = {},
  highlightedDays = {},

  ...props
}: CalendarProps) {
  const utils = useDateUtils();
  const styles = useStyles({ classes });
  const [initialStart, initialFinish] = useMemo(
    () => toDateRange(selectedDays),
    [selectedDays],
  );
  const [start, finish] = useMemo(
    () => [toLocalDate(utils, initialStart), toLocalDate(utils, initialFinish)],
    [initialFinish, initialStart, utils],
  );

  const isFirstDayOfMonth = useCallback(
    (localDate: Date): boolean => {
      const date = fromLocalDate(utils, localDate);

      return utils.isSameDate(date, utils.startOf(date, 'month'), 'day');
    },
    [utils],
  );

  const isLastDayOfMonth = useCallback(
    (localDate: Date): boolean => {
      const date = fromLocalDate(utils, localDate);

      return utils.isSameDate(date, utils.endOf(date, 'month'), 'day');
    },
    [utils],
  );

  return (
    <Grid container={true} direction={direction}>
      {!!quickSelection && (
        <>
          <Grid item={true} xs={12} sm="auto">
            {quickSelection}
          </Grid>

          <Hidden xsDown={true}>
            <Grid item={true} sm="auto">
              <Divider orientation="vertical" />
            </Grid>
          </Hidden>

          <Hidden smUp={true}>
            <Grid item={true} xs={12}>
              <Divider orientation="horizontal" />
            </Grid>
          </Hidden>
        </>
      )}

      <Grid item={true} xs={12} sm="auto">
        <DayPicker
          {...props}
          {...wrapHandlers(
            utils,
            styles,
            initialStart,
            onDayClick,
            onDayKeyDown,
            onDayMouseEnter,
            onDayMouseLeave,
            onDayMouseDown,
            onDayMouseUp,
            onDayTouchEnd,
            onDayTouchStart,
          )}
          classNames={styles}
          navbarElement={CalendarNavbar}
          captionElement={CalendarCaption}
          weekdayElement={CalendarWeekDay}
          initialMonth={start}
          disabledDays={wrapModifier(utils, disabledDays)}
          selectedDays={!start || !finish ? start : { from: start, to: finish }}
          modifiers={{
            ...Object.keys(modifiers).reduce<CalendarModifiers>((acc, key) => {
              acc[key] = wrapModifier(utils, modifiers[key]);

              return acc;
            }, {}),

            [styles.firstDayOfMonth]: isFirstDayOfMonth,
            [styles.lastDayOfMonth]: isLastDayOfMonth,
            [styles.blue]: wrapModifier(utils, highlightedDays.blue),
            [styles.green]: wrapModifier(utils, highlightedDays.green),
            [styles.purple]: wrapModifier(utils, highlightedDays.purple),
            [styles.red]: wrapModifier(utils, highlightedDays.red),
            [styles.teal]: wrapModifier(utils, highlightedDays.teal),
            [styles.yellow]: wrapModifier(utils, highlightedDays.yellow),
          }}
        />

        {!!footer && <div className={styles.footer}>{footer}</div>}
      </Grid>
    </Grid>
  );
}
