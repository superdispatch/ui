import React, { ReactNode } from 'react';

import { ThemeProvider } from '../packages/ui/src/theme/ThemeProvider';

export interface CosmosDecoratorProps {
  children: ReactNode;
}

export default function CosmosDecorator({ children }: CosmosDecoratorProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
