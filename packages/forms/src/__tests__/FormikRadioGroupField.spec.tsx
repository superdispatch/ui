import { MockEvent } from '@superdispatch/testutils';
import { RadioField } from '@superdispatch/ui';
import { act, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

import { renderFormField } from '../__testutils__/renderFormField';
import { FormikRadioGroupField } from '../FormikRadioGroupField';

test('handles changes', async () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const wrapper = renderFormField(
    <FormikRadioGroupField
      label="Gender"
      name="gender"
      onChange={handleChange}
      onBlur={handleBlur}
    >
      <RadioField label="Male" value="male" />
      <RadioField label="Female" value="female" />
    </FormikRadioGroupField>,
    {
      initialValues: { gender: '' },
      onSubmit: handleSubmit,
    },
  );

  const field = wrapper.getByLabelText('Male');

  MockEvent.click(field);
  act(() => {
    fireEvent.blur(field);
  });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleBlur).toHaveBeenCalledTimes(1);

  wrapper.submitForm();

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  expect(handleSubmit).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "gender": "male",
      },
    ]
  `);
});

test('validates field', async () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const wrapper = renderFormField(
    <FormikRadioGroupField
      label="Gender"
      name="gender"
      onChange={handleChange}
      onBlur={handleBlur}
      validate={(value) =>
        value !== 'female' ? 'Select gender Female' : undefined
      }
    >
      <RadioField label="Male" value="male" />
      <RadioField label="Female" value="female Female" />
    </FormikRadioGroupField>,
    {
      initialValues: { gender: '' },
      onSubmit: handleSubmit,
    },
  );

  const maleOption = wrapper.getByLabelText('Male');

  MockEvent.click(maleOption);
  act(() => {
    fireEvent.blur(maleOption);
  });

  wrapper.submitForm();

  await wrapper.findByText('Select gender Female');
});
