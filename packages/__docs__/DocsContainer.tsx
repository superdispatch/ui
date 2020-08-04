import {
  DocsContext,
  DocsContextProps,
} from '@storybook/addon-docs/dist/blocks';
import {
  ensure as ensureStorybookTheme,
  ThemeProvider as StorybookThemeProvider,
} from '@storybook/theming';
import { ThemeVars } from '@storybook/theming/dist/types';
import { ThemeProvider } from '@superdispatch/ui';
import React, { ReactNode } from 'react';

interface DocsContainerProps {
  children: ReactNode;
  context: DocsContextProps;
}

export function DocsContainer({ context, children }: DocsContainerProps) {
  const parameters = context.parameters as undefined | Record<string, unknown>;
  const options = parameters?.options as undefined | Record<string, unknown>;
  const theme = ensureStorybookTheme(options?.theme as ThemeVars);

  return (
    <DocsContext.Provider value={context}>
      <StorybookThemeProvider theme={theme}>
        <ThemeProvider>{children}</ThemeProvider>
      </StorybookThemeProvider>
    </DocsContext.Provider>
  );
}
