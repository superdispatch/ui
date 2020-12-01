import { ThemeProvider, ThemeProviderProps } from '@superdispatch/ui';
import { LabProvider } from '@superdispatch/ui-lab';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactElement, Suspense } from 'react';

function Wrapper({ children }: ThemeProviderProps): ReactElement {
  return (
    <Suspense fallback="Suspended…">
      <ThemeProvider>
        <LabProvider>{children}</LabProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export function renderComponent(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries' | 'wrapper'>,
): RenderResult {
  return render(ui, { ...options, wrapper: Wrapper });
}
