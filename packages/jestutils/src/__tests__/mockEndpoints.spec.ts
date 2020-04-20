import { mockEndpoints } from '../mockEndpoints';

it('creates dictionary of endpoints', async () => {
  const endpoints = mockEndpoints({
    foo: { matcher: '/', method: 'GET', response: {} },
    bar: { matcher: '/', method: 'POST', response: {} },
  });

  expect(endpoints.foo).toHaveBeenCalledTimes(0);

  await fetch('http://host/');

  expect(endpoints.foo).toHaveBeenCalledTimes(1);
  expect(endpoints.foo).toHaveBeenLastCalledWith({
    body: '',
    headers: {},
    params: {},
    pathname: '/',
    searchParams: {},
  });

  expect(endpoints.bar).toHaveBeenCalledTimes(0);

  await fetch('http://host/', { method: 'POST' });

  expect(endpoints.bar).toHaveBeenCalledTimes(1);
  expect(endpoints.bar).toHaveBeenLastCalledWith({
    body: '',
    headers: {},
    params: {},
    pathname: '/',
    searchParams: {},
  });
});

it('allows to pass default headers for all endpoints', async () => {
  const warn = jest.spyOn(console, 'warn').mockImplementation();
  const endpoints = mockEndpoints(
    {
      foo: { matcher: '/', method: 'GET', response: {} },
      bar: { matcher: '/', method: 'POST', response: {} },
    },
    {
      headers: { Foo: 'Bar' },
    },
  );

  expect(endpoints.foo).toHaveBeenCalledTimes(0);

  await fetch('http://host/');

  expect(endpoints.foo).toHaveBeenCalledTimes(0);

  await fetch('http://host/', { headers: { Foo: 'Bar' } });

  expect(endpoints.foo).toHaveBeenCalledTimes(1);
  expect(endpoints.foo).toHaveBeenLastCalledWith({
    body: '',
    headers: {},
    params: {},
    pathname: '/',
    searchParams: {},
  });

  expect(endpoints.bar).toHaveBeenCalledTimes(0);

  await fetch('http://host/', { method: 'POST' });

  expect(endpoints.bar).toHaveBeenCalledTimes(0);

  await fetch('http://host/', { method: 'POST', headers: { Foo: 'Bar' } });

  expect(endpoints.bar).toHaveBeenCalledTimes(1);
  expect(endpoints.bar).toHaveBeenLastCalledWith({
    body: '',
    headers: {},
    params: {},
    pathname: '/',
    searchParams: {},
  });

  warn.mockClear();
});
