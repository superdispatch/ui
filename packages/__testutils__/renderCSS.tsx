import { Color, ThemeProvider } from '@superdispatch/ui';
import { render } from '@testing-library/react';
import css, { Stylesheet } from 'css';
import { SheetsRegistry } from 'jss';
import { isEqual } from 'lodash';
import { format } from 'prettier';
import React, { ReactElement } from 'react';

const colors = new Map<string, string>(
  Object.entries(Color).map(([k, v]) => [v.toLowerCase(), `Color.${k}`]),
);
const colorRegExp = new RegExp(
  [...colors.keys()]
    .map(x => x.replace('(', '\\(').replace(')', '\\)'))
    .join('|'),
  'g',
);

function getAST(sheets: SheetsRegistry): Stylesheet {
  return css.parse(sheets.toString());
}

function diffAST(target: Stylesheet, base: Stylesheet) {
  target.stylesheet!.rules = target.stylesheet!.rules.filter(targetRule =>
    base.stylesheet!.rules.some(baseRule => !isEqual(baseRule, targetRule)),
  );
}

function formatAST(sheet: Stylesheet) {
  return format(css.stringify(sheet), { parser: 'css' })
    .replace(colorRegExp, color => colors.get(color) as string)
    .replace(/"/g, "'");
}

export function renderCSS(
  target: ReactElement,
  baseComponent: ReactElement = <div />,
): string {
  const sheets = new SheetsRegistry();
  const { rerender } = render(
    <ThemeProvider sheetsRegistry={sheets}>{baseComponent}</ThemeProvider>,
  );

  const baseSheet = getAST(sheets);

  sheets.reset();

  rerender(<ThemeProvider sheetsRegistry={sheets}>{target}</ThemeProvider>);

  const targetSheet = getAST(sheets);

  diffAST(targetSheet, baseSheet);

  return formatAST(targetSheet);
}
