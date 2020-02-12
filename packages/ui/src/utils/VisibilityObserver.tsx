import { ReactElement, RefObject, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect, useWhenValueChanges } from 'utility-hooks';

export interface VisibilityObserverRenderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: RefObject<any>;
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
}: VisibilityObserverProps) {
  const ref = useRef<unknown>(null);
  const [visibility, setVisibility] = useState<
    VisibilityObserverRenderProps['visibility']
  >('undetermined');
  const rootMargin = `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`;

  useIsomorphicLayoutEffect(() => {
    const { current: node } = ref;

    if (!node || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      entry => setVisibility(entry[0].isIntersecting ? 'visible' : 'invisible'),
      { rootMargin },
    );

    observer.observe(node as Element);

    return () => observer.disconnect();
  }, [rootMargin]);

  useWhenValueChanges(visibility, () => onChange?.(visibility));

  return render({ ref, visibility });
}
