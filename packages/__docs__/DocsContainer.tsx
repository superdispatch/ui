import {
  DocsContext,
  DocsContextProps,
} from '@storybook/addon-docs/dist/blocks';
import { scrollToElement } from '@storybook/addon-docs/dist/blocks/utils';
import {
  ensure as ensureStorybookTheme,
  ThemeProvider as StorybookThemeProvider,
} from '@storybook/theming';
import { ThemeVars } from '@storybook/theming/dist/types';
import { ThemeProvider } from '@superdispatch/ui';
import React, { ReactNode, useEffect } from 'react';

interface DocsContainerProps {
  children: ReactNode;
  context: DocsContextProps;
}

export function DocsContainer({ context, children }: DocsContainerProps) {
  const parameters = context.parameters as undefined | Record<string, unknown>;
  const options = parameters?.options as undefined | Record<string, unknown>;
  const theme = ensureStorybookTheme(options?.theme as ThemeVars);

  const { id: storyID } = context;

  useEffect(() => {
    if (storyID) {
      const elementID = `story-anchor--${storyID}`;
      const element = document.getElementById(elementID);

      if (element) {
        scrollToElement(element);
      }
    }
  }, [storyID]);

  return (
    <DocsContext.Provider value={context}>
      <StorybookThemeProvider theme={theme}>
        <ThemeProvider injectFirst={false}>{children}</ThemeProvider>
      </StorybookThemeProvider>
    </DocsContext.Provider>
  );
}
