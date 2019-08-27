import { CSSProperties, makeStyles, createStyles } from '@material-ui/styles';
import { Color } from '../theme/Color';

const navButtonStyles: CSSProperties = {
  top: '1em',
  display: 'inline-block',
  marginTop: '2px',
  width: '1.25em',
  height: '1.25em',
  backgroundPosition: 'center',
  backgroundSize: '50%',
  backgroundRepeat: 'no-repeat',
  color: '#8B9898',
  cursor: 'pointer',
  position: 'absolute',
};

const cutoffRangeDayStyles: CSSProperties = {
  // FIX ME: Don't use `!important`
  background: `${Color.Blue} !important`,
};

export const datePickerStyles = createStyles({
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
    backgroundImage:
      'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDggMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcuNDEgMTAuNThMMi44MyA2TDcuNDEgMS40MUw2IDBMMCA2TDYgMTJMNy40MSAxMC41OFoiIGZpbGw9IiM5NzlDQTQiLz48L3N2Zz4=)',
  },
  navButtonNext: {
    ...navButtonStyles,
    right: 0,
    backgroundImage:
      'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDggMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAuNTg5ODQ0IDEwLjU4TDUuMTY5ODQgNkwwLjU4OTg0NCAxLjQxTDEuOTk5ODQgMEw3Ljk5OTg0IDZMMS45OTk4NCAxMkwwLjU4OTg0NCAxMC41OFoiIGZpbGw9IiM5Mjk3QTAiLz48L3N2Zz4=)',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '32px',
    color: '#8B9898',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  week: {
    display: 'flex',
    margin: '1px 0',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
  },
  firstDayOfRange: {
    borderRadius: '4px 0 0 4px',
    ...cutoffRangeDayStyles,
  },
  lastDayOfRange: {
    borderRadius: '0 4px 4px 0',
    ...cutoffRangeDayStyles,
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
  selected: {
    background: Color.Blue95,
  },
  disabled: {},
  outside: {},
});

export const useStyles = makeStyles(datePickerStyles);
