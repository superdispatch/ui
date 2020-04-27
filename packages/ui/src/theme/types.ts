import { ReactElement } from 'react';

type CloneableReactNodeArray = CloneableReactNode[];
export type CloneableReactNode =
  | ReactElement
  | CloneableReactNodeArray
  | boolean
  | null
  | undefined;

export type VerticalAlign = 'left' | 'center' | 'right';
export type HorizontalAlign = 'top' | 'center' | 'bottom';
