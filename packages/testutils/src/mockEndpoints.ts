import {
  mockEndpoint,
  MockEndpointOptions,
  MockEndpointRequest,
} from './mockEndpoint';

export type MockEndpoints<TEndpointName extends string> = {
  [TKey in TEndpointName]: MockEndpointOptions;
};

export type MockEndpointResolvers<TEndpointName extends string> = {
  [TKey in TEndpointName]: jest.Mock<object, [MockEndpointRequest]>;
};

export function mockEndpoints<TEndpointName extends string>(
  endpoints: MockEndpoints<TEndpointName>,
  defaults?: Pick<MockEndpointOptions, 'headers'>,
): MockEndpointResolvers<TEndpointName> {
  return Object.keys(endpoints).reduce<any>((acc, name) => {
    acc[name] = mockEndpoint(name, {
      ...defaults,
      ...endpoints[name as TEndpointName],
    });

    return acc;
  }, {});
}
