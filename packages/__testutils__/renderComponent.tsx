import { ThemeProvider } from '@superdispatch/ui';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ComponentType, ReactElement, Suspense } from 'react';

const Wrapper: ComponentType = ({ children }) => (
  <Suspense fallback="Suspended…">
    <ThemeProvider>{children}</ThemeProvider>
  </Suspense>
);

export function renderComponent(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries' | 'wrapper'>,
): RenderResult {
  return render(ui, { ...options, wrapper: Wrapper });
}
