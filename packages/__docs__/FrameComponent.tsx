import { ThemeProvider } from '@superdispatch/ui';
import React, { ReactNode, Suspense } from 'react';

interface FrameComponentProps {
  children?: ReactNode;
}

export default function FrameComponent({ children }: FrameComponentProps) {
  return (
    <Suspense fallback="Loading…">
      <ThemeProvider>{children}</ThemeProvider>
    </Suspense>
  );
}
