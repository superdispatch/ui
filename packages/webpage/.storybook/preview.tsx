import { addDecorator } from '@storybook/react';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from '@superdispatch/ui';
import { Box, Fab } from '@material-ui/core';
import { StoryContext } from '@storybook/addons';
import { get } from 'lodash';
import { usePromise } from 'utility-hooks';
import { Edit } from '@material-ui/icons';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);
addDecorator(withA11y);

addDecorator((Story, ctx) => (
  <ThemeDecorator {...ctx}>
    <Story {...ctx} />
  </ThemeDecorator>
));

function ThemeDecorator({ children, ...ctx }: PropsWithChildren<StoryContext>) {
  const Component = ctx.hooks?.mountedDecorators?.values().next().value;
  const pr = get(Component, 'pr');
  const branch = get(Component, 'branch');
  const filename = get(Component, 'filename');
  const prCSB = usePromise(
    async ({ abortSignal }) => {
      const response = await fetch(
        `https://gh.csb.dev/api/superdispatch/ui/prs/${pr}/builds`,
        { signal: abortSignal },
      );
      const data: {
        builds: Array<{
          status?: string;
          sandboxes?: Array<{ url: string }>;
        }>;
      } = await response.json();
      const lastBuild = data.builds.find(build => build.status === 'succeeded');

      return lastBuild?.sandboxes?.[0].url;
    },
    [],
    { skip: !pr },
  );

  const branchCSB = !branch
    ? undefined
    : `https://codesandbox.io/s/github/superdispatch/ui/tree/${branch}/packages/webpage`;

  const csbURL = pr ? prCSB.value : branchCSB;

  const csbParams = new URLSearchParams({
    module: filename,
    hidenavigation: '1',
    initialpath: `/iframe.html?id=${ctx.id}`,
  });

  return (
    <ThemeProvider>
      {!!csbURL && (
        <Box position="fixed" top="8px" right="8px">
          <Fab
            size="small"
            color="primary"
            target="_blank"
            rel="noopener noreferrer"
            href={`${csbURL}?${csbParams.toString()}`}
          >
            <Edit fontSize="small" />
          </Fab>
        </Box>
      )}

      <Box padding={2} marginTop={!csbURL ? 0 : 5}>
        {children}
      </Box>
    </ThemeProvider>
  );
}
