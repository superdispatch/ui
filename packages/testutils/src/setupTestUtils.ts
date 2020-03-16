import { setupMockFunctionMatchers } from './matchers/mock-function-matchers';
import { setupMockEndpoints } from './mockEndpoint';
import { setupFormDataSerializer } from './serializers/form-data-serializer';
import { setupLocationSerializer } from './serializers/location-serializer';

export * from './matchers/mock-function-matchers';

export function setupTestUtils() {
  setupMockEndpoints();
  setupFormDataSerializer();
  setupLocationSerializer();
  setupMockFunctionMatchers();
}
