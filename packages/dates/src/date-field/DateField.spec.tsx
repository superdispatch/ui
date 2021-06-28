import { InputAdornment } from '@material-ui/core';
import { mockDate, renderComponent } from '@superdispatch/ui-testutils';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateTime } from 'luxon';
import { useState } from 'react';
import {
  DateConfigProvider,
  DateFormat,
  defaultDateConfig,
} from '../date-config/DateConfig';
import {
  DatePayload,
  DateString,
  NullableDateString,
} from '../date-time-utils/DateTimeUtils';
import { DateField, DateFieldProps } from './DateField';

beforeEach(() => {
  mockDate();
});

function UncontrolledDateField(props: DateFieldProps) {
  const [info, setInfo] = useState<DatePayload>();

  return <DateField {...props} onChange={setInfo} value={info?.stringValue} />;
}

test('basic', () => {
  const onChange = jest.fn();
  renderComponent(<DateField onChange={onChange} />);

  expect(screen.queryByRole('grid')).toBeNull();
  expect(screen.getByRole('textbox')).toHaveValue('');

  userEvent.click(screen.getByRole('textbox'));

  expect(onChange).not.toHaveBeenCalled();
  userEvent.click(screen.getByRole('gridcell', { name: /May 24/ }));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    dateValue: expect.any(DateTime),
    stringValue: '2019-05-24T00:00:00.000-05:00',
  });

  expect(screen.queryByRole('grid')).toBeNull();
  expect(screen.getByRole('textbox')).toHaveValue('');
});

test('uncontrolled', () => {
  renderComponent(<UncontrolledDateField />);

  expect(screen.getByRole('textbox')).toHaveValue('');

  userEvent.click(screen.getByRole('textbox'));
  userEvent.click(screen.getByRole('gridcell', { name: /May 24/ }));

  expect(screen.getByRole('textbox')).toHaveValue('May 24, 2019');
});

test.each<
  [
    contextFormat: undefined | DateFormat,
    propsFormat: undefined | DateFormat,
    input: NullableDateString,
    inputValue: string,
    expectedFormat: DateFormat,
    expectedValue: DateString,
  ]
>([
  [
    undefined,
    undefined,
    '2019-05-20',
    'May 20, 2019',
    'DateTimeISO',
    '2019-05-24T00:00:00.000-05:00',
  ],

  [
    'JodaISO',
    undefined,
    '2019-05-20T00:00:00.000-0500',
    'May 20, 2019',
    'JodaISO',
    '2019-05-24T00:00:00.000-0500',
  ],

  ['JodaISO', 'DateISO', '2019-05-20', 'May 20, 2019', 'DateISO', '2019-05-24'],
])(
  'DateConfig format={%p}: DateField format={%p} value={%p}',
  (
    contextFormat,
    propsFormat,
    input,
    inputValue,
    expectedFormat,
    expectedValue,
  ) => {
    const onChange = jest.fn();
    renderComponent(
      <DateConfigProvider format={contextFormat}>
        <DateField value={input} onChange={onChange} format={propsFormat} />
      </DateConfigProvider>,
    );

    expect(screen.getByRole('textbox')).toHaveValue(inputValue);

    userEvent.click(screen.getByRole('textbox'));
    userEvent.click(screen.getByRole('gridcell', { name: /May 24/ }));

    expect(onChange).toHaveBeenLastCalledWith({
      dateValue: expect.any(DateTime),
      stringValue: expectedValue,
      config: { format: expectedFormat },
    });
  },
);

test('close on select', () => {
  renderComponent(<DateField />);

  expect(screen.queryByRole('grid')).toBeNull();

  userEvent.click(screen.getByRole('textbox'));
  userEvent.click(screen.getByRole('gridcell', { name: /May 25/ }));

  expect(screen.queryByRole('grid')).toBeNull();
});

test('onClick', () => {
  let prevent = false;

  renderComponent(
    <DateField
      onClick={(event) => {
        if (prevent) event.preventDefault();
      }}
    />,
  );

  expect(screen.queryByRole('grid')).toBeNull();

  userEvent.click(screen.getByRole('textbox'));
  userEvent.click(screen.getByRole('gridcell', { name: /May 25/ }));

  expect(screen.queryByRole('grid')).toBeNull();

  prevent = true;

  userEvent.click(screen.getByRole('textbox'));
  expect(screen.queryByRole('grid')).toBeNull();
});

test('onKeyDown', () => {
  let prevent = false;

  renderComponent(
    <DateField
      onKeyDown={(event) => {
        if (prevent) event.preventDefault();
      }}
    />,
  );

  expect(screen.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(screen.getByRole('textbox'), { key: ' ' });

  userEvent.click(screen.getByRole('gridcell', { name: /May 24/ }));

  expect(screen.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

  userEvent.click(screen.getByRole('gridcell', { name: /May 25/ }));

  expect(screen.queryByRole('grid')).toBeNull();

  prevent = true;

  fireEvent.keyDown(screen.getByRole('textbox'), { key: ' ' });

  expect(screen.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

  expect(screen.queryByRole('grid')).toBeNull();
});

test('disabled', () => {
  renderComponent(<DateField disabled={true} />);

  expect(screen.queryByRole('grid')).toBeNull();

  userEvent.click(screen.getByRole('textbox'));

  expect(screen.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(screen.getByRole('textbox'), { key: ' ' });

  expect(screen.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

  expect(screen.queryByRole('grid')).toBeNull();
});

test('disabledDays', () => {
  const onChange = jest.fn();
  const onDayClick = jest.fn();

  renderComponent(
    <DateField
      onChange={onChange}
      CalendarProps={{
        onDayClick,
        disabledDays: ({ dateValue }) => dateValue.day >= 24,
      }}
    />,
  );

  userEvent.click(screen.getByRole('textbox'));

  expect(onChange).not.toHaveBeenCalled();
  expect(onDayClick).not.toHaveBeenCalled();

  expect(screen.getByRole('gridcell', { name: /May 24/ })).toHaveClass(
    'SD-Calendar-disabled',
  );

  userEvent.click(screen.getByRole('gridcell', { name: /May 24/ }));

  expect(onChange).not.toHaveBeenCalled();
  expect(onDayClick).toHaveBeenCalledTimes(1);
});

test('enableClearable', () => {
  const onChange = jest.fn();
  const view = renderComponent(<DateField enableClearable={true} />);

  expect(screen.queryByRole('button', { name: 'clear' })).toBeNull();

  view.rerender(
    <DateField value={Date.now()} onChange={onChange} enableClearable={true} />,
  );

  expect(onChange).not.toHaveBeenCalled();

  userEvent.click(screen.getByRole('button', { name: 'clear' }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    stringValue: null,
    dateValue: expect.any(DateTime),
  });

  view.rerender(
    <DateField
      label="Custom Label"
      value={Date.now()}
      onChange={onChange}
      enableClearable={true}
    />,
  );

  expect(screen.queryByRole('button', { name: 'clear' })).toBeNull();

  userEvent.click(screen.getByRole('button', { name: 'clear Custom Label' }));

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    stringValue: null,
    dateValue: expect.any(DateTime),
  });
});

test('disableCloseOnSelect', () => {
  const onChange = jest.fn();
  const view = renderComponent(<DateField onChange={onChange} />);

  expect(screen.queryByRole('grid')).toBeNull();

  userEvent.click(screen.getByRole('textbox'));
  userEvent.click(screen.getByRole('gridcell', { name: /May 24/ }));

  expect(screen.queryByRole('grid')).toBeNull();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({ stringValue: '2019-05-24T00:00:00.000-05:00' }),
  );

  view.rerender(<DateField onChange={onChange} disableCloseOnSelect={true} />);

  expect(screen.queryByRole('grid')).toBeNull();

  userEvent.click(screen.getByRole('textbox'));
  userEvent.click(screen.getByRole('gridcell', { name: /May 25/ }));

  expect(screen.getByRole('grid')).toBeInTheDocument();
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({ stringValue: '2019-05-25T00:00:00.000-05:00' }),
  );

  userEvent.click(screen.getByRole('gridcell', { name: /May 26/ }));

  expect(screen.getByRole('grid')).toBeInTheDocument();
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({ stringValue: '2019-05-26T00:00:00.000-05:00' }),
  );

  fireEvent.keyDown(screen.getByRole('presentation'), { key: 'Escape' });

  expect(screen.queryByRole('grid')).toBeNull();
  expect(onChange).toHaveBeenCalledTimes(3);
});

test('startAdornment', () => {
  renderComponent(
    <DateField
      InputProps={{
        'aria-labelledby': 'label',
        startAdornment: (
          <InputAdornment id="label" position="start">
            Start Adornment
          </InputAdornment>
        ),
      }}
    />,
  );

  expect(screen.queryByRole('grid')).toBeNull();

  userEvent.click(screen.getByLabelText('Start Adornment'));

  expect(screen.getByRole('grid')).toBeInTheDocument();

  fireEvent.keyDown(screen.getByRole('presentation'), { key: 'Escape' });

  expect(screen.queryByRole('grid')).toBeNull();

  userEvent.click(screen.getByText('Start Adornment'));

  expect(screen.getByRole('grid')).toBeInTheDocument();
});
