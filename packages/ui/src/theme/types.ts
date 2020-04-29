import { ReactElement } from 'react';

type CloneableReactNodeArray = CloneableReactNode[];
export type CloneableReactNode =
  | ReactElement
  | CloneableReactNodeArray
  | boolean
  | null
  | undefined;

export type VerticalAlign = 'top' | 'center' | 'bottom';
export type HorizontalAlign = 'left' | 'center' | 'right';
