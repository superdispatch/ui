import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';

import { DateUtils, DateUtilsOptions } from './DateUtils';

interface DateContext {
  utils: DateUtils;
}

const Context = createContext<DateContext>({
  utils: new DateUtils(),
});

export function useDateUtils(): DateUtils {
  return useContext(Context).utils;
}

export function DateContextProvider({
  children,
  timeZoneOffset,
}: PropsWithChildren<DateUtilsOptions>) {
  const ctx = useMemo<DateContext>(
    () => ({ utils: new DateUtils({ timeZoneOffset }) }),
    [timeZoneOffset],
  );

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
