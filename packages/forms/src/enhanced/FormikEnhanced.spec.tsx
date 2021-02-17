import { Deferred } from '@superdispatch/ui-testutils';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { renderProvider } from '../__testutils__/renderProvider';
import { FormikEnhancedConfig, useFormikEnhanced } from './useFormikEnhanced';

describe('FormsProvider', () => {
  test('default configs', async () => {
    const getFormErrors = jest.fn((errorResponse) => errorResponse.fieldErrors);
    const wrapper = renderProvider(
      { getFormErrors },
      {
        initialValues: { foo: '' },
        onSubmit: () =>
          Promise.reject({ fieldErrors: { name: 'Name is Required.' } }),
      },
    );

    userEvent.click(wrapper.getByText('Submit'));

    await wrapper.findByText('Name is Required.');

    expect(getFormErrors).toHaveBeenCalledTimes(1);
    expect(getFormErrors).toHaveBeenLastCalledWith({
      fieldErrors: { name: 'Name is Required.' },
    });
  });

  test('form config overrides default config', async () => {
    const defaultGetFormErrors = jest.fn(
      (errorResponse) => errorResponse.fieldErrors,
    );
    const getFormErrors = jest.fn((errorResponse) => errorResponse.fieldErrors);
    const wrapper = renderProvider(
      { getFormErrors: defaultGetFormErrors },
      {
        initialValues: { foo: '' },
        getFormErrors,
        onSubmit: () =>
          Promise.reject({ fieldErrors: { name: 'Name is Required.' } }),
      },
    );

    userEvent.click(wrapper.getByText('Submit'));

    await wrapper.findByText('Name is Required.');

    expect(getFormErrors).toHaveBeenCalledTimes(1);
    expect(defaultGetFormErrors).toHaveBeenCalledTimes(0);

    expect(getFormErrors).toHaveBeenLastCalledWith({
      fieldErrors: { name: 'Name is Required.' },
    });
  });
});

describe('useFormikEnhanced', () => {
  test('handle success action', async () => {
    const handleSubmit = jest.fn(() =>
      Promise.resolve({ meta: { status: 200 } }),
    );
    const handleSuccess = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useFormikEnhanced({
        initialValues: { foo: 'bar' },
        onSubmit: handleSubmit,
        onSubmitSuccess: handleSuccess,
      }),
    );

    act(() => {
      result.current.setFieldValue('foo', 'baz');
    });

    act(() => {
      result.current.handleSubmit();
    });

    await waitForNextUpdate();

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSuccess).toHaveBeenCalledTimes(1);
    expect(handleSuccess).toHaveBeenLastCalledWith(
      { meta: { status: 200 } },
      { foo: 'baz' },
    );
  });

  test('onSubmitFailure', async () => {
    const getFormErrors = jest.fn((response) => response.data);
    const onSubmit = jest.fn(() => Promise.reject({ data: { foo: 'Failed' } }));
    const onSubmitFailure = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useFormikEnhanced({
        initialValues: { foo: 'bar' },
        getFormErrors,
        onSubmit,
        onSubmitFailure,
      }),
    );

    expect(result.current.errors).toEqual({});

    act(() => {
      result.current.setFieldValue('foo', 'baz');
    });

    act(() => {
      result.current.handleSubmit();
    });

    await waitForNextUpdate();

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmitFailure).toHaveBeenCalledTimes(1);
    expect(onSubmitFailure).toHaveBeenLastCalledWith(
      { data: { foo: 'Failed' } },
      { foo: 'baz' },
    );

    expect(getFormErrors).toHaveBeenCalledTimes(1);
    expect(getFormErrors).toHaveBeenLastCalledWith({ data: { foo: 'Failed' } });

    expect(result.current.errors).toEqual({ foo: 'Failed' });
  });

  test('onSubmitSuccess', async () => {
    const deferred = new Deferred();
    const onSubmit = jest.fn(() => deferred.promise);
    const onSubmitSuccess = jest.fn();

    const { result, unmount, waitFor } = renderHook(() =>
      useFormikEnhanced({
        onSubmit,
        onSubmitSuccess,
        initialValues: { foo: 'bar' },
      }),
    );

    act(() => {
      result.current.handleSubmit();
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    await act(async () => {
      await deferred.resolve({ meta: { code: 200 } });
    });

    expect(onSubmitSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.status).toEqual({
      type: 'submitted',
      payload: { meta: { code: 200 } },
    });

    deferred.reset();

    act(() => {
      result.current.handleSubmit();
    });

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(2);
    });

    unmount();

    await act(async () => {
      await deferred.resolve({ meta: { code: 200 } });
    });

    expect(onSubmitSuccess).toHaveBeenCalledTimes(1);
  });

  test('key', () => {
    const { result, rerender, unmount } = renderHook(
      (props: Partial<FormikEnhancedConfig<{ foo: string }, void>>) =>
        useFormikEnhanced({
          initialValues: { foo: 'bar' },
          onSubmit: jest.fn(),
          ...props,
        }),
    );

    act(() => {
      result.current.setFieldValue('foo', 'baz');
    });

    expect(result.current.dirty).toBe(true);
    expect(result.current.values).toEqual({ foo: 'baz' });

    rerender({ key: Math.random() });

    expect(result.current.dirty).toBe(false);
    expect(result.current.values).toEqual({ foo: 'bar' });

    unmount();
  });
});
