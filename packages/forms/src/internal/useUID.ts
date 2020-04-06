import { uniqueId } from 'lodash';
import { useConstant } from 'utility-hooks';

export function useUID() {
  return useConstant(() => uniqueId('uid_'));
}
