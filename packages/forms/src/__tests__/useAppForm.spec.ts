import { act, renderHook } from '@testing-library/react-hooks';

import { AppFormikConfig, useAppFormik } from '../useAppFormik';

test('handle success action', async () => {
  const handleSubmit = jest.fn(() =>
    Promise.resolve({
      meta: { status: 200 },
    }),
  );
  const handleSuccess = jest.fn();

  const { result, waitForNextUpdate } = renderHook(() =>
    useAppFormik({
      initialValues: { foo: 'bar' },
      onSubmit: handleSubmit,
      onSubmitSuccess: handleSuccess,
    }),
  );

  await act(() => result.current.setFieldValue('foo', 'baz'));

  act(() => result.current.handleSubmit());

  await waitForNextUpdate();

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSuccess).toHaveBeenCalledTimes(1);
  expect(handleSuccess).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "meta": Object {
          "status": 200,
        },
      },
      Object {
        "foo": "baz",
      },
    ]
  `);
});

test('handle failure action', async () => {
  const getFormErrors = jest.fn(() => ({ foo: 'Failed' }));
  const handleSubmit = jest.fn(() =>
    Promise.reject({
      meta: { status: 500 },
    }),
  );
  const handleFailure = jest.fn();

  const { result, waitForNextUpdate } = renderHook(() =>
    useAppFormik({
      initialValues: { foo: 'bar' },
      getFormErrors,
      onSubmit: handleSubmit,
      onSubmitFailure: handleFailure,
    }),
  );
  expect(result.current.errors).toMatchInlineSnapshot(`Object {}`);

  await act(() => result.current.setFieldValue('foo', 'baz'));

  act(() => result.current.handleSubmit());

  await waitForNextUpdate();

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleFailure).toHaveBeenCalledTimes(1);
  expect(handleFailure).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
Array [
  Object {
    "meta": Object {
      "status": 500,
    },
  },
  Object {
    "foo": "baz",
  },
]
`);

  expect(getFormErrors).toHaveBeenCalledTimes(1);
  expect(getFormErrors).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
Array [
  Object {
    "meta": Object {
      "status": 500,
    },
  },
]
`);

  expect(result.current.errors).toMatchInlineSnapshot(`
    Object {
      "foo": "Failed",
    }
  `);
});

test('cancel handler when unmounted', async () => {
  const handleSubmit = jest.fn(() =>
    Promise.resolve({
      meta: { status: 200 },
    }),
  );
  const handleSuccess = jest.fn();

  const { result, unmount } = renderHook(() =>
    useAppFormik({
      initialValues: { foo: 'bar' },
      onSubmit: handleSubmit,
      onSubmitSuccess: handleSuccess,
    }),
  );

  act(() => result.current.handleSubmit());

  unmount();

  expect(handleSuccess).toHaveBeenCalledTimes(0);
});

test('reset form when key changes', async () => {
  const { result, rerender } = renderHook(
    (props: Partial<AppFormikConfig<{ foo: string }, void>>) =>
      useAppFormik({
        initialValues: { foo: 'bar' },
        onSubmit: jest.fn(),
        ...props,
      }),
  );

  await act(() => result.current.setFieldValue('foo', 'baz'));

  expect(result.current.values).toMatchInlineSnapshot(`
Object {
  "foo": "baz",
}
`);

  rerender({ key: 'rerender' });

  expect(result.current.values).toMatchInlineSnapshot(`
Object {
  "foo": "bar",
}
`);
});
