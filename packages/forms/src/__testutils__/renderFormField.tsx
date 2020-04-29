import { MockEvent } from '@superdispatch/jestutils';
import { render } from '@testing-library/react';
import { Form, FormikProvider } from 'formik';
import React, { PropsWithChildren, ReactElement } from 'react';

import { FormikEnhancedConfig, useFormikEnhanced } from '../useFormikEnhanced';

function getWrapper<T, R>(formProps: FormikEnhancedConfig<T, R>) {
  return function Wrapper({ children }: PropsWithChildren<{}>) {
    const formik = useFormikEnhanced(formProps);

    return <FormikProvider value={formik}>{children}</FormikProvider>;
  };
}

export function renderFormField<T, R>(
  element: ReactElement,
  formProps: FormikEnhancedConfig<T, R>,
) {
  const wrapper = render(
    <Form>
      {element}
      <button type="submit">Submit</button>
    </Form>,
    { wrapper: getWrapper(formProps) },
  );
  return {
    ...wrapper,
    submitForm: () => {
      MockEvent.click(wrapper.getByRole('button', { name: 'Submit' }));
    },
  };
}
