import { FormikProvider, FormikValues } from 'formik';
import { ReactElement, ReactNode } from 'react';
import {
  FormikContextTypeEnhanced,
  FormikEnhancedConfig,
  useFormikEnhanced,
} from './useFormikEnhanced';

export interface FormikEnhancedProps<TValues extends FormikValues, TResponse>
  extends FormikEnhancedConfig<TValues, TResponse> {
  children?:
    | ReactNode
    | ((formik: FormikContextTypeEnhanced<TValues, TResponse>) => ReactNode);
}

export function FormikEnhanced<TValues extends FormikValues, TResponse>({
  children,
  ...config
}: FormikEnhancedProps<TValues, TResponse>): null | ReactElement {
  const formik = useFormikEnhanced(config);

  return (
    <FormikProvider value={formik}>
      {typeof children === 'function' ? children(formik) : children}
    </FormikProvider>
  );
}
