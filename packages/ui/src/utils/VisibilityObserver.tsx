import { ReactElement, useCallback, useRef, useState } from 'react';
import { useWhenValueChanges } from 'utility-hooks';

export interface VisibilityObserverRenderProps {
  ref: <T extends HTMLElement>(node: null | T) => void;
  visibility: 'undetermined' | 'visible' | 'invisible';
}

export interface VisibilityObserverProps {
  marginTop?: string;
  marginLeft?: string;
  marginRight?: string;
  marginBottom?: string;
  render: (props: VisibilityObserverRenderProps) => ReactElement;
  onChange?: (visibility: VisibilityObserverRenderProps['visibility']) => void;
}

export function VisibilityObserver({
  render,
  onChange,
  marginTop = '0px',
  marginLeft = '0px',
  marginRight = '0px',
  marginBottom = '0px',
}: VisibilityObserverProps): ReactElement {
  const [visibility, setVisibility] = useState<
    VisibilityObserverRenderProps['visibility']
  >('undetermined');
  const rootMargin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;

  const observerRef = useRef<IntersectionObserver>();

  // Use memoize `ref` so it would be called just once on mount and unmount.
  const ref = useCallback<VisibilityObserverRenderProps['ref']>(
    node => {
      if (!('IntersectionObserver' in window)) {
        return;
      }

      // Clear exist observer before moving further.
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = undefined;
      }

      // This means that node is unmounted and we can leave.
      if (!node) {
        return;
      }

      observerRef.current = new IntersectionObserver(
        entry =>
          setVisibility(entry[0].isIntersecting ? 'visible' : 'invisible'),
        { rootMargin },
      );

      observerRef.current.observe(node);
    },
    [rootMargin],
  );

  useWhenValueChanges(visibility, () => onChange?.(visibility));

  return render({ ref, visibility });
}
