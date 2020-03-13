import { flatMap } from 'lodash';

import { mockEndpoint, MockEndpointOptions } from '../mockEndpoint';
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
    'http://local.host/foo',
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
    [['http://local.host/foo']],
    [['http://local.host/bar']],
  ],
  [
    'multiple urls',
    { matcher: ['/foo', '/bar'], method: 'GET', response: {} },
    [['http://local.host/foo'], ['http://local.host/bar']],
    [['http://local.host/baz']],
  ],
  [
    'url pattern',
    { matcher: '/foo/:id', method: 'GET', response: {} },
    [
      ['http://local.host/foo/1'],
      ['http://local.host/foo/2'],
      ['http://local.host/foo/bar'],
    ],
    [
      ['http://local.host/foo'],
      ['http://local.host/foo/'],
      ['http://local.host/foo/1/bar'],
    ],
  ],
  [
    'multiple url patterns',
    { matcher: ['/foo/:id', '/foo/:id/bar'], method: 'GET', response: {} },
    [
      ['http://local.host/foo/1'],
      ['http://local.host/foo/1/bar'],
      ['http://local.host/foo/bar'],
      ['http://local.host/foo/bar/bar'],
    ],
    [
      ['http://local.host/foo'],
      ['http://local.host/foo/'],
      ['http://local.host/foo/1/baz'],
      ['http://local.host/foo/1/bar/baz'],
    ],
  ],
  [
    'method',
    { matcher: '/foo', method: 'GET', response: {} },
    [['http://local.host/foo', { method: 'GET' }]],
    [['http://local.host/foo', { method: 'POST' }]],
  ],
  [
    'headers',
    { matcher: '/foo', method: 'GET', response: {}, headers: { Foo: 'bar' } },
    [
      ['http://local.host/foo', { headers: { Foo: 'bar' } }],
      ['http://local.host/foo', { headers: [['Foo', 'bar']] }],
      ['http://local.host/foo', { headers: new Headers([['Foo', 'bar']]) }],
    ],
    [
      ['http://local.host/foo', { headers: { Foo: 'baz' } }],
      ['http://local.host/foo', { headers: [['Foo', 'baz']] }],
      ['http://local.host/foo', { headers: new Headers([['Foo', 'baz']]) }],
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

it('exposes headers', async () => {
  const mock = mockEndpoint('foo', {
    method: 'GET',
    matcher: '/foo',
    response: { foo: 'bar' },
  });

  const mockArgs: Array<Parameters<typeof fetch>> = [
    ['http://locahost/foo', { headers: { 'X-Hello': 'World' } }],
    [new Request('http://locahost/foo', { headers: { 'X-Hello': 'World' } })],
    [
      new Request('http://locahost/foo', { headers: { 'X-Hello': 'WRONG' } }),
      { headers: { 'X-Hello': 'World' } },
    ],
  ];

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

    const mockArgs = makeFetchArgs('http://locahost/foo', {
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

  const response = await fetch('http://localhost/foo/bar?baz=quoz', {
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
