import { mockEndpoint } from '../mockEndpoint';
import { setupTestUtils } from '../setupTestUtils';

setupTestUtils();

test('basic', async () => {
  const mock = mockEndpoint('foo', {
    method: 'GET',
    matcher: 'path:/foo',
    response: { foo: 'bar' },
  });

  const expectedRequest = { pathname: '/foo', searchParams: { bar: 'baz' } };
  const expectedResponse = { foo: 'bar' };

  await fetch('http://locahost/foo?bar=baz');

  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenLastCalledWith(expectedRequest);
  expect(mock).toHaveLastReturnedWith(expectedResponse);

  await fetch(new Request('http://locahost/foo?bar=baz'));

  expect(mock).toHaveBeenCalledTimes(2);
  expect(mock).toHaveBeenLastCalledWith(expectedRequest);
  expect(mock).toHaveLastReturnedWith(expectedResponse);
});

test('json body', async () => {
  const mock = mockEndpoint('foo', {
    method: 'POST',
    matcher: 'path:/foo',
    response: { foo: 'bar' },
  });

  const expectedRequest = {
    pathname: '/foo',
    searchParams: {},
    body: { foo: 'bar', bar: 'baz' },
  };
  const expectedResponse = { foo: 'bar' };

  await fetch('http://locahost/foo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ foo: 'bar', bar: 'baz' }),
  });

  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenLastCalledWith(expectedRequest);
  expect(mock).toHaveLastReturnedWith(expectedResponse);

  await fetch(
    new Request('http://locahost/foo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ foo: 'bar', bar: 'baz' }),
    }),
  );

  expect(mock).toHaveBeenCalledTimes(2);
  expect(mock).toHaveBeenLastCalledWith(expectedRequest);
  expect(mock).toHaveLastReturnedWith(expectedResponse);

  await fetch(
    new Request('http://locahost/foo', {
      method: 'POST',
      body: JSON.stringify({ foo: 'baz' }),
      headers: { 'Content-Type': 'application/json' },
    }),
    { body: JSON.stringify({ foo: 'bar', bar: 'baz' }) },
  );

  expect(mock).toHaveBeenCalledTimes(3);
  expect(mock).toHaveBeenLastCalledWith(expectedRequest);
  expect(mock).toHaveLastReturnedWith(expectedResponse);
});

test.only('FormData body', async () => {
  function makeFormData(values: Record<string, string>): FormData {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  const mock = mockEndpoint('foo', {
    method: 'POST',
    matcher: 'path:/foo',
    response: { foo: 'bar' },
  });

  const expectedRequest = {
    pathname: '/foo',
    searchParams: {},
    body: makeFormData({ foo: 'bar', bar: 'baz' }),
  };
  const expectedResponse = { foo: 'bar' };

  // await fetch('http://locahost/foo', {
  //   method: 'POST',
  //   body: makeFormData({ foo: 'bar', bar: 'baz' }),
  // });
  //
  // expect(mock).toHaveBeenCalledTimes(1);
  // expect(mock).toHaveBeenLastCalledWith(expectedRequest);
  // expect(mock).toHaveLastReturnedWith(expectedResponse);

  await fetch(
    new Request('http://locahost/foo', {
      method: 'POST',
      // headers: { 'content-type': 'multipart/form-data' },
      body: makeFormData({ foo: 'bar', bar: 'baz' }),

    }),
  );

  // expect(mock).toHaveBeenCalledTimes(2);
  expect(mock).toHaveBeenLastCalledWith(expectedRequest);
  expect(mock).toHaveLastReturnedWith(expectedResponse);

  // await fetch(
  //   new Request('http://locahost/foo', {
  //     method: 'POST',
  //     body: makeFormData({ foo: 'bar', bar: 'baz' }),
  //   }),
  //   { body: makeFormData({ foo: 'bar', bar: 'baz' }) },
  // );
  //
  // expect(mock).toHaveBeenCalledTimes(3);
  // expect(mock).toHaveBeenLastCalledWith(expectedRequest);
  // expect(mock).toHaveLastReturnedWith(expectedResponse);
});
