import React, { ReactNode } from 'react';

// export interface PhonesContext {
//   // lib?: typeof libphonenumber;
//   // util?: libphonenumber.PhoneNumberUtil;
// }

// const initialValue: PhonesContext = {};
// const Context = createContext(initialValue);

// export function usePhonesContext(): PhonesContext {
//   return useContext(Context);
// }

interface PhonesContextProviderProps {
  children: ReactNode;
}

export function PhonesContextProvider({
  children,
}: PhonesContextProviderProps) {
  // const { value } = usePromise(load, []);
  // const state = useMemo<PhonesContext>(
  //   () => (!value ? initialValue : { lib: value, util: value.PhoneNumberUtil.getInstance() }),
  //   [value],
  // );
  //
  // return <Context.Provider value={state}>{children}</Context.Provider>;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
