import { FormikErrors } from 'formik';
import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useMemo,
} from 'react';

export interface FormsContext {
  getFormErrors?: (error: unknown) => FormikErrors<unknown>;
}

const Context = createContext<FormsContext>({});

export function useFormsContext(): FormsContext {
  return useContext(Context);
}

export function FormsProvider({
  children,
  getFormErrors,
}: PropsWithChildren<FormsContext>): ReactElement {
  const ctx = useMemo(
    () => ({
      getFormErrors,
    }),
    [getFormErrors],
  );
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
