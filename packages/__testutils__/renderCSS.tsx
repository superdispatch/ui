import { Color, ThemeProvider } from '@superdispatch/ui';
import { render } from '@testing-library/react';
import css, { Stylesheet } from 'css';
import { format } from 'prettier';
import React, { ReactElement } from 'react';

const colors = new Map<string, string>(
  Object.entries(Color).map(([k, v]) => [v, `Color.${k}`]),
);

const colorRegExp = new RegExp(
  [...colors.keys()]
    .map(x => x.replace('(', '\\(').replace(')', '\\)'))
    .join('|'),
  'g',
);

function parseStyleSheet(names: string[]): Stylesheet {
  return css.parse(
    names
      .map(
        name =>
          document.querySelector(`[data-jss][data-meta="${name}"]`)
            ?.textContent,
      )
      .filter(Boolean)
      .join('\n'),
  );
}

function formatAST(sheet: Stylesheet) {
  return format(
    css
      .stringify(sheet)
      .replace(colorRegExp, color => colors.get(color) as string),
    { parser: 'css', singleQuote: true },
  ).trim();
}

expect.addSnapshotSerializer({
  test: value => typeof value === 'string',
  print: value => value,
});

export function renderCSS(ui: ReactElement, names: string[]): string {
  render(<ThemeProvider>{ui}</ThemeProvider>);

  const targetSheet = parseStyleSheet(names);

  return formatAST(targetSheet);
}
