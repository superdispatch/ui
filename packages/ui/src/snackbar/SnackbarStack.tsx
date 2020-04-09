import React, {
  createContext,
  Key,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
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

const warnContext = () =>
  // eslint-disable-next-line no-console
  console.log('`useSnackbarStack` is used outside of `SnackbarStackProvider`.');

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

export interface SnackbarStackProviderProps {
  children: ReactNode;
}

export function SnackbarStackProvider({
  children,
}: SnackbarStackProviderProps) {
  const [stack, setStack] = useState(new Map<Key, SnackbarProps>());

  const clearStack = useCallback<SnackbarStack['clearStack']>(
    () => setStack((x) => (x.size === 0 ? x : new Map())),
    [],
  );

  const removeSnackbar = useCallback((key: Key) => {
    setStack((prev) => {
      if (!prev.has(key)) {
        return prev;
      }

      const next = new Map(prev);

      next.delete(key);

      return next;
    });
  }, []);

  const addSnackbar = useCallback<SnackbarStack['addSnackbar']>(
    (
      message,
      {
        onClose,
        key = Math.random(),
        id = String(key),
        autoHideDuration = 5000,
        ...props
      }: SnackbarStackOptions = {},
    ) => {
      setStack((prev) => {
        const next = new Map(prev);

        if (next.has(key)) {
          next.delete(key);
        }

        return next.set(key, {
          ...props,
          id,
          key,
          autoHideDuration,
          children: message,
          onClose: (reason) => {
            onClose?.(reason);
            removeSnackbar(key);
          },
        });
      });

      return () => {
        removeSnackbar(key);
      };
    },
    [removeSnackbar],
  );

  const api = useMemo<SnackbarStack>(() => ({ clearStack, addSnackbar }), [
    clearStack,
    addSnackbar,
  ]);

  const snackbarProps = useMemo<SnackbarProps>(() => {
    const props = Array.from(stack.values()).pop();

    return !props ? { open: false } : { ...props, open: true };
  }, [stack]);

  return (
    <Context.Provider value={api}>
      {children}

      <Snackbar {...snackbarProps} />
    </Context.Provider>
  );
}
