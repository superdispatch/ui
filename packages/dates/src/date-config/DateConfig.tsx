import { FixedOffsetZone, Settings } from 'luxon';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { DateFormat } from '../date-time-utils/DateTimeUtils';

export function setDefaultTimeZone(offset: number | undefined): string {
  if (offset == null) {
    Settings.defaultZoneName = 'local';
  } else {
    Settings.defaultZoneName = FixedOffsetZone.instance(offset).name;
  }

  return Settings.defaultZoneName;
}

export function useDefaultTimeZone(offset: number | undefined): string {
  const [name, setName] = useState(() => Settings.defaultZoneName);

  useEffect(() => {
    setName(setDefaultTimeZone(offset));
  }, [offset]);

  return name;
}

export interface DateConfig {
  readonly format: DateFormat;
}

export const defaultDateConfig: DateConfig = { format: 'DateTimeISO' };

const Context = createContext(defaultDateConfig);

export function useDateConfig(options: Partial<DateConfig> = {}): DateConfig {
  const config = useContext(Context);
  const { format = config.format } = options;

  return useMemo<DateConfig>(() => ({ format }), [format]);
}

export interface DateConfigProviderProps extends Partial<DateConfig> {
  children?: ReactNode;
}

export function DateConfigProvider({
  format,
  children,
}: DateConfigProviderProps) {
  const prev = useDateConfig();
  const ctx = useMemo((): DateConfig => ({ format: format || prev.format }), [
    format,
    prev.format,
  ]);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
