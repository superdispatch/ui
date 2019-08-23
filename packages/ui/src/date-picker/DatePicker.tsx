import React, { useState, useEffect } from 'react';
import DayPicker from 'react-day-picker';
import { makeStyles, CSSProperties } from '@material-ui/styles';
import { Popover, Paper } from '@material-ui/core';
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

const useStyles = makeStyles({
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
      "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC')",
  },
  navButtonNext: {
    ...navButtonStyles,
    right: 0,
    backgroundImage:
      "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==')",
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

const WEEKDAYS_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export type DatePickerValue = Date[];

export interface DatePickerInputComponentProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: DatePickerValue;
}

export interface DatePickerProps {
  value: DatePickerValue;
  InputComponent: React.ComponentType<DatePickerInputComponentProps>;
  onChange: (value: DatePickerValue) => void;
}

export function DatePicker({ value, InputComponent, onChange }: DatePickerProps) {
  const { firstDayOfRange, lastDayOfRange, ...classNames } = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const [pickingDateType, setPickingDateType] = useState<'start' | 'end'>('start');
  const [startDate, setStartDate] = useState(value[0]);
  const [endDate, setEndDate] = useState(value[1]);
  const selectedDays = startDate && endDate && { from: startDate, to: endDate };
  const modifiers = { [firstDayOfRange]: startDate, [lastDayOfRange]: endDate };

  const handleOpen = (event: React.MouseEvent<HTMLInputElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleDayClick = (date: Date) => {
    if (pickingDateType === 'start') {
      setStartDate(date);
      setPickingDateType('end');
    }

    if (pickingDateType === 'end') {
      setEndDate(date);
      setPickingDateType('start');
    }
  };

  useEffect(() => {
    onChange([startDate, endDate].sort());
  }, [endDate, onChange, startDate]);

  return (
    <>
      <InputComponent onClick={handleOpen} value={value} readOnly={true} />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
      >
        <Paper>
          <DayPicker
            classNames={classNames}
            weekdaysShort={WEEKDAYS_SHORT}
            numberOfMonths={2}
            onDayClick={handleDayClick}
            selectedDays={selectedDays}
            modifiers={modifiers}
          />
        </Paper>
      </Popover>
    </>
  );
}
