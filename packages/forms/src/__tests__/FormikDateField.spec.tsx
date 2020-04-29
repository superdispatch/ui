import { DateContextProvider } from '@superdispatch/dates';
import { MockEvent } from '@superdispatch/jestutils';
import { ThemeProvider } from '@superdispatch/ui';
import { waitFor } from '@testing-library/react';
import MockDate from 'mockdate';
import React, { ReactElement } from 'react';

import { renderFormField } from '../__testutils__/renderFormField';
import { FormikDateField } from '../FormikDateField';
import { FormikEnhancedConfig } from '../useFormikEnhanced';

function renderDateField<T, R>(
  element: ReactElement,
  formProps: FormikEnhancedConfig<T, R>,
) {
  return renderFormField(
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

  await waitFor(() => {
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
      validate={(value) => {
        if (!value) {
          return 'Required';
        }

        if (value < new Date()) {
          return 'Invalid';
        }

        return undefined;
      }}
    />,
    {
      onSubmit: handleSubmit,
      initialValues: { date: undefined },
    },
  );

  MockEvent.click(wrapper.getByLabelText('Date'));
  MockEvent.click(wrapper.getByLabelText(/May 20/));

  await wrapper.findByText('Invalid');
});
