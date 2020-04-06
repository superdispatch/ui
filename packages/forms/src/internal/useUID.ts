import { useConstant } from 'utility-hooks';

let current = 0;

export function useUID() {
  return useConstant(() => `form_uid_${++current}`);
}
