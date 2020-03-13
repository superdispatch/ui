import { mockEndpoints } from '../mockEndpoints';
import { setupTestUtils } from '../setupTestUtils';

setupTestUtils();

it('creates dictionary of endpoints', async () => {
  const endpoints = mockEndpoints({
    foo: { matcher: '/', method: 'GET', response: {} },
    bar: { matcher: '/', method: 'POST', response: {} },
  });

  expect(endpoints.foo).toHaveBeenCalledTimes(0);

  await fetch('http://host/');

  expect(endpoints.foo).toHaveBeenCalledTimes(1);
  expect(endpoints.foo).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "body": "",
        "headers": Object {},
        "params": Object {},
        "pathname": "/",
        "searchParams": Object {},
      },
    ]
  `);

  expect(endpoints.bar).toHaveBeenCalledTimes(0);

  await fetch('http://host/', { method: 'POST' });

  expect(endpoints.bar).toHaveBeenCalledTimes(1);
  expect(endpoints.bar).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "body": "",
        "headers": Object {},
        "params": Object {},
        "pathname": "/",
        "searchParams": Object {},
      },
    ]
  `);
});

it('allows to pass default headers for all endpoints', async () => {
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
  expect(endpoints.foo).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "body": "",
        "headers": Object {},
        "params": Object {},
        "pathname": "/",
        "searchParams": Object {},
      },
    ]
  `);

  expect(endpoints.bar).toHaveBeenCalledTimes(0);

  await fetch('http://host/', { method: 'POST' });

  expect(endpoints.bar).toHaveBeenCalledTimes(0);

  await fetch('http://host/', { method: 'POST', headers: { Foo: 'Bar' } });

  expect(endpoints.bar).toHaveBeenCalledTimes(1);
  expect(endpoints.bar).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
Array [
  Object {
    "body": "",
    "headers": Object {},
    "params": Object {},
    "pathname": "/",
    "searchParams": Object {},
  },
]
`);
});
