import { useValueObserver } from '@superdispatch/hooks';
import { ReactElement, ReactNode, useLayoutEffect, useState } from 'react';

import { renderChildren } from './renderChildren';

export type ElementVisibility = 'undetermined' | 'visible' | 'invisible';

export interface VisibilityObserverOptions {
  threshold?: number;
  marginTop?: string;
  marginLeft?: string;
  marginRight?: string;
  marginBottom?: string;
}

export function useVisibilityObserver<T extends Element>(
  node: null | undefined | T,
  {
    threshold = 0,
    marginTop = '0px',
    marginLeft = '0px',
    marginRight = '0px',
    marginBottom = '0px',
  }: VisibilityObserverOptions = {},
): ElementVisibility {
  const [state, setState] = useState<ElementVisibility>('undetermined');
  const rootMargin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;

  useLayoutEffect(() => {
    if (!node || !('IntersectionObserver' in window)) {
      setState('undetermined');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry.isIntersecting ? 'visible' : 'invisible');
      },
      { rootMargin, threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [node, threshold, rootMargin]);

  return state;
}

export interface VisibilityObserverRenderProps {
  visibility: ElementVisibility;
  ref: <T extends HTMLElement>(node: null | T) => void;
}

export interface VisibilityObserverProps extends VisibilityObserverOptions {
  render: (props: VisibilityObserverRenderProps) => ReactNode;
  onChange?: (visibility: ElementVisibility) => void;
}

export function VisibilityObserver({
  render,
  onChange,
  ...options
}: VisibilityObserverProps): null | ReactElement {
  const [node, setNode] = useState<null | HTMLElement>(null);
  const visibility = useVisibilityObserver(node, options);
  const children = render({ ref: setNode, visibility });

  useValueObserver(visibility, () => {
    onChange?.(visibility);
  });

  return renderChildren(children);
}
