import { Theme } from '@material-ui/core';
import { CSSProperties, makeStyles } from '@material-ui/styles';
import { ClassNames } from 'react-day-picker';

import { Color, ColorVariant } from '../theme/Color';

function makeNavButton(type: 'prev' | 'next'): CSSProperties {
  return {
    color: Color.Grey500,
    position: 'absolute',
    top: 12,
    left: type === 'prev' ? 12 : undefined,
    right: type === 'next' ? 12 : undefined,
  };
}

export type CalendarDayHighlightColor = Exclude<ColorVariant, 'grey' | 'silver'>;

export type CalendarClassNames =
  | keyof ClassNames
  | CalendarDayHighlightColor
  | 'firstDayOfMonth'
  | 'lastDayOfMonth';

export const useCalendarStyles = makeStyles<Theme, {}, CalendarClassNames>(
  theme => ({
    container: {
      fontSize: '1rem',
      display: 'inline-block',
    },

    wrapper: {
      userSelect: 'none',
      position: 'relative',
      flexDirection: 'row',
      paddingBottom: '1em',
      '&:focus': { outline: 'none' },
    },

    interactionDisabled: {},

    navBar: {},
    navButtonPrev: makeNavButton('prev'),
    navButtonNext: makeNavButton('next'),
    navButtonInteractionDisabled: {},

    months: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' },
    month: { margin: '0 1em', marginTop: '1em', userSelect: 'none' },

    caption: {
      padding: '0 0.5em',
      textAlign: 'center',
      marginBottom: '0.5em',
      display: 'table-caption',
    },

    weekdays: { marginTop: '1em', display: 'table-header-group' },
    weekdaysRow: { margin: '8px 0', display: 'flex' },
    weekday: {
      margin: '1px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      color: Color.Grey300,
    },
    weekNumber: {
      display: 'table-cell',
      padding: '0.5em',
      minWidth: '1em',
      borderRight: '1px solid #EAECEC',
      color: '#8B9898',
      verticalAlign: 'middle',
      textAlign: 'right',
      fontSize: '0.75em',
      cursor: 'pointer',
    },

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
      width: '40px',
      height: '40px',
      borderRadius: '4px',

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
        '&:before': { borderRadius: '4px 0 0 4px' },
      },

      '&:last-child, &$lastDayOfMonth': {
        '&:before': { borderRadius: '0 4px 4px 0' },
      },

      '&:after': {
        content: '""',
        borderRadius: 4,

        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        position: 'absolute',
        backgroundColor: 'transparent',
        transition: theme.transitions.create('background-color'),
      },

      '&:hover, &:focus': {
        outline: 'none',
      },

      '&$disabled': {
        color: Color.Grey100,

        '&$selected:not($outside):after': {
          backgroundColor: `${Color.Silver300}`,
        },
      },

      '&:not($outside):not($disabled)': {
        cursor: 'pointer',
        color: Color.Grey500,

        '&:not($selected):not(:active)': {
          '&$today': { color: Color.Blue300 },
          '&:hover, &:focus': { backgroundColor: Color.Silver100 },

          '&$blue': { color: Color.Blue500, '&': { backgroundColor: Color.Blue50 } },
          '&$green': { color: Color.Green500, '&': { backgroundColor: Color.Green50 } },
          '&$purple': { color: Color.Purple500, '&': { backgroundColor: Color.Purple50 } },
          '&$red': { color: Color.Red500, '&': { backgroundColor: Color.Red50 } },
          '&$teal': { color: Color.Teal500, '&': { backgroundColor: Color.Teal50 } },
          '&$yellow': { color: Color.Yellow500, '&': { backgroundColor: Color.Yellow50 } },
        },

        '&:active, &$selected': {
          color: Color.White,

          '&:after': {
            backgroundColor: `${Color.Blue300}`,
          },
        },
      },
    },

    footer: {
      padding: '1em',
    },

    todayButton: {
      border: 'none',
      backgroundColor: 'transparent',
      backgroundImage: 'none',
      boxShadow: 'none',
      color: '#4A90E2',
      fontSize: '0.875em',
      cursor: 'pointer',
    },
  }),
  { name: 'SuperDispatchCalendar' },
);
