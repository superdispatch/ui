import { render } from '@testing-library/react';
import { FormikValues } from 'formik';
import React from 'react';

import { AppFormikContext, AppFormikProvider } from '../AppFormikProvider';
import { AppFormikConfig, useAppFormik } from '../useAppFormik';

export async function renderProvider<TValues extends FormikValues, TResponse>(
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
