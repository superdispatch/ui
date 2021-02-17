import { useDeepEqualMemo } from '@superdispatch/hooks';
import {
  ConsumerProps,
  createContext,
  Key,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Snackbar, SnackbarProps } from './Snackbar';

export interface SnackbarStackOptions
  extends Omit<SnackbarProps, 'open' | 'children'> {
  key?: Key;
}

export interface SnackbarStack {
  clearStack: () => void;
  addSnackbar: (
    message: ReactNode,
    options?: SnackbarStackOptions,
  ) => () => void;
}

function warnContext(): void {
  // eslint-disable-next-line no-console
  console.log('`useSnackbarStack` is used outside of `SnackbarStackProvider`.');
}

const Context = createContext<SnackbarStack>({
  clearStack: warnContext,
  addSnackbar: () => {
    warnContext();

    return warnContext;
  },
});

export function useSnackbarStack(): SnackbarStack {
  return useContext(Context);
}

export function SnackbarStackConsumer({
  children,
}: ConsumerProps<SnackbarStack>): ReactElement {
  return <Context.Consumer>{children}</Context.Consumer>;
}

const TRANSIENT_KEY = '@@transient@@';

export interface SnackbarStackProviderProps {
  children: ReactNode;
}

export function SnackbarStackProvider({
  children,
}: SnackbarStackProviderProps): ReactElement {
  const [stack, setStack] = useState(new Map<Key, SnackbarProps>());
  const transientKeyRef = useRef(0);
  const getNextTransientKey = useCallback(
    () => TRANSIENT_KEY + String((transientKeyRef.current += 1)),
    [],
  );

  const clearStack = useCallback<SnackbarStack['clearStack']>(() => {
    setStack((x) => (x.size === 0 ? x : new Map()));
  }, []);

  const addSnackbar = useCallback<SnackbarStack['addSnackbar']>(
    (
      message,
      {
        onClose,
        variant,
        key = variant !== 'error'
          ? // We don't want non error snackbars without key to pop back.
            getNextTransientKey()
          : typeof message === 'string'
          ? message
          : Math.random(),
        id = String(key),
        autoHideDuration = 5000,
        ...props
      }: SnackbarStackOptions = {},
    ) => {
      function removeSnackbar(): void {
        setStack((prev) => {
          if (prev.has(key)) {
            const next = new Map(prev);

            next.delete(key);

            return next;
          }

          return prev;
        });
      }

      setStack((prev) => {
        const next = new Map(prev);

        for (const prevKey of prev.keys()) {
          // Ensure that we insert value to the end of the map.
          if (Object.is(key, prevKey)) {
            next.delete(key);
          }

          // Ensure that transient snackbar will not pop back.
          if (typeof prevKey == 'string' && prevKey.startsWith(TRANSIENT_KEY)) {
            next.delete(prevKey);
          }
        }

        return next.set(key, {
          ...props,
          id,
          key,
          variant,
          autoHideDuration,
          children: message,

          onClose: (reason) => {
            removeSnackbar();
            onClose?.(reason);
          },
        });
      });

      return removeSnackbar;
    },
    [getNextTransientKey],
  );

  const snackbarProps = useDeepEqualMemo<SnackbarProps>(
    (prev) => {
      const next = Array.from(stack.values()).pop();

      return next ? { ...next, open: true } : { ...prev, open: false };
    },
    [stack],
  );

  const api = useMemo<SnackbarStack>(() => ({ clearStack, addSnackbar }), [
    clearStack,
    addSnackbar,
  ]);

  return (
    <Context.Provider value={api}>
      {children}

      <Snackbar {...snackbarProps} />
    </Context.Provider>
  );
}
