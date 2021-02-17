import { fromPairs } from 'lodash';
import { Match, match, MatchFunction } from 'path-to-regexp';
import 'whatwg-fetch';

export type MockEndpointParams = Record<string, string>;
export type MockEndpointResponse = Response | Record<string, unknown>;

export interface MockEndpointRequest {
  body: unknown;
  pathname: string;
  params: MockEndpointParams;
  headers: MockEndpointParams;
  searchParams: MockEndpointParams;
}

interface MockEndpoint {
  method: string;
  headers: string[][];
  matchers: Array<MatchFunction<MockEndpointParams>>;
  resolver: jest.Mock<MockEndpointResponse, [MockEndpointRequest]>;
}

const endpoints = new Map<string, MockEndpoint>();

let fetchMock: jest.SpyInstance;

beforeEach(() => {
  fetchMock = jest.spyOn(window, 'fetch').mockImplementation(
    (input: RequestInfo, init?: RequestInit): Promise<Response> => {
      const request = new Request(input, init);
      const [endpoint, endpointMatch, searchParams] = findEndpoint(request);

      if (!endpoint || !endpointMatch) {
        console.warn(
          "Unmatched '%s' request to '%s'",
          request.method,
          request.url,
        );

        return Promise.resolve(new Response(null, { status: 404 }));
      }

      let body: unknown;

      const { _bodyText, _bodyFormData } = request as Request & {
        _bodyText: string;
        _bodyFormData?: FormData;
      };

      if (_bodyFormData) {
        body = _bodyFormData;
      } else {
        try {
          body = JSON.parse(_bodyText) as unknown;
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
        return Promise.resolve(response);
      }

      return Promise.resolve(
        new Response(JSON.stringify(response), {
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    },
  );
});

afterEach(() => {
  endpoints.clear();
  fetchMock.mockClear();
});

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

export interface MockEndpointOptions {
  matcher: string | string[];
  method: MockEndpoint['method'];
  headers?: HeadersInit;
  response:
    | MockEndpointResponse
    | ((request: MockEndpointRequest) => MockEndpointResponse);
}

export function mockEndpoint(
  name: string,
  { response, matcher, headers, method }: MockEndpointOptions,
): jest.Mock<MockEndpointResponse, [MockEndpointRequest]> {
  if (endpoints.has(name)) {
    throw new Error(`MockEndpoint: "${name}" was already registered.`);
  }

  const resolver = jest.fn<MockEndpointResponse, [MockEndpointRequest]>(
    (request) =>
      typeof response === 'function' ? response(request) : response,
  );

  const paths = !Array.isArray(matcher) ? [matcher] : matcher;
  const matchers = paths.map((x) => match<MockEndpointParams>(x));

  endpoints.set(name, {
    method,
    matchers,
    resolver,
    headers: Array.from(new Headers(headers)),
  });

  return resolver;
}
