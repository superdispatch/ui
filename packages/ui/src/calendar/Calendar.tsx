import { Divider, Grid, Hidden, Theme } from '@material-ui/core';
import { GridDirection } from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import { ClassNameMap } from '@material-ui/styles/withStyles';
import React, { ReactNode } from 'react';
import DayPicker, {
  ClassNames,
  DayModifiers,
  DayPickerProps,
  Modifier,
} from 'react-day-picker';

import { Color, ColorVariant } from '../theme/Color';
import { fontHeightVariant, fontSizeVariant } from '../theme/TypographyStyles';
import { CalendarCaption } from './CalendarCaption';
import { CalendarNavbar } from './CalendarNavbar';
import { CalendarWeekDay } from './CalendarWeekDay';
import { DateRange, normalizeDateRange } from './DateRangeUtils';
import { isFirstDayOfMonth, isLastDayOfMonth } from './DateUtils';

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
    container: {
      display: 'inline-block',

      fontSize: fontSizeVariant('body1', true),
      lineHeight: fontHeightVariant('body1', true),

      [theme.breakpoints.up('sm')]: {
        fontSize: fontSizeVariant('body1'),
        lineHeight: fontHeightVariant('body1'),
      },
    },

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
        backgroundColor: 'transparent',
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
        backgroundColor: 'transparent',
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

export interface CalendarDayModifiers {
  disabled: boolean;
  selected: boolean;
}

export type CalendarDayEventHandler = (
  date: Date,
  modifiers: CalendarDayModifiers,
) => void;

type CalendarDayEventHandlerName =
  | 'onDayClick'
  | 'onDayKeyDown'
  | 'onDayMouseEnter'
  | 'onDayMouseLeave'
  | 'onDayMouseDown'
  | 'onDayMouseUp'
  | 'onDayTouchEnd'
  | 'onDayTouchStart';

function toDayPickerEventHandler(
  styles: ClassNameMap<keyof ClassNames>,
  handler: undefined | CalendarDayEventHandler,
): undefined | ((day: Date, modifiers: DayModifiers) => void) {
  return (
    handler &&
    ((date, modifiers) =>
      handler(date, {
        disabled: !!modifiers[styles.disabled],
        selected: !!modifiers[styles.selected],
      }))
  );
}

type CalendarDayEventProps = Partial<
  Record<CalendarDayEventHandlerName, CalendarDayEventHandler>
>;

export interface CalendarProps
  extends CalendarDayEventProps,
    Omit<
      DayPickerProps,
      | 'month'
      | 'months'
      | 'initialMonth'
      | 'selectedDays'
      | 'classNames'
      | 'navbarElement'
      | 'captionElement'
      | 'weekdayElement'
      | CalendarDayEventHandlerName
    > {
  selectedDays?: DateRange;

  direction?: GridDirection;
  classes?: Partial<ClassNameMap<keyof ClassNames>>;

  footer?: ReactNode;
  quickSelection?: ReactNode;

  highlightedDays?: Partial<
    Record<CalendarDayHighlightColor, Modifier | Modifier[]>
  >;
}

export function Calendar({
  footer,
  classes,
  direction,
  modifiers,
  quickSelection,
  selectedDays,
  highlightedDays,

  ...props
}: CalendarProps) {
  const styles = useStyles({ classes });
  const [selectedFrom, selectedTo] = normalizeDateRange(selectedDays);

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
          classNames={styles}
          navbarElement={CalendarNavbar}
          captionElement={CalendarCaption}
          weekdayElement={CalendarWeekDay}
          initialMonth={selectedFrom}
          selectedDays={
            selectedFrom && selectedTo
              ? { from: selectedFrom, to: selectedTo }
              : selectedFrom
          }
          modifiers={{
            ...modifiers,
            [styles.firstDayOfMonth]: isFirstDayOfMonth,
            [styles.lastDayOfMonth]: isLastDayOfMonth,
            [styles.blue]: highlightedDays?.blue,
            [styles.green]: highlightedDays?.green,
            [styles.purple]: highlightedDays?.purple,
            [styles.red]: highlightedDays?.red,
            [styles.teal]: highlightedDays?.teal,
            [styles.yellow]: highlightedDays?.yellow,
          }}
          onDayClick={toDayPickerEventHandler(styles, props.onDayClick)}
          onDayKeyDown={toDayPickerEventHandler(styles, props.onDayKeyDown)}
          onDayMouseEnter={toDayPickerEventHandler(
            styles,
            props.onDayMouseEnter,
          )}
          onDayMouseLeave={toDayPickerEventHandler(
            styles,
            props.onDayMouseLeave,
          )}
          onDayMouseDown={toDayPickerEventHandler(styles, props.onDayMouseDown)}
          onDayMouseUp={toDayPickerEventHandler(styles, props.onDayMouseUp)}
          onDayTouchEnd={toDayPickerEventHandler(styles, props.onDayTouchEnd)}
          onDayTouchStart={toDayPickerEventHandler(
            styles,
            props.onDayTouchStart,
          )}
        />

        {!!footer && <div className={styles.footer}>{footer}</div>}
      </Grid>
    </Grid>
  );
}
