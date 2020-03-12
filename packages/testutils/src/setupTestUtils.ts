import { act } from '@testing-library/react';
import fetchMock from 'fetch-mock';

import { setupMockFunctionMatchers } from './matchers/mock-function-matchers';
import { setupFormDataSerializer } from './serializers/form-data-serializer';
import { setupLocationSerializer } from './serializers/location-serializer';

export * from './matchers/mock-function-matchers';

export function setupTestUtils() {
  setupFormDataSerializer();
  setupLocationSerializer();
  setupMockFunctionMatchers();

  afterEach(async () => {
    await act(async () => {
      await fetchMock.flush();
    });

    fetchMock.reset();
  });
}
