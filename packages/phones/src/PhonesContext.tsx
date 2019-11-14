import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useEventCallback } from 'utility-hooks';

export interface PhonesContext {
  lib?: typeof libphonenumber;
  util?: libphonenumber.PhoneNumberUtil;
}

const Context = createContext<PhonesContext>({});

export function usePhonesContext(): PhonesContext {
  return useContext(Context);
}

interface PhonesContextProviderProps {
  children: ReactNode;
  load: () => Promise<typeof libphonenumber>;
}

export function PhonesContextProvider({ load, children }: PhonesContextProviderProps) {
  const [state, setState] = useState<PhonesContext>({});
  const loadLib = useEventCallback(load);

  useEffect(() => {
    let current = true;

    loadLib().then(lib => {
      if (current) {
        setState({ lib, util: lib.PhoneNumberUtil.getInstance() });
      }
    });

    return () => {
      current = false;
    };
  }, [loadLib]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
