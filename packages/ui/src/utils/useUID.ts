import { useMemo } from 'react';

let current = 0;

export function useUID() {
  return useMemo(() => `uid_${(current += 1)}`, []);
}
