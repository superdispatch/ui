import {
  FormikConfig,
  FormikContextType,
  FormikErrors,
  FormikValues,
  useFormik,
} from 'formik';
import { useWhenValueChanges } from 'utility-hooks';

import { useFormsContext } from './FormsProvider';
import { useIsMounted } from './internal/useIsMounted';

export interface FormikEnhancedConfig<TValues extends FormikValues, TResponse>
  extends Omit<FormikConfig<TValues>, 'onSubmit'> {
  /**
   * Resets form when input value changes
   */
  key?: unknown;

  /**
   * Override initial status type
   */
  initialStatus?: FormikEnhancedStatus<TResponse>;

  /**
   * Extracts errors from the submission error
   */
  getFormErrors?: (error: Error) => FormikErrors<TValues>;
  onSubmit: (values: TValues) => TResponse | PromiseLike<TResponse>;
  onSubmitSuccess?: (response: TResponse, values: TValues) => void;
  onSubmitFailure?: (error: Error, values: TValues) => void;
}

export type FormikEnhancedStatus<TResponse> =
  | { type: 'initial'; payload?: undefined }
  | { type: 'submitted'; payload: TResponse }
  | { type: 'rejected'; payload: Error };

// TODO Remove after https://github.com/jaredpalmer/formik/pull/2323
export interface FormikContextTypeEnhanced<
  TValues extends FormikValues,
  TResponse
> extends FormikContextType<TValues> {
  status: FormikEnhancedStatus<TResponse>;
  setStatus: (status: FormikEnhancedStatus<TResponse>) => void;
}

export function useFormikEnhanced<TValues extends FormikValues, TResponse>({
  key,
  onSubmit,
  onSubmitSuccess,
  onSubmitFailure,
  getFormErrors: getFormErrorsOption,

  enableReinitialize = true,
  initialStatus = { type: 'initial' },
  ...config
}: FormikEnhancedConfig<TValues, TResponse>): FormikContextTypeEnhanced<
  TValues,
  TResponse
> {
  const isMounted = useIsMounted();
  const ctx = useFormsContext();
  const getFormErrors = getFormErrorsOption || ctx.getFormErrors;

  const formik = useFormik<TValues>({
    ...config,
    initialStatus,
    enableReinitialize,
    onSubmit: (values, { setErrors, setStatus }) =>
      Promise.resolve(onSubmit(values))
        .then(
          (response) => ({ type: 'submitted', payload: response }),
          (error: Error) => ({ type: 'rejected', payload: error }),
        )
        .then((status) => {
          if (isMounted.current) {
            setStatus(status);

            if (status.type === 'rejected') {
              setErrors(getFormErrors(status.payload));
            }
          }
        }),
  }) as FormikContextTypeEnhanced<TValues, TResponse>;

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

  return formik;
}
