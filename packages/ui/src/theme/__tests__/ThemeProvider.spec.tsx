import { useTheme } from '@material-ui/core';
import { renderHook } from '@testing-library/react-hooks';
import { set } from 'lodash';
import React from 'react';

import { Color } from '../Color';
import { ThemeProvider } from '../ThemeProvider';

const marked = new WeakSet();

expect.addSnapshotSerializer({
  test(value) {
    return !!value && typeof value === 'object' && !marked.has(value);
  },

  print(value, serialize) {
    const colors = new Map<string, string>(
      Object.entries(Color).map(([k, v]) => [v, `Color.${k}`]),
    );

    const convert = (obj: object, key: number | string, item: unknown) => {
      if (typeof item === 'string') {
        const colorName = colors.get(item);

        if (colorName) {
          set(obj, key, colorName);
        }
      }
    };

    const traverse = (input: unknown): void => {
      if (typeof input === 'object' && input != null) {
        marked.add(input);

        if (Array.isArray(input)) {
          input.forEach((item, idx) => {
            convert(input, idx, item);
            traverse(item);
          });
        } else {
          Object.entries(input).forEach(([key, item]) => {
            convert(input, key, item);
            traverse(item);
          });
        }
      }
    };

    traverse(value);

    return serialize(value);
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
