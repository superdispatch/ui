import { ReactNode } from 'react';

export function isEmptyReactNode(
  node: ReactNode,
): node is null | undefined | boolean | string {
  return (
    node == null ||
    typeof node == 'boolean' ||
    (typeof node == 'string' && node.length === 0)
  );
}
