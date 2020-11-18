import { ThemeProvider, ThemeProviderProps } from '@superdispatch/ui';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormikProvider } from 'formik';
import React, {
  createRef,
  MutableRefObject,
  ReactElement,
  Suspense,
} from 'react';

import {
  FormikContextTypeEnhanced,
  FormikEnhancedConfig,
  useFormikEnhanced,
} from '../enhanced/useFormikEnhanced';

export function renderFormField<T, R>(
  element: ReactElement,
  formProps: FormikEnhancedConfig<T, R>,
) {
  const formikRef = createRef() as MutableRefObject<
    FormikContextTypeEnhanced<T, R>
  >;
  const childrenRef = createRef<HTMLDivElement>();

  function Wrapper({ children }: ThemeProviderProps): ReactElement {
    const formik = useFormikEnhanced(formProps);

    formikRef.current = formik;

    return (
      <ThemeProvider>
        <FormikProvider value={formik}>
          <Suspense fallback="Suspended…">
            <Form>
              <div ref={childrenRef}>{children}</div>
              <button type="submit">Submit</button>
            </Form>
          </Suspense>
        </FormikProvider>
      </ThemeProvider>
    );
  }

  const wrapper = render(element, { wrapper: Wrapper });

  return {
    ...wrapper,
    childrenRef,
    formik: formikRef,
    submitForm: () => {
      userEvent.click(wrapper.getByRole('button', { name: 'Submit' }));
    },
  };
}
