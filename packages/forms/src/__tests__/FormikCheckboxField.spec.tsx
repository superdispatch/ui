import { MockEvent } from '@superdispatch/jestutils';
import { act, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { renderFormField } from '../__testutils__/renderFormField';
import { FormikCheckboxField } from '../FormikCheckboxField';

test('handles changes', async () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const wrapper = renderFormField(
    <FormikCheckboxField
      label="Agree"
      name="agree"
      onChange={handleChange}
      onBlur={handleBlur}
    />,
    {
      initialValues: { agree: true },
      onSubmit: handleSubmit,
    },
  );

  const field = wrapper.getByLabelText('Agree');

  MockEvent.click(field);
  act(() => {
    fireEvent.blur(field);
  });

  expect(field).not.toBeChecked();
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleBlur).toHaveBeenCalledTimes(1);

  wrapper.submitForm();

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  expect(handleSubmit).toHaveBeenLastCalledWith({ agree: false });
});

test('format and parse value', async () => {
  const handleSubmit = jest.fn();

  const wrapper = renderFormField(
    <FormikCheckboxField
      name="status"
      label="Status"
      format={(value) => value === 'active'}
      parse={(_, checked) => (checked ? 'active' : 'inactive')}
    />,
    {
      initialValues: { status: 'active' },
      onSubmit: handleSubmit,
    },
  );

  const field = wrapper.getByLabelText('Status');

  expect(field).toBeChecked();

  MockEvent.click(field);
  act(() => {
    fireEvent.blur(field);
  });

  expect(field).not.toBeChecked();

  wrapper.submitForm();

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  expect(handleSubmit).toHaveBeenLastCalledWith({ status: 'inactive' });
});

test('validates field', async () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const wrapper = renderFormField(
    <FormikCheckboxField
      label="Agree"
      name="agree"
      onChange={handleChange}
      onBlur={handleBlur}
      validate={(value) =>
        value === false ? 'Check agree before continue' : undefined
      }
    />,
    {
      initialValues: { agree: true },
      onSubmit: handleSubmit,
    },
  );

  const field = wrapper.getByLabelText('Agree');

  expect(field).toBeValid();

  MockEvent.click(field);
  act(() => {
    fireEvent.blur(field);
  });

  await wrapper.findByText('Check agree before continue');
});
