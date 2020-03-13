import { flatMap } from 'lodash';

import {
  mockEndpoint,
  MockEndpointOptions,
  MockEndpointRequest,
} from '../mockEndpoint';
import { setupTestUtils } from '../setupTestUtils';

setupTestUtils();

function makeFetchArgs(
  input: string,
  init?: RequestInit,
): Array<Parameters<typeof fetch>> {
  return [
    [input, init],
    [new Request(input, init)],
    [
      new Request(input, {
        ...(!!init?.method && { method: 'INVALID' }),
        ...(!!init?.headers && { headers: { Invalid: 'Value' } }),
        ...(!!init?.body && { body: 'Invalid Body' }),
      }),
      init,
    ],
  ];
}

it('wraps global fetch', async () => {
  const mock = mockEndpoint('foo', {
    method: 'GET',
    matcher: '/foo',
    response: { foo: 'bar' },
  });

  const mockArgs: Array<Parameters<typeof fetch>> = makeFetchArgs(
    'http://host/foo',
  );

  for (const args of mockArgs) {
    expect(mock).toHaveBeenCalledTimes(0);

    const response = await fetch(...args);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenLastCalledWith({ pathname: '/foo' });
    expect(mock).toHaveLastReturnedWith({ foo: 'bar' });

    expect(response).toBeInstanceOf(Response);
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(response.headers.get('content-type')).toBe('application/json');
    expect(await response.json()).toEqual({ foo: 'bar' });

    mock.mockClear();
  }
});

it('throws when endpoint name already registered', () => {
  expect(() =>
    mockEndpoint('foo', {
      method: 'GET',
      matcher: '/foo',
      response: {},
    }),
  ).not.toThrow();

  expect(() =>
    mockEndpoint('foo', {
      method: 'GET',
      matcher: '/foo',
      response: {},
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"MockEndpoint: \\"foo\\" was already registered."`,
  );
});

it.each<
  [
    string,
    MockEndpointOptions,
    Array<Parameters<typeof makeFetchArgs>>,
    Array<Parameters<typeof makeFetchArgs>>,
  ]
>([
  [
    'url',
    { matcher: '/foo', method: 'GET', response: {} },
    [['http://host/foo']],
    [['http://host/bar']],
  ],
  [
    'multiple urls',
    { matcher: ['/foo', '/bar'], method: 'GET', response: {} },
    [['http://host/foo'], ['http://host/bar']],
    [['http://host/baz']],
  ],
  [
    'url pattern',
    { matcher: '/foo/:id', method: 'GET', response: {} },
    [['http://host/foo/1'], ['http://host/foo/2'], ['http://host/foo/bar']],
    [['http://host/foo'], ['http://host/foo/'], ['http://host/foo/1/bar']],
  ],
  [
    'multiple url patterns',
    { matcher: ['/foo/:id', '/foo/:id/bar'], method: 'GET', response: {} },
    [
      ['http://host/foo/1'],
      ['http://host/foo/1/bar'],
      ['http://host/foo/bar'],
      ['http://host/foo/bar/bar'],
    ],
    [
      ['http://host/foo'],
      ['http://host/foo/'],
      ['http://host/foo/1/baz'],
      ['http://host/foo/1/bar/baz'],
    ],
  ],
  [
    'method',
    { matcher: '/foo', method: 'GET', response: {} },
    [['http://host/foo', { method: 'GET' }]],
    [['http://host/foo', { method: 'POST' }]],
  ],
  [
    'headers',
    { matcher: '/foo', method: 'GET', response: {}, headers: { Foo: 'bar' } },
    [
      ['http://host/foo', { headers: { Foo: 'bar' } }],
      ['http://host/foo', { headers: [['Foo', 'bar']] }],
      ['http://host/foo', { headers: new Headers([['Foo', 'bar']]) }],
    ],
    [
      ['http://host/foo', { headers: { Foo: 'baz' } }],
      ['http://host/foo', { headers: [['Foo', 'baz']] }],
      ['http://host/foo', { headers: new Headers([['Foo', 'baz']]) }],
    ],
  ],
])('matches by %p', async (name, options, validVariants, invalidVariants) => {
  const mock = mockEndpoint(name, options);
  const validMockArgs = flatMap(validVariants, args => makeFetchArgs(...args));
  const invalidMockArgs = flatMap(invalidVariants, args =>
    makeFetchArgs(...args),
  );

  for (const args of validMockArgs) {
    expect(mock).toHaveBeenCalledTimes(0);

    const response = await fetch(...args);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    mock.mockClear();
  }

  for (const args of invalidMockArgs) {
    expect(mock).toHaveBeenCalledTimes(0);

    const response = await fetch(...args);

    expect(mock).toHaveBeenCalledTimes(0);
    expect(response.ok).toBe(false);
    expect(response.status).toBe(404);

    mock.mockClear();
  }
});

it.each<
  [
    string,
    Partial<MockEndpointOptions>,
    Parameters<typeof makeFetchArgs>,
    Partial<MockEndpointRequest>,
  ]
>([
  [
    'headers',
    { matcher: '/' },
    [
      'http://host/',
      {
        headers: {
          Foo: 'Bar',
          Bar: 'Baz',
          Accept: 'text/plain',
          'Content-Type': 'text/plain',
        },
      },
    ],
    { pathname: '/', headers: { foo: 'Bar', bar: 'Baz' } },
  ],
  [
    'searchParams',
    { matcher: '/' },
    ['http://host/?foo=bar&bar=baz'],
    { pathname: '/', searchParams: { foo: 'bar', bar: 'baz' } },
  ],
  [
    'params',
    { matcher: '/:foo/:bar' },
    ['http://host/baz/1'],
    { pathname: '/baz/1', params: { foo: 'baz', bar: '1' } },
  ],
])('exposes %s', async (name, options, fetchArgs, expected) => {
  const mock = mockEndpoint(name, {
    method: 'GET',
    response: {},
    ...options,
  } as any);
  const mockArgs = makeFetchArgs(...fetchArgs);

  for (const args of mockArgs) {
    const response = await fetch(...args);

    expect(response.ok).toBe(true);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenLastCalledWith(expected);

    mock.mockClear();
  }
});

it('exposes headers', async () => {
  const mock = mockEndpoint('foo', {
    method: 'GET',
    matcher: '/foo',
    response: { foo: 'bar' },
  });

  const mockArgs = makeFetchArgs('http://host/foo', {
    headers: { 'X-Hello': 'World' },
  });

  for (const args of mockArgs) {
    const response = await fetch(...args);
    expect(response.ok).toBe(true);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenLastCalledWith({
      pathname: '/foo',
      headers: { 'x-hello': 'World' },
    });

    mock.mockClear();
  }
});

it.each<[string, () => BodyInit, undefined | (() => unknown)]>([
  ['plain/text', () => 'Hello', undefined],
  [
    'application/json',
    () => JSON.stringify({ foo: 'bar', bar: 'baz' }),
    () => ({ foo: 'bar', bar: 'baz' }),
  ],
  [
    'multipart/form-data',
    () => {
      const formData = new FormData();
      formData.append('foo', 'bar');
      formData.append('bar', 'baz');
      return formData;
    },
    undefined,
  ],
])(
  'exposes body with `%p` type',
  async (name, makeBody, makeResponse = makeBody) => {
    const mock = mockEndpoint(name, {
      method: 'POST',
      matcher: '/foo',
      response: { foo: 'bar' },
    });

    const mockArgs = makeFetchArgs('http://host/foo', {
      method: 'POST',
      body: makeBody(),
    });

    for (const args of mockArgs) {
      const response = await fetch(...args);

      expect(response.ok).toBe(true);
      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenLastCalledWith({
        pathname: '/foo',
        body: makeResponse(),
      });
      expect(mock).toHaveLastReturnedWith({ foo: 'bar' });

      mock.mockClear();
    }
  },
);

it('accepts response factory', async () => {
  const random = Math.random();

  mockEndpoint('foo', {
    method: 'POST',
    matcher: '/foo/:id',
    response: ({ body, params, pathname, searchParams }) => ({
      random,
      body,
      params,
      pathname,
      searchParams,
    }),
  });

  const response = await fetch('http://host/foo/bar?baz=quoz', {
    method: 'POST',
    body: 'noop',
  });

  await expect(response.json()).resolves.toEqual({
    random,
    body: 'noop',
    pathname: '/foo/bar',
    params: { id: 'bar' },
    searchParams: { baz: 'quoz' },
  });
});

it('accepts request instance', async () => {
  mockEndpoint('foo', {
    method: 'GET',
    matcher: '/foo',
    response: new Response(null, { status: 500 }),
  });

  mockEndpoint('bar', {
    method: 'GET',
    matcher: '/bar',
    response: () => new Response(null, { status: 500 }),
  });

  await expect(fetch('http://host/foo')).resolves.toEqual(
    new Response(null, { status: 500 }),
  );

  await expect(fetch('http://host/bar')).resolves.toEqual(
    new Response(null, { status: 500 }),
  );
});
