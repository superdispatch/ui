import { ReactElement, useState } from 'react';
import { useIsomorphicLayoutEffect, useWhenValueChanges } from 'utility-hooks';

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

  useIsomorphicLayoutEffect(() => {
    if (!node || !('IntersectionObserver' in window)) {
      return setState('undetermined');
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
  render: (props: VisibilityObserverRenderProps) => ReactElement;
  onChange?: (visibility: ElementVisibility) => void;
}

export function VisibilityObserver({
  render,
  onChange,
  ...options
}: VisibilityObserverProps): ReactElement {
  const [node, setNode] = useState<null | HTMLElement>(null);
  const visibility = useVisibilityObserver(node, options);

  useWhenValueChanges(visibility, () => onChange?.(visibility));

  return render({ ref: setNode, visibility });
}
