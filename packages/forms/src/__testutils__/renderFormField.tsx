import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormikProvider } from 'formik';
import React, {
  ComponentType,
  createRef,
  MutableRefObject,
  ReactElement,
} from 'react';

import {
  FormikContextTypeEnhanced,
  FormikEnhancedConfig,
  useFormikEnhanced,
} from '../useFormikEnhanced';

export function renderFormField<T, R>(
  element: ReactElement,
  formProps: FormikEnhancedConfig<T, R>,
) {
  const formikRef = createRef() as MutableRefObject<
    FormikContextTypeEnhanced<T, R>
  >;
  const Wrapper: ComponentType = ({ children }) => {
    const formik = useFormikEnhanced(formProps);

    formikRef.current = formik;

    return (
      <FormikProvider value={formik}>
        <Form>
          {children}
          <button type="submit">Submit</button>
        </Form>
      </FormikProvider>
    );
  };

  const wrapper = render(element, { wrapper: Wrapper });

  return {
    ...wrapper,
    formik: formikRef,
    submitForm: () => {
      userEvent.click(wrapper.getByRole('button', { name: 'Submit' }));
    },
  };
}
