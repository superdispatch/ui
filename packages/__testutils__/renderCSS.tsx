import { Color, ThemeProvider } from '@superdispatch/ui';
import { render } from '@testing-library/react';
import { SheetsRegistry } from 'jss';
import { format } from 'prettier';
import React, { ComponentType, ReactElement } from 'react';

const colors = new Map<string, string>(
  Object.entries(Color).map(([k, v]) => [v.toLowerCase(), `Color.${k}`]),
);
const colorRegExp = new RegExp(
  [...colors.keys()]
    .map(x => x.replace('(', '\\(').replace(')', '\\)'))
    .join('|'),
  'g',
);

let sheetsRegistry: SheetsRegistry;
const Wrapper: ComponentType = ({ children }) => (
  <ThemeProvider sheetsRegistry={sheetsRegistry}>{children}</ThemeProvider>
);

function getCSS(baseCSS?: string) {
  const css = format(sheetsRegistry.toString(), {
    parser: 'css',
  })
    .replace(colorRegExp, color => colors.get(color) as string)
    .replace(/"/g, "'");

  return !baseCSS ? css : css.replace(baseCSS, '');
}

beforeEach(() => {
  sheetsRegistry = new SheetsRegistry();
});

export function renderCSS(ui: ReactElement): string {
  const { rerender } = render(<div />, { wrapper: Wrapper });

  const baseCSS = getCSS();

  rerender(ui);

  return getCSS(baseCSS);
}
