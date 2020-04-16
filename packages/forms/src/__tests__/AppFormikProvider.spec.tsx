import { MockEvent } from '@superdispatch/testutils';
import { render, waitFor } from '@testing-library/react';
import { FormikValues } from 'formik';
import React from 'react';

import { AppFormikContext, AppFormikProvider } from '../AppFormikProvider';
import { AppFormikConfig, useAppFormik } from '../useAppFormik';

async function renderProvider<TValues extends FormikValues, TResponse>(
  defaultConfig: AppFormikContext,
  formConfig: AppFormikConfig<TValues, TResponse>,
) {
  function Foo() {
    const { handleSubmit, errors } = useAppFormik<TValues, TResponse>(
      formConfig,
    );
    return (
      <div>
        {errors.name}
        <button type="submit" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
    );
  }

  return render(
    <AppFormikProvider {...defaultConfig}>
      <Foo />
    </AppFormikProvider>,
  );
}

test('default configs', async () => {
  const getFormErrors = jest.fn((errorResponse) => errorResponse.fieldErrors);
  const wrapper = await renderProvider(
    { getFormErrors },
    {
      initialValues: { foo: '' },
      onSubmit: () =>
        Promise.reject({ fieldErrors: { name: 'Name is Required.' } }),
    },
  );

  MockEvent.click(wrapper.getByText('Submit'));

  await waitFor(() => {
    expect(getFormErrors).toHaveBeenCalledTimes(1);
  });

  expect(getFormErrors).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "fieldErrors": Object {
          "name": "Name is Required.",
        },
      },
    ]
  `);
  expect(wrapper.getByText('Name is Required.')).toBeInTheDocument();
});

test('form config overrides default config', async () => {
  const defaultGetFormErrors = jest.fn(
    (errorResponse) => errorResponse.fieldErrors,
  );
  const getFormErrors = jest.fn((errorResponse) => errorResponse.fieldErrors);
  const wrapper = await renderProvider(
    { getFormErrors: defaultGetFormErrors },
    {
      initialValues: { foo: '' },
      getFormErrors,
      onSubmit: () =>
        Promise.reject({ fieldErrors: { name: 'Name is Required.' } }),
    },
  );

  MockEvent.click(wrapper.getByText('Submit'));

  await waitFor(() => {
    expect(getFormErrors).toHaveBeenCalledTimes(1);
    expect(defaultGetFormErrors).toHaveBeenCalledTimes(0);
  });

  expect(getFormErrors).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "fieldErrors": Object {
          "name": "Name is Required.",
        },
      },
    ]
  `);
  expect(wrapper.getByText('Name is Required.')).toBeInTheDocument();
});
