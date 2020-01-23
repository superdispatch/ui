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

function getAllSheets(): Map<string, Element> {
  return new Map<string, Element>(
    Array.from(document.querySelectorAll('[data-jss]')).map(node => [
      node.getAttribute('data-meta') as string,
      node,
    ]),
  );
}

function getSheets(names: string[]): Element[] {
  const sheets = getAllSheets();

  if (sheets.size === 0) {
    throw new Error('There are no mounted JSS components.');
  }

  if (names.length === 0) {
    throw new Error(
      `No "names" provided. Pick any of: ${Array.from(
        sheets.keys(),
        key => `  ${key}`,
      ).join('\n')}`,
    );
  }

  return names.map(name => {
    const sheet = sheets.get(name);

    if (!sheet) {
      throw new Error(
        `Sheet for component "${name}" not found. You can select one of: ${Array.from(
          sheets.keys(),
          key => `  ${key}`,
        ).join('\n')}`,
      );
    }

    return sheet;
  });
}

function parseStyleSheet(names: string[]): Stylesheet {
  return css.parse(
    getSheets(names)
      .map(node => node.textContent)
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
