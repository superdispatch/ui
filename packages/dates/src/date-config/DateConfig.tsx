import { Settings, Zone } from 'luxon';
import React, { createContext, ReactNode, useContext, useMemo } from 'react';

import { DateFormat } from '../date-time-utils/DateTimeUtils';

export function setDefaultZone({ type, name }: Zone): void {
  if (type === 'local') {
    Settings.defaultZoneName = type;
  } else {
    Settings.defaultZoneName = name;
  }
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
