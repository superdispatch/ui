import {
  mockEndpoint,
  MockEndpointOptions,
  MockEndpointRequest,
  MockEndpointResponse,
} from './mockEndpoint';

export type MockEndpoints<TEndpointName extends string> = {
  [TKey in TEndpointName]: MockEndpointOptions;
};

export type MockEndpointResolvers<TEndpointName extends string> = {
  [TKey in TEndpointName]: jest.Mock<
    MockEndpointResponse,
    [MockEndpointRequest]
  >;
};

export function mockEndpoints<TEndpointName extends string>(
  endpoints: MockEndpoints<TEndpointName>,
  defaults?: Pick<MockEndpointOptions, 'headers'>,
): MockEndpointResolvers<TEndpointName> {
  const mocks = {} as MockEndpointResolvers<TEndpointName>;

  for (const name of Object.keys(endpoints) as TEndpointName[]) {
    mocks[name] = mockEndpoint(name, { ...defaults, ...endpoints[name] });
  }

  return mocks;
}
