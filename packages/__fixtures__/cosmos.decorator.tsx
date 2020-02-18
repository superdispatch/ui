import { Box, CircularProgress, Fab } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { ThemeProvider } from '@superdispatch/ui';
import ky from 'ky';
import { get } from 'lodash';
import React, { ReactNode } from 'react';
import { usePromise } from 'utility-hooks';

export interface CosmosDecoratorProps {
  children: ReactNode;
}

export default function CosmosDecorator({ children }: CosmosDecoratorProps) {
  const csbParams = get(children, [
    'props',
    'children',
    'props',
    'Component',
    'csbParams',
  ]);

  const sandbox = usePromise<{ sandbox_id: string }>(
    ({ abortSignal }) =>
      ky('https://codesandbox.io/api/v1/sandboxes/define', {
        signal: abortSignal,
        searchParams: { json: 1, parameters: csbParams },
      }).json(),
    [csbParams],
    { skip: !csbParams },
  );

  return (
    <ThemeProvider>
      {!!csbParams && (
        <Box position="fixed" top="8px" right="8px">
          {sandbox.status === 'fulfilled' ? (
            <Fab
              size="small"
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://codesandbox.io/s/${sandbox.value.sandbox_id}?module=demo.tsx`}
            >
              <Edit fontSize="small" />
            </Fab>
          ) : (
            <Fab size="small" color="primary">
              <CircularProgress size={24} color="inherit" />{' '}
            </Fab>
          )}
        </Box>
      )}

      <Box marginTop={5} padding={2}>
        {children}
      </Box>
    </ThemeProvider>
  );
}
