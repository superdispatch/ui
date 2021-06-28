import { ThemeProvider, ThemeProviderProps } from '@superdispatch/ui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, FormikProvider } from 'formik';
import { createRef, MutableRefObject, ReactElement, Suspense } from 'react';
import {
  FormikContextTypeEnhanced,
  FormikEnhancedConfig,
  useFormikEnhanced,
} from '../enhanced/useFormikEnhanced';

export function renderFormField<TValues, TResponse>(
  element: ReactElement,
  {
    initialValues = {} as TValues,
    onSubmit = jest.fn(),
    ...formProps
  }: Partial<FormikEnhancedConfig<TValues, TResponse>>,
) {
  const formikRef = createRef() as MutableRefObject<
    FormikContextTypeEnhanced<TValues, TResponse>
  >;
  const childrenRef = createRef<HTMLDivElement>();

  function Wrapper({ children }: ThemeProviderProps): ReactElement {
    const formik = useFormikEnhanced({ ...formProps, onSubmit, initialValues });

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

  const view = render(element, { wrapper: Wrapper });

  return {
    ...view,
    childrenRef,
    onSubmit,
    formik: formikRef,
    submitForm: () => {
      userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    },
  };
}
