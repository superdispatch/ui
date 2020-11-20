import { RadioField } from '@superdispatch/ui';
import { act, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderFormField } from '../__testutils__/renderFormField';
import { FormikRadioGroupField } from './FormikRadioGroupField';

test('changes', async () => {
  const onSubmit = jest.fn();
  const onChange = jest.fn();
  const onBlur = jest.fn();
  const wrapper = renderFormField(
    <FormikRadioGroupField
      name="color"
      label="Color"
      onBlur={onBlur}
      onChange={onChange}
    >
      <RadioField label="Red" value="red" />
      <RadioField label="Green" value="green" />
    </FormikRadioGroupField>,
    {
      onSubmit,
      initialValues: { color: '' },
    },
  );

  const red = wrapper.getByLabelText('Red');

  act(() => {
    userEvent.click(red);
  });

  act(() => {
    fireEvent.blur(red);
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledTimes(1);

  wrapper.submitForm();

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  expect(onSubmit).toHaveBeenLastCalledWith({ color: 'red' });
});

test('errors', async () => {
  const onSubmit = jest.fn();
  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const wrapper = renderFormField(
    <FormikRadioGroupField
      name="color"
      label="Color"
      onBlur={handleBlur}
      onChange={handleChange}
      validate={(value) => (value === 'red' ? 'No' : undefined)}
    >
      <RadioField label="Red" value="red" />
      <RadioField label="Green" value="green" />
    </FormikRadioGroupField>,
    {
      onSubmit,
      initialValues: { color: '' },
    },
  );

  const red = wrapper.getByLabelText('Red');

  act(() => {
    userEvent.click(red);
  });

  act(() => {
    fireEvent.blur(red);
  });

  wrapper.submitForm();

  expect(onSubmit).not.toHaveBeenCalled();

  await wrapper.findByText('No');
});
