import { ThemeProvider } from '@superdispatch/ui';
import { LabProvider } from '@superdispatch/ui-lab';
import { ReactElement, ReactNode, Suspense } from 'react';

interface FrameComponentProps {
  children?: ReactNode;
}

export default function FrameComponent({
  children,
}: FrameComponentProps): ReactElement {
  return (
    <Suspense fallback="Loading…">
      <ThemeProvider>
        <LabProvider>{children}</LabProvider>
      </ThemeProvider>
    </Suspense>
  );
}
