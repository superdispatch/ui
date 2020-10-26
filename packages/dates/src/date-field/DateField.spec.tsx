import { InputAdornment } from '@material-ui/core';
import { mockDate, renderComponent } from '@superdispatch/ui-testutils';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateTime } from 'luxon';
import React, { useState } from 'react';

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
  const wrapper = renderComponent(<DateField onChange={onChange} />);

  expect(wrapper.queryByRole('grid')).toBeNull();
  expect(wrapper.getByRole('textbox')).toHaveValue('');

  userEvent.click(wrapper.getByRole('textbox'));

  expect(onChange).not.toHaveBeenCalled();
  userEvent.click(wrapper.getByRole('gridcell', { name: /May 24/ }));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    dateValue: expect.any(DateTime),
    stringValue: '2019-05-24T00:00:00.000-05:00',
  });

  expect(wrapper.queryByRole('grid')).toBeNull();
  expect(wrapper.getByRole('textbox')).toHaveValue('');
});

test('uncontrolled', () => {
  const wrapper = renderComponent(<UncontrolledDateField />);

  expect(wrapper.getByRole('textbox')).toHaveValue('');

  userEvent.click(wrapper.getByRole('textbox'));
  userEvent.click(wrapper.getByRole('gridcell', { name: /May 24/ }));

  expect(wrapper.getByRole('textbox')).toHaveValue('May 24, 2019');
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
    const wrapper = renderComponent(
      <DateConfigProvider format={contextFormat}>
        <DateField value={input} onChange={onChange} format={propsFormat} />
      </DateConfigProvider>,
    );

    expect(wrapper.getByRole('textbox')).toHaveValue(inputValue);

    userEvent.click(wrapper.getByRole('textbox'));
    userEvent.click(wrapper.getByRole('gridcell', { name: /May 24/ }));

    expect(onChange).toHaveBeenLastCalledWith({
      dateValue: expect.any(DateTime),
      stringValue: expectedValue,
      config: { format: expectedFormat },
    });
  },
);

test('close on select', () => {
  const wrapper = renderComponent(<DateField />);

  expect(wrapper.queryByRole('grid')).toBeNull();

  userEvent.click(wrapper.getByRole('textbox'));
  userEvent.click(wrapper.getByRole('gridcell', { name: /May 25/ }));

  expect(wrapper.queryByRole('grid')).toBeNull();
});

test('onClick', () => {
  let prevent = false;

  const wrapper = renderComponent(
    <DateField
      onClick={(event) => {
        if (prevent) {
          event.preventDefault();
        }
      }}
    />,
  );

  expect(wrapper.queryByRole('grid')).toBeNull();

  userEvent.click(wrapper.getByRole('textbox'));
  userEvent.click(wrapper.getByRole('gridcell', { name: /May 25/ }));

  expect(wrapper.queryByRole('grid')).toBeNull();

  prevent = true;

  userEvent.click(wrapper.getByRole('textbox'));
  expect(wrapper.queryByRole('grid')).toBeNull();
});

test('onKeyDown', () => {
  let prevent = false;

  const wrapper = renderComponent(
    <DateField
      onKeyDown={(event) => {
        if (prevent) {
          event.preventDefault();
        }
      }}
    />,
  );

  expect(wrapper.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(wrapper.getByRole('textbox'), { key: ' ' });

  userEvent.click(wrapper.getByRole('gridcell', { name: /May 24/ }));

  expect(wrapper.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(wrapper.getByRole('textbox'), { key: 'Enter' });

  userEvent.click(wrapper.getByRole('gridcell', { name: /May 25/ }));

  expect(wrapper.queryByRole('grid')).toBeNull();

  prevent = true;

  fireEvent.keyDown(wrapper.getByRole('textbox'), { key: ' ' });

  expect(wrapper.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(wrapper.getByRole('textbox'), { key: 'Enter' });

  expect(wrapper.queryByRole('grid')).toBeNull();
});

test('disabled', () => {
  const wrapper = renderComponent(<DateField disabled={true} />);

  expect(wrapper.queryByRole('grid')).toBeNull();

  userEvent.click(wrapper.getByRole('textbox'));

  expect(wrapper.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(wrapper.getByRole('textbox'), { key: ' ' });

  expect(wrapper.queryByRole('grid')).toBeNull();

  fireEvent.keyDown(wrapper.getByRole('textbox'), { key: 'Enter' });

  expect(wrapper.queryByRole('grid')).toBeNull();
});

test('disabledDays', () => {
  const onChange = jest.fn();
  const onDayClick = jest.fn();

  const wrapper = renderComponent(
    <DateField
      onChange={onChange}
      CalendarProps={{
        onDayClick,
        disabledDays: ({ dateValue }) => dateValue.day >= 24,
      }}
    />,
  );

  userEvent.click(wrapper.getByRole('textbox'));

  expect(onChange).not.toHaveBeenCalled();
  expect(onDayClick).not.toHaveBeenCalled();

  expect(wrapper.getByRole('gridcell', { name: /May 24/ })).toHaveClass(
    'SD-Calendar-disabled',
  );

  userEvent.click(wrapper.getByRole('gridcell', { name: /May 24/ }));

  expect(onChange).not.toHaveBeenCalled();
  expect(onDayClick).toHaveBeenCalledTimes(1);
});

test('enableClearable', () => {
  const onChange = jest.fn();
  const wrapper = renderComponent(<DateField enableClearable={true} />);

  expect(wrapper.queryByRole('button', { name: 'clear' })).toBeNull();

  wrapper.rerender(
    <DateField value={Date.now()} onChange={onChange} enableClearable={true} />,
  );

  expect(onChange).not.toHaveBeenCalled();

  userEvent.click(wrapper.getByRole('button', { name: 'clear' }));

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    stringValue: undefined,
    dateValue: expect.any(DateTime),
  });

  wrapper.rerender(
    <DateField
      label="Custom Label"
      value={Date.now()}
      onChange={onChange}
      enableClearable={true}
    />,
  );

  expect(wrapper.queryByRole('button', { name: 'clear' })).toBeNull();

  userEvent.click(wrapper.getByRole('button', { name: 'clear Custom Label' }));

  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith({
    config: defaultDateConfig,
    stringValue: undefined,
    dateValue: expect.any(DateTime),
  });
});

test('disableCloseOnSelect', () => {
  const onChange = jest.fn();
  const wrapper = renderComponent(<DateField onChange={onChange} />);

  expect(wrapper.queryByRole('grid')).toBeNull();

  userEvent.click(wrapper.getByRole('textbox'));
  userEvent.click(wrapper.getByRole('gridcell', { name: /May 24/ }));

  expect(wrapper.queryByRole('grid')).toBeNull();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({ stringValue: '2019-05-24T00:00:00.000-05:00' }),
  );

  wrapper.rerender(
    <DateField onChange={onChange} disableCloseOnSelect={true} />,
  );

  expect(wrapper.queryByRole('grid')).toBeNull();

  userEvent.click(wrapper.getByRole('textbox'));
  userEvent.click(wrapper.getByRole('gridcell', { name: /May 25/ }));

  expect(wrapper.getByRole('grid')).toBeInTheDocument();
  expect(onChange).toHaveBeenCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({ stringValue: '2019-05-25T00:00:00.000-05:00' }),
  );

  userEvent.click(wrapper.getByRole('gridcell', { name: /May 26/ }));

  expect(wrapper.getByRole('grid')).toBeInTheDocument();
  expect(onChange).toHaveBeenCalledTimes(3);
  expect(onChange).toHaveBeenLastCalledWith(
    expect.objectContaining({ stringValue: '2019-05-26T00:00:00.000-05:00' }),
  );

  fireEvent.keyDown(wrapper.getByRole('presentation'), { key: 'Escape' });

  expect(wrapper.queryByRole('grid')).toBeNull();
  expect(onChange).toHaveBeenCalledTimes(3);
});

test('startAdornment', () => {
  const wrapper = renderComponent(
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

  expect(wrapper.queryByRole('grid')).toBeNull();

  userEvent.click(wrapper.getByLabelText('Start Adornment'));

  expect(wrapper.getByRole('grid')).toBeInTheDocument();

  fireEvent.keyDown(wrapper.getByRole('presentation'), { key: 'Escape' });

  expect(wrapper.queryByRole('grid')).toBeNull();

  userEvent.click(wrapper.getByText('Start Adornment'));

  expect(wrapper.getByRole('grid')).toBeInTheDocument();
});
