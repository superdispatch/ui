import { useMemo } from 'react';

let current = 0;

export function useUID(defaultID?: string): string {
  const uid = useMemo(() => `uid_${(current += 1)}`, []);

  return defaultID || uid;
}
