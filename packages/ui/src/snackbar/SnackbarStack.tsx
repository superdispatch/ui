import { Portal, Snackbar as MaterialSnackbar, Theme, useMediaQuery } from '@material-ui/core';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { animated, AnimatedProps, useSpring, useTransition } from 'react-spring';

import { SnackbarContent, SnackbarVariant } from './SnackbarContent';
import { SnackbarClassNames } from './SnackbarStyles';

const SNACKBAR_OFFSET = 8;

export interface SnackbarStackOptions {
  key?: number | string;
  variant?: SnackbarVariant;
  hasCloseButton?: boolean;
  autoHideDuration?: number;
  onClose?: (reason: 'explicit' | 'timeout') => void;
}

interface StackItemOptions extends Required<SnackbarStackOptions> {
  message: ReactNode;
  node?: HTMLDivElement;
}

export interface SnackbarStack {
  addBelowElement: (node: HTMLElement) => void;
  removeBelowElement: (node: HTMLElement) => void;
  addSnackbar: (message: ReactNode, options: SnackbarStackOptions) => () => void;
}

const Context = createContext<undefined | SnackbarStack>(undefined);

export function useSnackbarStack(): SnackbarStack {
  const ctx = useContext(Context);

  if (!ctx) {
    throw new Error('`useSnackbarStack` is used outside of `SnackbarStackProvider`.');
  }

  return ctx;
}

interface StackItemProps {
  item: StackItemOptions;
  style: AnimatedProps<object>;
}

function StackItem({ item, style }: StackItemProps) {
  const { variant, message, onClose, hasCloseButton, autoHideDuration } = item;

  useEffect(() => {
    if (!autoHideDuration) {
      return;
    }

    const timeout = setTimeout(() => onClose('timeout'), autoHideDuration);

    return () => clearTimeout(timeout);
  }, [onClose, autoHideDuration]);

  return (
    <animated.div style={style} className={SnackbarClassNames.StackItem}>
      <SnackbarContent
        ref={node => {
          if (node) {
            item.node = node as HTMLDivElement;
          }
        }}
        variant={variant}
        onClose={!hasCloseButton ? undefined : () => onClose('explicit')}
      >
        {message}
      </SnackbarContent>
    </animated.div>
  );
}

export interface SnackbarStackProviderProps {
  children: ReactNode;
}

export function SnackbarStackProvider({ children }: SnackbarStackProviderProps) {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const [belowElements, setBelowElements] = useState<HTMLElement[]>([]);
  const maxBelowElementHeight = useMemo(
    () => belowElements.reduce((acc, node) => Math.max(acc, node.offsetHeight), 0),
    [belowElements],
  );

  const [items, setItems] = useState<StackItemOptions[]>([]);
  const stack = useMemo(() => items.slice(isMobile ? -1 : -3), [items, isMobile]);

  const transitions = useTransition(stack, item => `${item.key}-${isMobile}`, {
    config: { tension: 340 },
    from: { opacity: 0, height: 0, marginTop: 0 },
    enter: item => next => {
      const { node } = item;

      return Promise.resolve(
        next({
          opacity: 1,
          marginTop: SNACKBAR_OFFSET,
          height: !node ? 60 : node.offsetHeight,
        }),
      );
    },
    leave: { opacity: 0, height: 0, marginTop: 0 },
  });

  const containerStyle = useSpring({
    config: { tension: 340 },
    to: {
      marginBottom: maxBelowElementHeight === 0 ? 0 : maxBelowElementHeight + SNACKBAR_OFFSET,
    },
  });

  const api = useMemo(
    (): SnackbarStack => ({
      addBelowElement: node =>
        setBelowElements(prev => (prev.includes(node) ? prev : [...prev, node])),
      removeBelowElement: node =>
        setBelowElements(prev => (!prev.includes(node) ? prev : prev.filter(x => x !== node))),
      addSnackbar: (
        message,
        {
          onClose,
          variant = 'default',
          key = Math.random(),
          hasCloseButton = true,
          autoHideDuration = 5000,
        },
      ) => {
        const item: StackItemOptions = {
          key,
          message,
          variant,
          hasCloseButton,
          autoHideDuration,
          onClose: reason => {
            closeSnackbar();

            if (onClose) {
              onClose(reason);
            }
          },
        };

        setItems(prevItems => [...prevItems, item]);

        function closeSnackbar() {
          setItems(prevItems =>
            !prevItems.includes(item) ? prevItems : prevItems.filter(prev => prev !== item),
          );
        }

        return closeSnackbar;
      },
    }),
    [],
  );

  return (
    <Context.Provider value={api}>
      {children}

      {transitions.length > 0 && (
        <Portal>
          <MaterialSnackbar open={true}>
            <animated.div style={containerStyle} className={SnackbarClassNames.StackContainer}>
              {transitions.map(({ key, item, props: style }) => (
                <StackItem key={key} item={item} style={style} />
              ))}
            </animated.div>
          </MaterialSnackbar>
        </Portal>
      )}
    </Context.Provider>
  );
}
