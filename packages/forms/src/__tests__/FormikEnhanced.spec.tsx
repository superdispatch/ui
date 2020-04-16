import { MockEvent } from '@superdispatch/testutils';
import { waitFor } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { renderProvider } from '../__testutils__/renderProvider';
import { FormikEnhancedConfig, useFormikEnhanced } from '../useFormikEnhanced';

describe('AppFormikProvider', () => {
  test('default configs', async () => {
    const getFormErrors = jest.fn((errorResponse) => errorResponse.fieldErrors);
    const wrapper = await renderProvider(
      { getFormErrors },
      {
        initialValues: { foo: '' },
        onSubmit: () =>
          Promise.reject({ fieldErrors: { name: 'Name is Required.' } }),
      },
    );

    MockEvent.click(wrapper.getByText('Submit'));

    await waitFor(() => {
      expect(wrapper.getByText('Name is Required.')).toBeInTheDocument();
    });

    expect(getFormErrors).toHaveBeenCalledTimes(1);
    expect(getFormErrors).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "fieldErrors": Object {
          "name": "Name is Required.",
        },
      },
    ]
  `);
  });

  test('form config overrides default config', async () => {
    const defaultGetFormErrors = jest.fn(
      (errorResponse) => errorResponse.fieldErrors,
    );
    const getFormErrors = jest.fn((errorResponse) => errorResponse.fieldErrors);
    const wrapper = await renderProvider(
      { getFormErrors: defaultGetFormErrors },
      {
        initialValues: { foo: '' },
        getFormErrors,
        onSubmit: () =>
          Promise.reject({ fieldErrors: { name: 'Name is Required.' } }),
      },
    );

    MockEvent.click(wrapper.getByText('Submit'));

    await waitFor(() => {
      expect(wrapper.getByText('Name is Required.')).toBeInTheDocument();
    });

    expect(getFormErrors).toHaveBeenCalledTimes(1);
    expect(defaultGetFormErrors).toHaveBeenCalledTimes(0);

    expect(getFormErrors).toHaveBeenLastCalledWithMatchingInlineSnapshot(`
    Array [
      Object {
        "fieldErrors": Object {
          "name": "Name is Required.",
        },
      },
    ]
  `);
  });
});

describe('useAppFormik', () => {
  test('handle success action', async () => {
    const handleSubmit = jest.fn(() =>
      Promise.resolve({
        meta: { status: 200 },
      }),
    );
    const handleSuccess = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useFormikEnhanced({
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
      useFormikEnhanced({
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
      useFormikEnhanced({
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
      (props: Partial<FormikEnhancedConfig<{ foo: string }, void>>) =>
        useFormikEnhanced({
          initialValues: { foo: 'bar' },
          onSubmit: jest.fn(),
          ...props,
        }),
    );

    await act(async () => {
      await result.current.setFieldValue('foo', 'baz');
    });

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
});
