import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderFormField } from '../__testutils__/renderFormField';
import { FormikPhoneField } from './FormikPhoneField';

test('basic', async () => {
  const handleBlur = jest.fn();
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  const view = renderFormField(
    <FormikPhoneField
      name="phone"
      onBlur={handleBlur}
      onChange={handleChange}
    />,
    { initialValues: { phone: '' }, onSubmit: handleSubmit },
  );

  const input = await screen.findByRole('textbox');

  expect(handleBlur).toHaveBeenCalledTimes(0);
  expect(handleChange).toHaveBeenCalledTimes(0);

  act(() => {
    fireEvent.change(input, { target: { value: '123' } });
  });

  expect(handleBlur).toHaveBeenCalledTimes(0);
  expect(handleChange).toHaveBeenCalledTimes(1);

  act(() => {
    fireEvent.blur(input);
  });

  expect(handleBlur).toHaveBeenCalledTimes(1);
  expect(handleChange).toHaveBeenCalledTimes(1);

  expect(handleSubmit).toHaveBeenCalledTimes(0);

  view.submitForm();

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  expect(handleSubmit).toHaveBeenLastCalledWith({ phone: '+1123' });
});

test('validation', async () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  const view = renderFormField(
    <FormikPhoneField
      name="phone"
      onChange={handleChange}
      validate={(value, phoneService) => phoneService.validate(value)}
    />,
    {
      onSubmit: handleSubmit,
      initialValues: { phone: '' },
    },
  );

  await screen.findByRole('textbox');

  expect(screen.getByRole('textbox')).toBeValid();

  act(() => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '20155501' },
    });
  });

  view.submitForm();

  await screen.findByText('Phone number is too short');

  expect(screen.getByRole('textbox')).toBeInvalid();
  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test('submitting', async () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn(
    () => new Promise((resolve) => setTimeout(resolve, 200)),
  );

  const view = renderFormField(
    <FormikPhoneField name="phone" onChange={handleChange} />,
    { onSubmit: handleSubmit, initialValues: { phone: '' } },
  );

  await screen.findByRole('textbox');

  expect(screen.getByRole('textbox')).toBeEnabled();

  view.submitForm();

  await waitFor(() => {
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  await waitFor(() => {
    expect(screen.getByRole('textbox')).toBeEnabled();
  });
});
