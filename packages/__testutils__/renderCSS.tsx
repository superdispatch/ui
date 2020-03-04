import { Color, ThemeProvider } from '@superdispatch/ui';
import { render } from '@testing-library/react';
import css, { Stylesheet } from 'css';
import { format } from 'prettier';
import React, { ReactElement } from 'react';

const colors = new Map<string, string>(
  Object.entries(Color).map(([k, v]) => [v, `Color.${k}`]),
);

const colorRegExp = new RegExp(
  Array.from(colors.keys(), x =>
    x.replace('(', '\\(').replace(')', '\\)'),
  ).join('|'),
  'g',
);

const renderedCSS = new Set<string>();

function getAllSheets(): Map<string, Element> {
  return new Map<string, Element>(
    Array.from(document.querySelectorAll('[data-jss]'), node => [
      node.getAttribute('data-meta') as string,
      node,
    ]),
  );
}

function getSheets(components: string[]): Element[] {
  const sheets = getAllSheets();

  if (sheets.size === 0) {
    throw new Error('There are no mounted JSS components.');
  }

  if (components.length === 0) {
    throw new Error(
      `No component names provided. Pick any of: ${Array.from(
        sheets.keys(),
        key => `  ${key}`,
      ).join('\n')}`,
    );
  }

  return components
    .slice()
    .sort((a, b) => a.localeCompare(b))
    .map(name => {
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

function formatAST(sheet: Stylesheet): string {
  return format(
    css
      .stringify(sheet)
      .replace(
        /font-family: ([\S\s][^;]+);/gm,
        (_, fonts) =>
          `font-family: ${fonts
            .split(',')
            .shift()
            .trim()};`,
      )
      .replace(colorRegExp, color => colors.get(color) as string),
    { parser: 'css', singleQuote: true },
  ).trim();
}

expect.addSnapshotSerializer({
  test: value => typeof value === 'string' && renderedCSS.has(value),
  print: value => value,
});

export function renderCSS(ui: ReactElement, components: string[]): string {
  render(<ThemeProvider>{ui}</ThemeProvider>);

  const targetSheet = parseStyleSheet(components);
  const formatted = formatAST(targetSheet);

  renderedCSS.add(formatted);

  return formatted;
}
