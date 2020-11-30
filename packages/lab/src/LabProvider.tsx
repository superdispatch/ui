import { useTheme } from '@material-ui/core';
import { SuperDispatchTheme } from '@superdispatch/ui';
import { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

export interface LabProviderProps {
  children?: ReactNode;
}

export function LabProvider({ children }: LabProviderProps): ReactElement {
  const theme = useTheme<SuperDispatchTheme>();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
