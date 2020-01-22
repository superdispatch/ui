import { useTheme } from '@material-ui/core';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { Color } from '../Color';
import { ThemeProvider } from '../ThemeProvider';

const colors = new Map<string, string>(
  Object.entries(Color).map(([k, v]) => [v, `Color.${k}`]),
);
const colorRegExp = new RegExp(
  [...colors.keys()]
    .map(x => x.replace('(', '\\(').replace(')', '\\)'))
    .join('|'),
  'g',
);

expect.addSnapshotSerializer({
  test: value =>
    !!value && typeof value === 'string' && colorRegExp.test(value),
  print: (value: string) => {
    if (colors.has(value)) {
      return colors.get(value) as string;
    }

    return `"${value.replace(
      colorRegExp,
      color => colors.get(color) as string,
    )}"`;
  },
});

it('exposes overridden theme', () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
  });

  Object.entries(result.current).forEach(([key, value]) => {
    expect(value).toMatchSnapshot(key);
  });
});

it('allows to modify overridden theme', () => {
  const modifier = jest.fn(theme => theme);

  const { result } = renderHook(() => useTheme(), {
    wrapper: ({ children }) => (
      <ThemeProvider modifier={modifier}>{children}</ThemeProvider>
    ),
  });

  expect(modifier).toHaveBeenCalledTimes(1);
  expect(modifier).toHaveBeenCalledWith(result.current);
});
