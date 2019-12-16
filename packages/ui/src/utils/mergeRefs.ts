import { MutableRefObject, Ref } from 'react';

export function mergeRefs<T>(...refs: Array<Ref<T>>): (node: T) => void {
  return node => {
    refs.forEach(ref => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as MutableRefObject<T>).current = node;
        }
      }
    });
  };
}
