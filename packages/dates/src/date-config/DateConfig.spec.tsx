import { renderHook } from '@testing-library/react-hooks';
import { ReactElement } from 'react';
import {
  DateConfigProvider,
  DateConfigProviderProps,
  useDateConfig,
} from './DateConfig';

test('basic', () => {
  const { result } = renderHook(useDateConfig);

  expect(result.current.format).toBe('DateTimeISO');
});

test('format overrides', () => {
  function Wrapper(props: DateConfigProviderProps): ReactElement {
    return <DateConfigProvider {...props} format="JodaISO" />;
  }

  const { result } = renderHook(useDateConfig, { wrapper: Wrapper });

  expect(result.current.format).toBe('JodaISO');
});
