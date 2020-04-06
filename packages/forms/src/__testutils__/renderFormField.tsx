import { MockEvent } from '@superdispatch/testutils';
import { render } from '@testing-library/react';
import { Form, FormikProvider } from 'formik';
import React, { PropsWithChildren, ReactElement } from 'react';

import { AppFormConfig, useAppForm } from '../useAppForm';

function getWrapper<T, R>(formProps: AppFormConfig<T, R>) {
  return function Wrapper({ children }: PropsWithChildren<{}>) {
    const form = useAppForm(formProps);
    return <FormikProvider value={form}>{children}</FormikProvider>;
  };
}

export function renderFormFiled<T, R>(
  element: ReactElement,
  formProps: AppFormConfig<T, R>,
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
      MockEvent.click(wrapper.getByText('Submit'));
    },
  };
}
