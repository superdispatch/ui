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

it.each<
  [
    string,
    MockEndpointOptions,
    Parameters<typeof makeFetchArgs>,
    Parameters<typeof makeFetchArgs>,
  ]
>([
  [
    'url',
    { matcher: '/foo', method: 'GET', response: {} },
    ['http://local.host/foo'],
    ['http://local.host/bar'],
  ],
  [
    'method',
    { matcher: '/foo', method: 'GET', response: {} },
    ['http://local.host/foo', { method: 'GET' }],
    ['http://local.host/foo', { method: 'POST' }],
  ],
  [
    'headers as plain object',
    { matcher: '/foo', method: 'GET', response: {}, headers: { Foo: 'bar' } },
    ['http://local.host/foo', { headers: { Foo: 'bar' } }],
    ['http://local.host/foo', { headers: { Foo: 'baz' } }],
  ],
  [
    'headers as entries',
    { matcher: '/foo', method: 'GET', response: {}, headers: { Foo: 'bar' } },
    ['http://local.host/foo', { headers: [['Foo', 'bar']] }],
    ['http://local.host/foo', { headers: [['Foo', 'baz']] }],
  ],
  [
    'headers as instance',
    { matcher: '/foo', method: 'GET', response: {}, headers: { Foo: 'bar' } },
    ['http://local.host/foo', { headers: new Headers([['Foo', 'bar']]) }],
    ['http://local.host/foo', { headers: new Headers([['Foo', 'baz']]) }],
  ],
])('matches by %p', async (name, options, validVariants, invalidVariants) => {
  const mock = mockEndpoint(name, options);
  const validMockArgs = makeFetchArgs(...validVariants);
  const invalidMockArgs = makeFetchArgs(...invalidVariants);

  for (const args of validMockArgs) {
    expect(mock).toHaveBeenCalledTimes(0);

    const response = await fetch(...args);

    expect(mock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Response);
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);

    mock.mockClear();
  }

  for (const args of invalidMockArgs) {
    expect(mock).toHaveBeenCalledTimes(0);

    const response = await fetch(...args);

    expect(mock).toHaveBeenCalledTimes(0);
    expect(response).toBeInstanceOf(Response);
    expect(response.ok).toBe(false);
    expect(response.status).toBe(404);

    mock.mockClear();
  }
});

it('accepts headers', async () => {
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

it('accepts plain/text', async () => {
  const mock = mockEndpoint('foo', {
    method: 'POST',
    matcher: '/foo',
    response: { foo: 'bar' },
  });

  const mockArgs: Array<Parameters<typeof fetch>> = [
    ['http://locahost/foo', { method: 'POST', body: 'hello' }],
    [new Request('http://locahost/foo', { method: 'POST', body: 'hello' })],
    [
      new Request('http://locahost/foo', { method: 'POST', body: 'INVALID' }),
      { body: 'hello' },
    ],
  ];

  for (const args of mockArgs) {
    const response = await fetch(...args);

    expect(response.ok).toBe(true);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenLastCalledWith({ pathname: '/foo', body: 'hello' });
    expect(mock).toHaveLastReturnedWith({ foo: 'bar' });

    mock.mockClear();
  }
});

it('accepts application/json', async () => {
  const mock = mockEndpoint('foo', {
    method: 'POST',
    matcher: '/foo',
    response: { foo: 'bar' },
  });

  const mockArgs: Array<Parameters<typeof fetch>> = [
    [
      'http://locahost/foo',
      {
        method: 'POST',
        body: JSON.stringify({ foo: 'bar', bar: 'baz' }),
      },
    ],
    [
      new Request('http://locahost/foo', {
        method: 'POST',
        body: JSON.stringify({ foo: 'bar', bar: 'baz' }),
      }),
    ],
    [
      new Request('http://locahost/foo', {
        method: 'POST',
        body: JSON.stringify({ foo: 'baz' }),
      }),
      { body: JSON.stringify({ foo: 'bar', bar: 'baz' }) },
    ],
  ];

  for (const args of mockArgs) {
    const response = await fetch(...args);

    expect(response.ok).toBe(true);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenLastCalledWith({
      pathname: '/foo',
      body: { foo: 'bar', bar: 'baz' },
    });
    expect(mock).toHaveLastReturnedWith({ foo: 'bar' });

    mock.mockClear();
  }
});

it('accepts multipart/form-data', async () => {
  function makeFormData(values: Record<string, string>): FormData {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  const mock = mockEndpoint('foo', {
    method: 'POST',
    matcher: '/foo',
    response: { foo: 'bar' },
  });

  const mockArgs: Array<Parameters<typeof fetch>> = [
    [
      'http://locahost/foo',
      {
        method: 'POST',
        body: makeFormData({ foo: 'bar', bar: 'baz' }),
      },
    ],
    [
      new Request('http://locahost/foo', {
        method: 'POST',
        body: makeFormData({ foo: 'bar', bar: 'baz' }),
      }),
    ],
    [
      new Request('http://locahost/foo', {
        method: 'POST',
        body: makeFormData({ foo: 'bar', bar: 'baz' }),
      }),
      { body: makeFormData({ foo: 'bar', bar: 'baz' }) },
    ],
  ];

  for (const args of mockArgs) {
    const response = await fetch(...args);

    expect(response.ok).toBe(true);
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenLastCalledWith({
      pathname: '/foo',
      body: makeFormData({ foo: 'bar', bar: 'baz' }),
    });
    expect(mock).toHaveLastReturnedWith({ foo: 'bar' });

    mock.mockClear();
  }
});
