import { DateContextProvider, DateUtils } from '@superdispatch/dates';
import { MockEvent } from '@superdispatch/testutils';
import { ThemeProvider } from '@superdispatch/ui';
import { wait } from '@testing-library/react';
import MockDate from 'mockdate';
import React, { ReactElement } from 'react';

import { renderFormFiled } from '../__testutils__/renderFormField';
import { FormikDateField } from '../FormikDateField';
import { AppFormConfig } from '../useAppForm';

const stubUtils = new DateUtils({ timeZoneOffset: -300 });

function renderDateField<T, R>(
  element: ReactElement,
  formProps: AppFormConfig<T, R>,
) {
  return renderFormFiled(
    <ThemeProvider>
      <DateContextProvider timeZoneOffset={-300}>{element}</DateContextProvider>
    </ThemeProvider>,
    formProps,
  );
}
beforeEach(() => {
  MockDate.set(Date.UTC(2019, 4, 24, 1, 2, 3, 45));
});

afterEach(() => {
  MockDate.reset();
});

test('handles changes', async () => {
  const handleBlur = jest.fn();
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const wrapper = renderDateField(
    <FormikDateField
      name="date"
      label="Date"
      onChange={handleChange}
      onBlur={handleBlur}
    />,
    {
      initialValues: { date: new Date() },
      onSubmit: handleSubmit,
    },
  );
  const field = wrapper.getByLabelText('Date');

  MockEvent.click(field);
  MockEvent.click(wrapper.getByLabelText('Wed May 29 2019'));

  expect(handleBlur).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      2019-05-30T01:02:03.045Z,
    ]
  `);

  wrapper.submitForm();

  await wait(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  expect(handleSubmit).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
Array [
  Object {
    "date": 2019-05-30T01:02:03.045Z,
  },
]
`);
});

test('handles errors', async () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const wrapper = renderDateField(
    <FormikDateField
      name="date"
      label="Date"
      onChange={handleChange}
      validate={value =>
        !stubUtils.isSameDate(value, Date.UTC(2019, 4, 10, 1, 2, 3, 45))
          ? 'Invalid Date'
          : undefined
      }
    />,
    {
      initialValues: { date: new Date() },
      onSubmit: handleSubmit,
    },
  );

  const field = wrapper.getByLabelText('Date');

  MockEvent.click(field);
  MockEvent.click(wrapper.getByLabelText('Wed May 29 2019'));

  await wrapper.findByText('Invalid Date');
});
