import { MenuItem } from '@material-ui/core';
import { Deferred } from '@superdispatch/ui-testutils';
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderFormField } from '../__testutils__/renderFormField';
import { FormikTextField } from './FormikTextField';

test('changes', async () => {
  const onBlur = jest.fn();
  const onChange = jest.fn();

  const wrapper = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onBlur={onBlur}
      onChange={onChange}
    />,
    { initialValues: { name: '' } },
  );

  const input = wrapper.getByLabelText('Name');

  userEvent.type(input, 'John');
  userEvent.tab();

  expect(input).toHaveValue('John');

  expect(onChange).toHaveBeenCalledTimes(4);
  expect(onBlur).toHaveBeenCalledTimes(1);

  wrapper.submitForm();

  await waitFor(() => {
    expect(wrapper.onSubmit).toHaveBeenCalledTimes(1);
  });

  expect(wrapper.onSubmit).toHaveBeenLastCalledWith({ name: 'John' });
});

test('errors', async () => {
  const wrapper = renderFormField(
    <FormikTextField
      id="name"
      name="name"
      validate={(value) => (value === 'john' ? 'Invalid Name' : undefined)}
    />,
    { initialValues: { name: '' } },
  );

  expect(wrapper.getByRole('textbox')).toBeValid();

  userEvent.type(wrapper.getByRole('textbox'), 'john');

  expect(wrapper.getByRole('textbox')).toBeValid();

  fireEvent.blur(wrapper.getByRole('textbox'));

  await waitFor(() => {
    expect(wrapper.getByRole('textbox')).toBeInvalid();
  });

  const errorID = wrapper.getByRole('textbox').getAttribute('aria-describedby');

  expect(document.getElementById(errorID!)).toMatchInlineSnapshot(`
    <p
      class="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled"
      id="name-helper-text"
    >
      Invalid Name
    </p>
  `);
});

test('formatErrors', async () => {
  const wrapper = renderFormField(
    <FormikTextField
      id="name"
      name="name"
      formatError={(error) => <strong>{error}</strong>}
      validate={(value) => (!value ? 'Name is required' : undefined)}
    />,
    { initialValues: { name: '' } },
  );

  expect(wrapper.getByRole('textbox')).toBeValid();

  fireEvent.blur(wrapper.getByRole('textbox'));

  await waitFor(() => {
    expect(wrapper.getByRole('textbox')).toBeInvalid();
  });

  const errorID = wrapper.getByRole('textbox').getAttribute('aria-describedby');

  expect(document.getElementById(errorID!)).toMatchInlineSnapshot(`
    <p
      class="MuiFormHelperText-root MuiFormHelperText-contained Mui-error"
      id="name-helper-text"
    >
      <strong>
        Name is required
      </strong>
    </p>
  `);
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

test('default format and parse', async () => {
  const wrapper = renderFormField(<FormikTextField name="name" />, {
    initialValues: { name: null },
  });

  expect(wrapper.getByRole('textbox')).toHaveValue('');
  expect(wrapper.formik.current.values.name).toBeNull();

  userEvent.type(wrapper.getByRole('textbox'), 'foo');

  expect(wrapper.getByRole('textbox')).toHaveValue('foo');
  expect(wrapper.formik.current.values.name).toBe('foo');

  act(() => {
    wrapper.formik.current.setFieldValue('name', undefined);
  });

  expect(wrapper.getByRole('textbox')).toHaveValue('');
  expect(wrapper.formik.current.values.name).toBeUndefined();

  wrapper.submitForm();

  await waitFor(() => {
    expect(wrapper.onSubmit).toHaveBeenCalledTimes(1);
  });

  expect(wrapper.onSubmit).toHaveBeenLastCalledWith({});
});

test('format and parse', async () => {
  const onSubmit = jest.fn();

  const wrapper = renderFormField(
    <FormikTextField
      select={true}
      label="Status"
      name="isActive"
      format={(value: boolean) => (value ? 'active' : 'inactive')}
      parse={(event): boolean => event.target.value === 'active'}
    >
      <MenuItem value="active">Active</MenuItem>
      <MenuItem value="inactive">Inactive</MenuItem>
    </FormikTextField>,
    {
      onSubmit,
      initialValues: { isActive: true },
    },
  );

  expect(wrapper.getByLabelText('Status')).toHaveTextContent(/Active/);

  userEvent.click(wrapper.getByLabelText('Status'));

  userEvent.click(await wrapper.findByRole('option', { name: 'Inactive' }));

  await waitFor(() => {
    expect(wrapper.getByLabelText('Status')).toHaveTextContent(/Inactive/);
  });

  wrapper.submitForm();

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  expect(onSubmit).toHaveBeenLastCalledWith({ isActive: false });
});
