import fetchMock from 'fetch-mock';

function tryParseJSON(json: string) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export interface MockEndpointRequest {
  url: string;
  body: unknown;
}

export interface MockEndpointOptions {
  matcher: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';

  params?: Record<string, string>;
  headers?: Record<string, string>;

  response: object | ((request: MockEndpointRequest) => object);
}

export function mockEndpoint(
  name: string,
  { response, ...options }: MockEndpointOptions,
): jest.Mock<object, [MockEndpointRequest]> {
  const resolver = jest.fn(arg => {
    if (typeof response === 'function') {
      return response(arg);
    }

    return response;
  });

  fetchMock.mock({
    ...options,
    name,
    response(url, _, ...args: any[]) {
      const raw = args[0]?.body?.toString();
      const parsed = raw && tryParseJSON(raw);

      return resolver({ url, body: parsed || raw });
    },
  });

  return resolver;
}
