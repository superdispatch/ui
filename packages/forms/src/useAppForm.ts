import {
  FormikConfig,
  FormikContextType,
  FormikErrors,
  FormikValues,
  useFormik,
} from 'formik';
import { useWhenValueChanges } from 'utility-hooks';

import { useIsMounted } from './internal/useIsMounted';

export interface AppFormConfig<TValues extends FormikValues, TResponse>
  extends Omit<FormikConfig<TValues>, 'onSubmit'> {
  /**
   * Resets form when input value changes
   */
  key?: unknown;
  /**
   * Extracts errors from the submission error
   */
  getFormErrors?: (error: unknown) => FormikErrors<TValues>;
  onSubmit: (values: TValues) => TResponse | PromiseLike<TResponse>;
  onSubmitSuccess?: (response: TResponse, values: TValues) => void;
  onSubmitFailure?: (error: Error, values: TValues) => void;
}

export type AppFormStatus<TResponse> =
  | { type: 'initial'; payload?: undefined }
  | { type: 'submitted'; payload: TResponse }
  | { type: 'rejected'; payload: Error };

export interface AppForm<TValues extends FormikValues, TResponse>
  extends Omit<FormikContextType<TValues>, 'status' | 'setStatus'> {
  status: AppFormStatus<TResponse>;
  setStatus: (status: AppFormStatus<TResponse>) => void;
}

export function useAppForm<TValues extends FormikValues, TResponse>({
  key,
  onSubmit,
  onSubmitSuccess,
  onSubmitFailure,
  getFormErrors,

  enableReinitialize = true,
  initialStatus = { type: 'initial' },
  ...config
}: AppFormConfig<TValues, TResponse>): AppForm<TValues, TResponse> {
  const isMounted = useIsMounted();

  const formik = useFormik<TValues>({
    ...config,
    initialStatus,
    enableReinitialize,
    onSubmit: (values, { setErrors, setStatus }) =>
      Promise.resolve(onSubmit(values))
        .then(
          (response) => ({ type: 'submitted', payload: response }),
          (error) => ({ type: 'rejected', payload: error }),
        )
        .then((status) => {
          if (isMounted.current) {
            setStatus(status);

            if (status.type === 'rejected' && getFormErrors) {
              setErrors(getFormErrors(status.payload));
            }
          }
        }),
  });

  useWhenValueChanges(key, () => {
    if (formik.dirty) {
      formik.resetForm();
    }
  });

  useWhenValueChanges(formik.status, () => {
    if (formik.status.type === 'submitted') {
      onSubmitSuccess?.(formik.status.payload, formik.values);
    }

    if (formik.status.type === 'rejected') {
      onSubmitFailure?.(formik.status.payload, formik.values);
    }
  });

  return formik as AppForm<TValues, TResponse>;
}
