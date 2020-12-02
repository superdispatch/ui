import { ThemeProvider } from '@superdispatch/ui';
import { ReactElement, ReactNode, Suspense } from 'react';

interface FrameComponentProps {
  children?: ReactNode;
}

export default function FrameComponent({
  children,
}: FrameComponentProps): ReactElement {
  return (
    <Suspense fallback="Loading…">
      <ThemeProvider>{children}</ThemeProvider>
    </Suspense>
  );
}
