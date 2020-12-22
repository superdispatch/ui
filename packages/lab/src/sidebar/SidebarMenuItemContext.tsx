import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

export interface SidebarMenuItemContext {
  hovered?: boolean;
  disabled?: boolean;
}

const context = createContext<SidebarMenuItemContext>({});

export function useSidebarMenuItemContext(): SidebarMenuItemContext {
  return useContext(context);
}

export interface SidebarMenuItemContextProviderProps
  extends SidebarMenuItemContext {
  children?: ReactNode;
}

export function SidebarMenuItemContextProvider({
  children,
  hovered = false,
  disabled = false,
}: SidebarMenuItemContextProviderProps): ReactElement {
  const ctx = useMemo(() => ({ hovered, disabled }), [hovered, disabled]);

  return <context.Provider value={ctx}>{children}</context.Provider>;
}
