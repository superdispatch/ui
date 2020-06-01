import { MockEvent } from '@superdispatch/jestutils';
import { waitFor } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import React from 'react';

import { renderFormField } from '../__testutils__/renderFormField';
import { FormikTextField } from '../FormikTextField';

test('should handle change', async () => {
  const handleBlur = jest.fn();
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  const wrapper = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onChange={handleChange}
      onBlur={handleBlur}
    />,
    {
      initialValues: { name: '' },
      onSubmit: handleSubmit,
    },
  );

  const input = wrapper.getByLabelText('Name');
  void act(() => MockEvent.changeAndBlur(input, 'John'));

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleBlur).toHaveBeenCalledTimes(1);

  wrapper.submitForm();

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  expect(handleSubmit).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "name": "John",
      },
    ]
  `);
});

test('should validate', async () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const formatError = jest.fn((error) => error);

  const wrapper = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onChange={handleChange}
      formatError={formatError}
      validate={(value) => (!value ? 'Name is Required' : undefined)}
    />,
    {
      initialValues: { name: 'John' },
      onSubmit: handleSubmit,
    },
  );

  const input = wrapper.getByLabelText('Name');

  expect(input).toBeValid();

  void act(() => MockEvent.change(input, ''));

  wrapper.submitForm();

  await wrapper.findByText('Name is Required');
  expect(formatError).toHaveBeenCalled();
  expect(input).toBeInvalid();
  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test('disable field when submitting', async () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 200);
      }),
  );

  const wrapper = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onChange={handleChange}
      validate={(value) => (!value ? 'Name is Required' : undefined)}
    />,
    {
      initialValues: { name: 'John' },
      onSubmit: handleSubmit,
    },
  );
  const input = wrapper.getByLabelText('Name');

  expect(input).toBeEnabled();

  wrapper.submitForm();

  await waitFor(() => {
    expect(input).toBeDisabled();
  });
});

test('format and parse value', async () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  const wrapper = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      format={(value) => String(value).toUpperCase()}
      parse={(event) => String(event.target.value).toLowerCase()}
      onChange={handleChange}
    />,
    {
      initialValues: { name: 'John' },
      onSubmit: handleSubmit,
    },
  );

  const input = wrapper.getByLabelText('Name');

  expect(input).toHaveValue('JOHN');

  void act(() => MockEvent.change(input, 'SMITH'));

  wrapper.submitForm();

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  expect(handleSubmit).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
Array [
  Object {
    "name": "smith",
  },
]
`);
});
