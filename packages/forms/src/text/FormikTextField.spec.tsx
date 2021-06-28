import { MenuItem } from '@material-ui/core';
import { Deferred } from '@superdispatch/ui-testutils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderFormField } from '../__testutils__/renderFormField';
import { FormikTextField } from './FormikTextField';

test('changes', async () => {
  const onBlur = jest.fn();
  const onChange = jest.fn();

  const view = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onBlur={onBlur}
      onChange={onChange}
    />,
    { initialValues: { name: '' } },
  );

  const input = screen.getByLabelText('Name');

  userEvent.type(input, 'John');
  userEvent.tab();

  expect(input).toHaveValue('John');

  expect(onChange).toHaveBeenCalledTimes(4);
  expect(onBlur).toHaveBeenCalledTimes(1);

  view.submitForm();

  await waitFor(() => {
    expect(view.onSubmit).toHaveBeenCalledTimes(1);
  });

  expect(view.onSubmit).toHaveBeenLastCalledWith({ name: 'John' });
});

test('errors', async () => {
  renderFormField(
    <FormikTextField
      id="name"
      name="name"
      validate={(value) => (value === 'john' ? 'Invalid Name' : undefined)}
    />,
    { initialValues: { name: '' } },
  );

  expect(screen.getByRole('textbox')).toBeValid();

  userEvent.type(screen.getByRole('textbox'), 'john');

  expect(screen.getByRole('textbox')).toBeValid();

  fireEvent.blur(screen.getByRole('textbox'));

  await waitFor(() => {
    expect(screen.getByRole('textbox')).toBeInvalid();
  });

  const errorID = screen.getByRole('textbox').getAttribute('aria-describedby');

  // eslint-disable-next-line testing-library/no-node-access
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
  renderFormField(
    <FormikTextField
      id="name"
      name="name"
      formatError={(error) => <strong>{error}</strong>}
      validate={(value) => (!value ? 'Name is required' : undefined)}
    />,
    { initialValues: { name: '' } },
  );

  expect(screen.getByRole('textbox')).toBeValid();

  fireEvent.blur(screen.getByRole('textbox'));

  await waitFor(() => {
    expect(screen.getByRole('textbox')).toBeInvalid();
  });

  const errorID = screen.getByRole('textbox').getAttribute('aria-describedby');

  // eslint-disable-next-line testing-library/no-node-access
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

  const view = renderFormField(
    <FormikTextField
      name="name"
      label="Name"
      onChange={onChange}
      validate={(value) => (!value ? 'Name is Required' : undefined)}
    />,
    { onSubmit, initialValues: { name: 'John' } },
  );
  const input = screen.getByLabelText('Name');

  expect(input).toBeEnabled();

  view.submitForm();

  await waitFor(() => {
    expect(input).toBeDisabled();
  });

  await deferred.resolve({});

  await waitFor(() => {
    expect(input).toBeEnabled();
  });
});

test('default format and parse', async () => {
  const view = renderFormField(<FormikTextField name="name" />, {
    initialValues: { name: null },
  });

  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(view.formik.current.values.name).toBeNull();

  userEvent.type(screen.getByRole('textbox'), 'foo');

  expect(screen.getByRole('textbox')).toHaveValue('foo');
  expect(view.formik.current.values.name).toBe('foo');

  act(() => {
    view.formik.current.setFieldValue('name', undefined);
  });

  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(view.formik.current.values.name).toBeUndefined();

  view.submitForm();

  await waitFor(() => {
    expect(view.onSubmit).toHaveBeenCalledTimes(1);
  });

  expect(view.onSubmit).toHaveBeenLastCalledWith({});
});

test('format and parse', async () => {
  const onSubmit = jest.fn();

  const view = renderFormField(
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
    { onSubmit, initialValues: { isActive: true } },
  );

  expect(screen.getByLabelText('Status')).toHaveTextContent(/Active/);

  userEvent.click(screen.getByLabelText('Status'));

  userEvent.click(await screen.findByRole('option', { name: 'Inactive' }));

  await waitFor(() => {
    expect(screen.getByLabelText('Status')).toHaveTextContent(/Inactive/);
  });

  view.submitForm();

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  expect(onSubmit).toHaveBeenLastCalledWith({ isActive: false });
});
