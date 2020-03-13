import { Match, match, MatchFunction } from 'path-to-regexp';
import { ParsedUrlQuery } from 'querystring';
import { parse } from 'url';

export type MockEndpointParams = Record<string, string>;

interface MockEndpoint {
  method: string;
  headers: string[][];
  matchers: Array<MatchFunction<MockEndpointParams>>;
  resolver: jest.Mock<object | Response, [MockEndpointRequest]>;
}

export interface MockEndpointRequest {
  body?: unknown;
  pathname: string;
  params?: MockEndpointParams;
  searchParams?: ParsedUrlQuery;
}

const endpoints = new Map<string, MockEndpoint>();
function findEndpoint(
  request: Request,
): [undefined | MockEndpoint, Match<MockEndpointParams>, ParsedUrlQuery] {
  const uri = parse(request.url, true);
  const pathname = uri.pathname || '/';

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
      return [endpoint, endpointMatch, uri.query];
    }
  }

  return [undefined, false, uri.query];
}

export function setupMockEndpoints() {
  const fetchMock = jest.fn(
    async (input: RequestInfo, init?: RequestInit): Promise<Response> => {
      const request = new Request(input, init);
      const [endpoint, endpointMatch, searchParams] = findEndpoint(request);

      if (!endpoint || !endpointMatch) {
        return new Response(null, { status: 404 });
      }

      let body: unknown = null;

      const { _bodyText, _bodyFormData } = request as any;

      if (_bodyFormData) {
        body = _bodyFormData;
      } else {
        try {
          body = JSON.parse(_bodyText);
        } catch {}
      }

      const response = endpoint.resolver({
        pathname: endpointMatch.path,
        ...(!!body && { body }),
        ...(Object.keys(searchParams).length > 0 && { searchParams }),
        ...(Object.keys(endpointMatch.params).length > 0 && {
          params: endpointMatch.params,
        }),
      });

      if (response instanceof Response) {
        return response;
      }

      return new Response(JSON.stringify(response));
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
  const matchers = paths.map(x => {
    if (x.startsWith('path:')) {
      throw new Error(
        `MockEndpoint: Use deprecated "path:" suffix in "${name}" endpoint. Replace: "${x}", with "${x.replace(
          'path:',
          '',
        )}"`,
      );
    }

    return match<MockEndpointParams>(x);
  });

  endpoints.set(name, {
    method,
    matchers,
    resolver,
    headers: Array.from(new Headers(headers)),
  });

  return resolver;
}
