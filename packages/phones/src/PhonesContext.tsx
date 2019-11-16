import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { usePromise } from 'utility-hooks';

export interface PhonesContext {
  lib?: typeof libphonenumber;
  util?: libphonenumber.PhoneNumberUtil;
}

const initialValue: PhonesContext = {};
const Context = createContext(initialValue);

export function usePhonesContext(): PhonesContext {
  return useContext(Context);
}

interface PhonesContextProviderProps {
  children: ReactNode;
  load: () => Promise<typeof libphonenumber>;
}

export function PhonesContextProvider({ load, children }: PhonesContextProviderProps) {
  const { value } = usePromise(load, []);
  const state = useMemo<PhonesContext>(
    () => (!value ? initialValue : { lib: value, util: value.PhoneNumberUtil.getInstance() }),
    [value],
  );

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
