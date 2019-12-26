import { useTheme } from '@material-ui/core';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { Color } from '../Color';
import { ThemeProvider } from '../ThemeProvider';

const colors = new Map<string, string>(
  Object.entries(Color).map(([k, v]) => [v, `Color.${k}`]),
);

expect.addSnapshotSerializer({
  test(value) {
    return !!value && typeof value === 'string';
  },

  print(value) {
    const colorName = colors.get(value);

    return colorName ?? JSON.stringify(value);
  },
});

it('accessible by `useTheme`', () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
  });

  Object.entries(result.current).forEach(([key, value]) => {
    expect(value).toMatchSnapshot(key);
  });
});

it('allows to modify theme', () => {
  const modifier = jest.fn(theme => theme);

  const { result } = renderHook(() => useTheme(), {
    wrapper: ({ children }) => (
      <ThemeProvider modifier={modifier}>{children}</ThemeProvider>
    ),
  });

  expect(modifier).toHaveBeenCalledTimes(1);
  expect(modifier).toHaveBeenCalledWith(result.current);
});
