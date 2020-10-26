import { renderHook } from '@testing-library/react-hooks';
import React, { ComponentType } from 'react';

import { DateConfigProvider, useDateConfig } from './DateConfig';

test('basic', () => {
  const { result } = renderHook(useDateConfig);

  expect(result.current.format).toBe('DateTimeISO');
});

test('format overrides', () => {
  const Wrapper: ComponentType = (props) => (
    <DateConfigProvider {...props} format="JodaISO" />
  );

  const { result } = renderHook(useDateConfig, { wrapper: Wrapper });

  expect(result.current.format).toBe('JodaISO');
});
