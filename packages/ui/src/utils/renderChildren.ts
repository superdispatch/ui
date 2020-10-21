import { ReactElement, ReactNode } from 'react';

export function renderChildren(node: ReactNode): null | ReactElement {
  if (node == null) {
    return null;
  }

  // Workaround for https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051
  return node as ReactElement;
}
