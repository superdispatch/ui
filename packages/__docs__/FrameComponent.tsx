import { ThemeProvider } from '@superdispatch/ui';
import React, { ReactNode } from 'react';

interface FrameComponentProps {
  children?: ReactNode;
}

export default function FrameComponent({ children }: FrameComponentProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
