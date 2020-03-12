import fetchMock from 'fetch-mock';
import { Request, RequestInit } from 'node-fetch';
import { ParsedUrlQuery } from 'querystring';
import { parse } from 'url';

Object.assign(global, {
  fetch: fetchMock.config.fetch,
  Request: fetchMock.config.Request,
  Response: fetchMock.config.Response,
  Headers: fetchMock.config.Headers,
});

export interface MockEndpointRequest {
  body?: unknown;
  pathname: string;
  searchParams: ParsedUrlQuery;
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
  const resolver = jest.fn<object, [MockEndpointRequest]>(arg => {
    if (typeof response === 'function') {
      return response(arg);
    }

    return response;
  });

  fetchMock.mock({
    ...options,
    name,
    async response(
      url,
      init?: Request | RequestInit,
      originalRequest?: Request,
    ) {
      const initBody = await init?.body;
      const request = new Request(
        originalRequest == null ? url : originalRequest,
        { ...init, ...(!!initBody && { body: initBody }) },
      );

      console.log(init, originalRequest, request);

      const { pathname, query } = parse(request.url, true);
      const contentType = request.headers.get('content-type');

      let body: unknown = null;

      if (contentType) {
        if (contentType.startsWith('text/plain')) {
          body = await request.text();
        } else if (contentType.startsWith('application/json')) {
          body = await request.json();
        }
      }

      // console.log(headers.get('content-type'));

      // if (body) {
      //   if (body instanceof Buffer) {
      //     body = body.toString();
      //   }
      //
      //   if (typeof body === 'string') {
      //     try {
      //       body = JSON.parse(body);
      //     } catch {}
      //   }
      // }

      // console.log(body);

      return resolver({
        searchParams: query,
        pathname: pathname || '/',
        ...(!!body && { body }),
      });
    },
  });

  return resolver;
}
