import { render } from '@testing-library/react';
import { FormikValues } from 'formik';
import React from 'react';

import {
  FormikEnhancedContext,
  FormikEnhancedProvider,
} from '../FormikEnhancedProvider';
import { FormikEnhancedConfig, useFormikEnhanced } from '../useFormikEnhanced';

export async function renderProvider<TValues extends FormikValues, TResponse>(
  defaultConfig: FormikEnhancedContext,
  formConfig: FormikEnhancedConfig<TValues, TResponse>,
) {
  function Foo() {
    const { handleSubmit, errors } = useFormikEnhanced<TValues, TResponse>(
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
    <FormikEnhancedProvider {...defaultConfig}>
      <Foo />
    </FormikEnhancedProvider>,
  );
}
