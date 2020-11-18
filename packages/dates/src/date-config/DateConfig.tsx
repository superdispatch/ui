import { FixedOffsetZone, Settings } from 'luxon';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

export function setDefaultTimeZone(offset: number | 'local'): string {
  if (offset === 'local') {
    Settings.defaultZoneName = offset;
  } else {
    const zone = FixedOffsetZone.instance(offset);

    if (zone.isValid) {
      Settings.defaultZoneName = zone.name;
    }
  }

  return Settings.defaultZoneName;
}

export function useDefaultTimeZone(offset: number | 'local'): string {
  return useMemo(() => setDefaultTimeZone(offset), [offset]);
}

export type DateFormat = 'DateISO' | 'DateTimeISO' | 'JodaISO';

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
}: DateConfigProviderProps): ReactElement {
  const prev = useDateConfig();
  const ctx = useMemo((): DateConfig => ({ format: format || prev.format }), [
    format,
    prev.format,
  ]);

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
}
