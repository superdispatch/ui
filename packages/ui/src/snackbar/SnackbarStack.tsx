import { Box, Theme, useMediaQuery } from '@material-ui/core';
import React, {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { animated, useSpring, useTransition } from 'react-spring';

import { SnackbarContent, SnackbarVariant } from './SnackbarContent';

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
  addSnackbar: (message: ReactNode, options: SnackbarStackOptions) => void;
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
  style: CSSProperties;
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
    <animated.div style={style}>
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
  const [items, setItems] = useState<StackItemOptions[]>([]);
  const stack = useMemo(() => items.slice(isMobile ? -1 : -3), [items, isMobile]);

  const transitions = useTransition(stack, item => item.key, {
    from: { opacity: 0, height: 0, marginTop: 0 },
    enter: item =>
      ((next: any) => {
        const { node } = item;

        return next({ opacity: 1, height: !node ? 60 : node.offsetHeight, marginTop: 8 });
      }) as any,
    leave: { opacity: 0, height: 0, marginTop: 0 },
    config: { tension: 340 },
  });

  const marginBottom = useMemo(() => {
    const maxHeight = belowElements.reduce((acc, node) => Math.max(acc, node.offsetHeight), 0);

    return maxHeight === 0 ? 0 : maxHeight + 8;
  }, [belowElements]);
  const containerStyle = useSpring({ marginBottom });

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
      ) =>
        setItems(prev => {
          const item: StackItemOptions = {
            key,
            message,
            variant,
            hasCloseButton,
            autoHideDuration,
            onClose: reason => {
              setItems(prevState => prevState.filter(x => x !== item));

              if (onClose) {
                onClose(reason);
              }
            },
          };

          return [...prev, item];
        }),
    }),
    [],
  );

  return (
    <Context.Provider value={api}>
      {children}

      {transitions.length > 0 && (
        <Box
          flexDirection="column"
          style={containerStyle}
          component={animated.div}
          className="MuiSnackbar-root MuiSnackbar-anchorOriginBottomCenter"
        >
          {transitions.map(({ key, item, props: style }) => (
            <StackItem key={key} item={item} style={style} />
          ))}
        </Box>
      )}
    </Context.Provider>
  );
}
