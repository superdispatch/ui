import { ThemeProvider } from '@superdispatch/ui';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React from 'react';

export function renderComponent(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries' | 'wrapper'>,
): RenderResult {
  return render(ui, { ...options, wrapper: ThemeProvider });
}
