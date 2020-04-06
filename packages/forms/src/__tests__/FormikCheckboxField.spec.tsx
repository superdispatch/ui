import { MockEvent } from '@superdispatch/testutils';
import { act, fireEvent, wait } from '@testing-library/react';
import React from 'react';

import { renderFormFiled } from '../__testutils__/renderFormField';
import { FormikCheckboxField } from '../FormikCheckboxField';

test('handles changes', async () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const wrapper = renderFormFiled(
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

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleBlur).toHaveBeenCalledTimes(1);

  wrapper.submitForm();

  await wait(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
  expect(handleSubmit).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "agree": false,
      },
    ]
  `);
});

test('validates field', async () => {
  const handleSubmit = jest.fn();
  const handleChange = jest.fn();
  const handleBlur = jest.fn();
  const wrapper = renderFormFiled(
    <FormikCheckboxField
      label="Agree"
      name="agree"
      onChange={handleChange}
      onBlur={handleBlur}
      validate={value =>
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
