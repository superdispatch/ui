import { ThemeProvider } from '@superdispatch/ui';
import { render } from '@testing-library/react';
import MockDate from 'mockdate';
import React, { ComponentType, ReactElement } from 'react';

import { DateContextProvider } from '../DateContext';
import { DateUtils } from '../DateUtils';

export interface RenderDateComponentOptions {
  timeZoneOffset?: number;
}

export const STUB_DATE = Date.UTC(2019, 4, 24, 12, 13, 14, 15);

export function renderDateComponent(
  ui: ReactElement,
  { timeZoneOffset = -300 }: RenderDateComponentOptions = {},
) {
  MockDate.set(STUB_DATE);

  const dateUtils = new DateUtils({ timeZoneOffset });
  const Wrapper: ComponentType = ({ children }) => (
    <ThemeProvider>
      <DateContextProvider timeZoneOffset={timeZoneOffset}>
        {children}
      </DateContextProvider>
    </ThemeProvider>
  );

  const wrapper = render(ui, { wrapper: Wrapper });

  return { ...wrapper, dateUtils };
}
