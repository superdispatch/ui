import { FormikErrors } from 'formik';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

export interface FormikEnhancedContext {
  getFormErrors?: (error: unknown) => FormikErrors<unknown>;
}

const Context = createContext<FormikEnhancedContext>({});

export function useFormikEnhancedContext(): FormikEnhancedContext {
  return useContext(Context);
}

export function FormikEnhancedProvider({
  children,
  getFormErrors,
}: PropsWithChildren<FormikEnhancedContext>) {
  const ctx = useMemo(
    () => ({
      getFormErrors,
    }),
    [getFormErrors],
  );
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
