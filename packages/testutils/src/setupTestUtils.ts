import { act } from '@testing-library/react';
import fetchMock from 'fetch-mock';

import { setupMockFunctionMatchers } from './matchers/mock-function-matchers';
import { setupLocationSerializer } from './serializers/location-serializer';

export * from './matchers/mock-function-matchers';

export function setupTestUtils() {
  setupLocationSerializer();
  setupMockFunctionMatchers();

  afterEach(async () => {
    await act(async () => {
      await fetchMock.flush();
    });

    fetchMock.reset();
  });
}
