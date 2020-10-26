import { Divider, Grid, GridDirection, Hidden, Theme } from '@material-ui/core';
import { ClassNameMap, makeStyles } from '@material-ui/styles';
import { Color, ColorVariant } from '@superdispatch/ui';
import { DateTime } from 'luxon';
import React, { forwardRef, ReactNode, useMemo } from 'react';
import DayPicker, {
  ClassNames,
  DayModifiers,
  DayPickerProps,
  FunctionModifier,
  Modifiers,
} from 'react-day-picker';

import {
  DateConfig,
  DateFormat,
  useDateConfig,
} from '../date-config/DateConfig';
import {
  DatePayload,
  NullableDateInput,
  stringifyDate,
} from '../date-time-utils/DateTimeUtils';
import { useDateTime } from '../use-date-time/useDateTime';
import {
  CalendarCaption,
  CalendarNavbar,
  CalendarWeekDay,
} from './InternalCalendarComponents';

//
// Styles
//

export type CalendarDayHighlightColor = Exclude<
  ColorVariant,
  'grey' | 'silver'
>;

export type CalendarClassNames =
  | keyof ClassNames
  | CalendarDayHighlightColor
  | 'firstDayOfMonth'
  | 'lastDayOfMonth';

export type CalendarClassNameMap = ClassNameMap<CalendarClassNames>;

const useStyles = makeStyles<
  Theme,
  { classes?: Partial<CalendarClassNameMap> },
  CalendarClassNames
>(
  (theme) => ({
    container: {
      display: 'inline-block',
    },

    wrapper: {
      userSelect: 'none',
      position: 'relative',
      flexDirection: 'row',
      paddingBottom: theme.spacing(2),
      '&:focus': {
        outline: 'none',
      },
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

    months: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },

    month: {
      userSelect: 'none',
      margin: theme.spacing(2, 2, 0, 2),
    },

    caption: {
      textAlign: 'center',
      display: 'table-caption',
      marginBottom: theme.spacing(1),
      padding: theme.spacing(0, 1),
    },

    weekdays: {
      display: 'table-header-group',
    },
    weekdaysRow: {
      display: 'flex',
      margin: theme.spacing(1, 0),
    },
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

    body: {
      display: 'flex',
      flexDirection: 'column',
    },

    week: {
      display: 'flex',
    },

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
        '&:before': {
          borderRadius: theme.spacing(0.5, 0, 0, 0.5),
        },
      },

      '&:last-child, &$lastDayOfMonth': {
        '&:before': {
          borderRadius: theme.spacing(0, 0.5, 0.5, 0),
        },
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

      '&:hover, &:focus': {
        outline: 'none',
      },

      '&$disabled': {
        color: Color.Grey100,
        '&$selected:not($outside):after': {
          backgroundColor: Color.Silver300,
        },
      },

      '&:not($outside):not($disabled)': {
        cursor: 'pointer',
        color: Color.Grey500,

        '&:not($selected):not(:active)': {
          '&$today': {
            color: Color.Blue300,
          },

          '&:hover, &:focus': {
            backgroundColor: Color.Silver100,
          },

          '&$blue': {
            color: Color.Blue500,
            '&': {
              backgroundColor: Color.Blue50,
            },
          },
          '&$green': {
            color: Color.Green500,
            '&': {
              backgroundColor: Color.Green50,
            },
          },
          '&$purple': {
            color: Color.Purple500,
            '&': {
              backgroundColor: Color.Purple50,
            },
          },
          '&$red': {
            color: Color.Red500,
            '&': {
              backgroundColor: Color.Red50,
            },
          },
          '&$teal': {
            color: Color.Teal500,
            '&': {
              backgroundColor: Color.Teal50,
            },
          },
          '&$yellow': {
            color: Color.Yellow500,
            '&': {
              backgroundColor: Color.Yellow50,
            },
          },
        },

        '&:active, &$selected': {
          color: Color.White,
          '&:after': {
            backgroundColor: Color.Blue300,
          },
        },
      },
    },

    footer: {
      padding: theme.spacing(2),
    },

    todayButton: {},
  }),
  { name: 'SD-Calendar' },
);

//
// Utility Types
//

export type CalendarModifier = (info: DatePayload) => boolean;

export interface CalendarDateEvent extends DatePayload {
  disabled: boolean;
  selected: boolean;
}

export type CalendarDayEventHandler = (event: CalendarDateEvent) => void;

export interface CalendarModifiers {
  today?: CalendarModifier;
  outside?: CalendarModifier;
  [other: string]: undefined | CalendarModifier;
}

export type CalendarHighlightedDays = Partial<
  Record<CalendarDayHighlightColor, CalendarModifier>
>;

//
// Internal Utils
//

function toDayPickerModifier(
  config: DateConfig,
  modifier: undefined | CalendarModifier,
): undefined | FunctionModifier {
  if (!modifier) {
    return undefined;
  }

  return (localDate) => {
    const dateValue = DateTime.fromObject({
      year: localDate.getFullYear(),
      month: localDate.getMonth() + 1,
      day: localDate.getDate(),
      hour: localDate.getHours(),
      minute: localDate.getMinutes(),
      second: localDate.getSeconds(),
      millisecond: localDate.getMilliseconds(),
    });

    return modifier({
      config,
      dateValue,
      stringValue: stringifyDate(dateValue, config),
    });
  };
}

function toDayPickerHandler(
  config: DateConfig,
  classes: CalendarClassNameMap,
  initialTime: DateTime,
  handler: undefined | CalendarDayEventHandler,
) {
  if (!handler) {
    return undefined;
  }

  return (localDate: Date, modifiers: DayModifiers) => {
    const dateValue = DateTime.fromObject({
      year: localDate.getFullYear(),
      month: localDate.getMonth() + 1,
      day: localDate.getDate(),
      hour: initialTime.hour,
      minute: initialTime.minute,
      second: initialTime.second,
      millisecond: initialTime.millisecond,
    });

    return handler({
      disabled: !!modifiers[classes.disabled],
      selected: !!modifiers[classes.selected],

      config,
      dateValue,
      stringValue: stringifyDate(dateValue, config),
    });
  };
}

//
// Calendar
//

export interface CalendarProps extends Pick<DayPickerProps, 'numberOfMonths'> {
  direction?: GridDirection;
  classes?: Partial<CalendarClassNameMap>;

  footer?: ReactNode;
  quickSelection?: ReactNode;

  format?: DateFormat;
  initialTime?: NullableDateInput;
  initialMonth?: NullableDateInput;

  modifiers?: CalendarModifiers;
  selectedDays?: CalendarModifier;
  disabledDays?: CalendarModifier;
  highlightedDays?: CalendarHighlightedDays;

  onDayClick?: CalendarDayEventHandler;
  onDayKeyDown?: CalendarDayEventHandler;
  onDayMouseEnter?: CalendarDayEventHandler;
  onDayMouseLeave?: CalendarDayEventHandler;
  onDayMouseDown?: CalendarDayEventHandler;
  onDayMouseUp?: CalendarDayEventHandler;
  onDayTouchEnd?: CalendarDayEventHandler;
  onDayTouchStart?: CalendarDayEventHandler;
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
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

      modifiers,
      highlightedDays,

      format: formatProp,
      initialTime: initialTimeInputProp,
      initialMonth: initialMonthInputProp,

      ...dayPickerProps
    },
    ref,
  ) => {
    const styles = useStyles({ classes });
    const config = useDateConfig({ format: formatProp });

    const initialTimeInput = useDateTime(initialTimeInputProp, config);
    const initialMonthInput = useDateTime(initialMonthInputProp, config);

    const [initialTime, initialMonth] = useMemo(() => {
      let time = initialTimeInput;
      let month = initialMonthInput;

      if (!month.isValid) {
        month = DateTime.local().startOf('month');
      }

      if (!time.isValid) {
        time = month;
      }

      return [
        time,
        new Date(
          month.year,
          month.month - 1,
          month.day,
          month.hour,
          month.minute,
          month.second,
          month.millisecond,
        ),
      ];
    }, [initialTimeInput, initialMonthInput]);

    const wrapModifier = toDayPickerModifier.bind(null, config);
    const wrapHandler = toDayPickerHandler.bind(
      null,
      config,
      styles,
      initialTime,
    );

    const dayPickerModifiers: Partial<Modifiers> = {
      [styles.firstDayOfMonth]: wrapModifier(
        ({ dateValue }) => dateValue.day === 1,
      ),
      [styles.lastDayOfMonth]: wrapModifier(
        ({ dateValue }) => dateValue.day === dateValue.daysInMonth,
      ),
    };

    if (modifiers) {
      for (const [key, modifier] of Object.entries(modifiers)) {
        dayPickerModifiers[key] = wrapModifier(modifier);
      }
    }

    if (highlightedDays) {
      for (const [key, modifier] of Object.entries(highlightedDays) as Array<
        [CalendarDayHighlightColor, CalendarModifier]
      >) {
        dayPickerModifiers[styles[key]] = wrapModifier(modifier);
      }
    }

    return (
      <Grid ref={ref} container={true} direction={direction}>
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
            {...dayPickerProps}
            classNames={styles}
            navbarElement={CalendarNavbar}
            captionElement={CalendarCaption}
            weekdayElement={CalendarWeekDay}
            initialMonth={initialMonth}
            modifiers={dayPickerModifiers}
            selectedDays={wrapModifier(selectedDays)}
            disabledDays={wrapModifier(disabledDays)}
            onDayClick={wrapHandler(onDayClick)}
            onDayKeyDown={wrapHandler(onDayKeyDown)}
            onDayMouseEnter={wrapHandler(onDayMouseEnter)}
            onDayMouseLeave={wrapHandler(onDayMouseLeave)}
            onDayMouseDown={wrapHandler(onDayMouseDown)}
            onDayMouseUp={wrapHandler(onDayMouseUp)}
            onDayTouchEnd={wrapHandler(onDayTouchEnd)}
            onDayTouchStart={wrapHandler(onDayTouchStart)}
          />

          {!!footer && <div className={styles.footer}>{footer}</div>}
        </Grid>
      </Grid>
    );
  },
);
