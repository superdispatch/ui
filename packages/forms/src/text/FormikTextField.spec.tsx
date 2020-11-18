import { Deferred } from '@superdispatch/ui-testutils';
import { fireEvent, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { renderFormField } from '../__testutils__/renderFormField';
import { FormikTextField } from './FormikTextField';

test('changes', async () => {
  const onBlur = jest.fn();
  const onChange = jest.fn();
  const onSubmit = jest.fn();

  const wrapper = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onBlur={onBlur}
      onChange={onChange}
    />,
    {
      onSubmit,
      initialValues: { name: '' },
    },
  );

  const input = wrapper.getByLabelText('Name');

  void act(() => {
    userEvent.type(input, 'John');
    userEvent.tab();
  });

  expect(input).toHaveValue('John');

  expect(onChange).toHaveBeenCalledTimes(4);
  expect(onBlur).toHaveBeenCalledTimes(1);

  wrapper.submitForm();

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  expect(onSubmit).toHaveBeenLastCalledWith({ name: 'John' });
});

test('errors', async () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();
  const formatError = jest.fn((error) => error);

  const wrapper = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onChange={onChange}
      formatError={formatError}
      validate={(value) => (!value ? 'Name is Required' : undefined)}
    />,
    {
      onSubmit,
      initialValues: { name: '' },
    },
  );

  const input = wrapper.getByLabelText('Name');

  expect(input).toBeValid();

  void act(() => {
    fireEvent.blur(input);
  });

  await waitFor(() => {
    expect(input).toBeInvalid();
  });

  const error = wrapper.getByText('Name is Required');

  expect(input).toHaveAttribute('aria-describedby', error.id);
  expect(formatError).toHaveBeenCalled();
});

test('submitting', async () => {
  const deferred = new Deferred();
  const onChange = jest.fn();
  const onSubmit = jest.fn(() => deferred.promise);

  const wrapper = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onChange={onChange}
      validate={(value) => (!value ? 'Name is Required' : undefined)}
    />,
    {
      onSubmit,
      initialValues: { name: 'John' },
    },
  );
  const input = wrapper.getByLabelText('Name');

  expect(input).toBeEnabled();

  wrapper.submitForm();

  await waitFor(() => {
    expect(input).toBeDisabled();
  });

  await deferred.resolve({});

  await waitFor(() => {
    expect(input).toBeEnabled();
  });
});

test('format and parse', async () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();

  const wrapper = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onChange={onChange}
      format={(value) => String(value).toUpperCase()}
      parse={(event) => String(event.target.value).toLowerCase()}
    />,
    {
      onSubmit,
      initialValues: { name: 'John' },
    },
  );

  const input = wrapper.getByLabelText('Name');

  expect(input).toHaveValue('JOHN');

  void act(() => {
    fireEvent.change(input, { target: { value: 'Smith' } });
  });

  expect(input).toHaveValue('SMITH');

  wrapper.submitForm();

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  expect(onSubmit).toHaveBeenLastCalledWith({ name: 'smith' });
});
