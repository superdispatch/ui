import { Box, Fab } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { PhonesContextProvider } from '@superdispatch/phones';
import { ThemeProvider } from '@superdispatch/ui';
import { get } from 'lodash';
import React, { ReactNode } from 'react';

export interface CosmosDecoratorProps {
  children: ReactNode;
}

export default function CosmosDecorator({ children }: CosmosDecoratorProps) {
  const codeSandboxParameters = get(children, [
    'props',
    'children',
    'props',
    'Component',
    'codeSandboxParameters',
  ]);

  return (
    <ThemeProvider>
      <PhonesContextProvider>
        {codeSandboxParameters && (
          <Box position="fixed" top="8px" right="8px">
            <form
              method="POST"
              target="_blank"
              action="https://codesandbox.io/api/v1/sandboxes/define"
            >
              <input
                type="hidden"
                name="parameters"
                value={codeSandboxParameters}
              />

              <Fab color="primary" size="small" type="submit">
                <Edit fontSize="small" />
              </Fab>
            </form>
          </Box>
        )}

        <Box marginTop={5}>{children}</Box>
      </PhonesContextProvider>
    </ThemeProvider>
  );
}
