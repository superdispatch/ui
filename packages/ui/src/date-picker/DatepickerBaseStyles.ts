import { createStyles, CSSProperties } from '@material-ui/styles';

import { Color } from '../theme/Color';

const cellStyles: CSSProperties = {
  margin: '1px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
};

const navButtonArrowStyles: CSSProperties = {
  content: '""',
  display: 'block',
  width: '10px',
  height: '10px',
  border: 'solid currentColor',
  borderWidth: '0 0 2px 2px',
  transform: 'rotate(45deg)',
};

const navButtonStyles: CSSProperties = {
  top: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  color: Color.Grey15,
  position: 'absolute',

  '&:after': {
    ...navButtonArrowStyles,
  },
  '&:hover': {
    cursor: 'pointer',
    color: Color.Blue,
  },
};

export const datePickerBaseStyles = createStyles({
  container: {
    display: 'inline-block',
    fontSize: '1rem',
  },
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    paddingBottom: '1em',
    userSelect: 'none',
  },
  interactionDisabled: {
    display: 'none',
  },
  months: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  month: {
    margin: '0 1em',
    marginTop: '1em',
    userSelect: 'none',
  },
  navBar: {
    position: 'relative',
    margin: '0 1em',
  },
  navButtonPrev: {
    ...navButtonStyles,
    left: 0,
    '&:after': {
      ...navButtonArrowStyles,
      borderWidth: '0 0 2px 2px',
    },
  },
  navButtonNext: {
    ...navButtonStyles,
    right: 0,
    '&:after': {
      ...navButtonArrowStyles,
      borderWidth: '2px 2px 0 0',
    },
  },
  navButtonInteractionDisabled: {
    display: 'none',
  },
  caption: {
    display: 'table-caption',
    marginBottom: '0.5em',
    padding: '0 0.5em',
    textAlign: 'center',
  },
  weekdays: {
    display: 'table-header-group',
    marginTop: '1em',
  },
  weekdaysRow: {
    display: 'flex',
    margin: '8px 0',
  },
  weekday: {
    ...cellStyles,
    color: Color.Grey,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  week: {
    display: 'flex',
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
  day: {
    ...cellStyles,
    color: Color.Grey15,
    position: 'relative',
    cursor: 'pointer',
  },
  footer: { paddingTop: '0.5em' },
  todayButton: {
    border: 'none',
    backgroundColor: 'transparent',
    backgroundImage: 'none',
    boxShadow: 'none',
    color: '#4A90E2',
    fontSize: '0.875em',
    cursor: 'pointer',
  },

  // default modifiers
  today: {
    color: Color.Blue,
  },
  selected: {},
  disabled: {},
  outside: {
    visibility: 'hidden',
  },
});
