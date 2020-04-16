import { FormikErrors } from 'formik';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

export interface AppFormikContext {
  getFormErrors?: (error: unknown) => FormikErrors<unknown>;
}

const Context = createContext<AppFormikContext>({});

export function useAppFormikContext(): AppFormikContext {
  return useContext(Context);
}

export function AppFormikProvider({
  children,
  getFormErrors,
}: PropsWithChildren<AppFormikContext>) {
  const ctx = useMemo(
    () => ({
      getFormErrors,
    }),
    [getFormErrors],
  );
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
