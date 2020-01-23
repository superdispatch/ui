import { renderTheme } from '@superdispatch/testutils';

import { Color } from '../Color';

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
  print: (value: string) =>
    JSON.stringify(
      value.replace(colorRegExp, color => colors.get(color) as string),
    ),
});

it('exposes overridden theme', () => {
  const { overrides, ...theme } = renderTheme();

  Object.entries(theme).forEach(([key, value]) => {
    expect(value).toMatchSnapshot(key);
  });
});

it('allows to modify overridden theme', () => {
  const modifier = jest.fn(x => x);
  const theme = renderTheme(modifier);

  expect(modifier).toHaveBeenCalledTimes(1);
  expect(modifier).toHaveBeenCalledWith(theme);
});
