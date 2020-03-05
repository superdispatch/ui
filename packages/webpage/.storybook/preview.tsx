import { addDecorator } from '@storybook/react';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from '@superdispatch/ui';
import { Box, Fab, CircularProgress } from '@material-ui/core';
import { StoryContext } from '@storybook/addons';
import { get } from 'lodash';
import { usePromise } from 'utility-hooks';
import ky from 'ky';
import { Edit } from '@material-ui/icons';

function ThemeDecorator({ children, ...ctx }: PropsWithChildren<StoryContext>) {
  const Component = ctx.hooks?.mountedDecorators?.values().next().value;
  const csbParams = get(Component, 'csbParams');
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

      <Box padding={2} marginTop={5}>
        {children}
      </Box>
    </ThemeProvider>
  );
}

addDecorator((Story, ctx) => (
  <ThemeDecorator {...ctx}>
    <Story {...ctx} />
  </ThemeDecorator>
));
