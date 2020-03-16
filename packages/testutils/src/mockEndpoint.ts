import { fromPairs } from 'lodash';
import { Match, match, MatchFunction } from 'path-to-regexp';

export type MockEndpointParams = Record<string, string>;

interface MockEndpoint {
  method: string;
  headers: string[][];
  matchers: Array<MatchFunction<MockEndpointParams>>;
  resolver: jest.Mock<object | Response, [MockEndpointRequest]>;
}

export interface MockEndpointRequest {
  body: unknown;
  pathname: string;
  params: MockEndpointParams;
  headers: MockEndpointParams;
  searchParams: MockEndpointParams;
}

const endpoints = new Map<string, MockEndpoint>();

function findEndpoint(
  request: Request,
): [undefined | MockEndpoint, Match<MockEndpointParams>, URLSearchParams] {
  const { pathname, searchParams } = new URL(request.url);

  for (const endpoint of endpoints.values()) {
    let endpointMatch: Match<MockEndpointParams> = false;

    if (endpoint.method !== request.method) {
      continue;
    }

    const { headers } = endpoint;

    if (headers.length > 0) {
      const hasInvalidHeader = headers.some(
        ([key, value]) => request.headers.get(key) !== value,
      );

      if (hasInvalidHeader) {
        continue;
      }
    }

    for (const matcher of endpoint.matchers) {
      endpointMatch = matcher(pathname);

      if (endpointMatch) {
        break;
      }
    }

    if (endpointMatch) {
      return [endpoint, endpointMatch, searchParams];
    }
  }

  return [undefined, false, searchParams];
}

export function setupMockEndpoints() {
  require('whatwg-fetch');

  const fetchMock = jest.fn(
    async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
      const request = new Request(input, init);
      const [endpoint, endpointMatch, searchParams] = findEndpoint(request);

      if (!endpoint || !endpointMatch) {
        return new Response(null, { status: 404 });
      }

      let body: unknown;

      const { _bodyText, _bodyFormData } = request as any;

      if (_bodyFormData) {
        body = _bodyFormData;
      } else {
        try {
          body = JSON.parse(_bodyText);
        } catch {
          body = _bodyText;
        }
      }

      const requiredHeaders = new Headers(endpoint.headers);
      const parsedHeaders = fromPairs(
        Array.from(request.headers).filter(
          ([key]) =>
            key !== 'accept' &&
            key !== 'content-type' &&
            !requiredHeaders.has(key),
        ),
      );
      const parsedSearchParams = Array.from(searchParams.entries());
      const response = endpoint.resolver({
        body,
        headers: parsedHeaders,
        pathname: endpointMatch.path,
        params: endpointMatch.params,
        searchParams: fromPairs(parsedSearchParams),
      });

      if (response instanceof Response) {
        return response;
      }

      return new Response(JSON.stringify(response), {
        headers: { 'Content-Type': 'application/json' },
      });
    },
  );

  Object.assign(global, { fetch: fetchMock });

  afterEach(() => {
    endpoints.clear();
    fetchMock.mockClear();
  });
}

export interface MockEndpointOptions {
  matcher: string | string[];
  method: MockEndpoint['method'];
  headers?: HeadersInit;
  response:
    | object
    | Response
    | ((request: MockEndpointRequest) => object | Response);
}

export function mockEndpoint(
  name: string,
  { response, matcher, headers, method }: MockEndpointOptions,
): jest.Mock<object, [MockEndpointRequest]> {
  if (endpoints.has(name)) {
    throw new Error(`MockEndpoint: "${name}" was already registered.`);
  }

  const resolver = jest.fn<object, [MockEndpointRequest]>(arg =>
    typeof response === 'function' ? response(arg) : response,
  );

  const paths = !Array.isArray(matcher) ? [matcher] : matcher;
  const matchers = paths.map(x => match<MockEndpointParams>(x));

  endpoints.set(name, {
    method,
    matchers,
    resolver,
    headers: Array.from(new Headers(headers)),
  });

  return resolver;
}
