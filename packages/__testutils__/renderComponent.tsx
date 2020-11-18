import { ThemeProvider, ThemeProviderProps } from '@superdispatch/ui';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement, Suspense } from 'react';

function Wrapper(props: ThemeProviderProps): ReactElement {
  return (
    <Suspense fallback="Suspended…">
      <ThemeProvider {...props} />
    </Suspense>
  );
}

export function renderComponent(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries' | 'wrapper'>,
): RenderResult {
  return render(ui, { ...options, wrapper: Wrapper });
}
