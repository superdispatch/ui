import { addDecorator, addParameters } from '@storybook/react';
import React, { Suspense } from 'react';
import { ThemeProvider } from '@superdispatch/ui';
import { withPlayroom } from 'storybook-addon-playroom';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { LabProvider } from '@superdispatch/ui-lab';

injectDisplayNames(require('@material-ui/lab'));
injectDisplayNames(require('@material-ui/core'));
injectDisplayNames(require('@material-ui/icons'), { suffix: 'Icon' });

function injectDisplayNames(module, { suffix = '' } = {}) {
  for (const [key, value] of Object.entries(module)) {
    if (
      key[0] === key[0].toUpperCase() &&
      (typeof value == 'object' || typeof value == 'function')
    ) {
      value.displayName = `${key}${suffix}`;
    }
  }
}

addDecorator(withPlayroom);
addDecorator((story) => (
  <Suspense fallback="Loading…">
    <ThemeProvider injectFirst={false}>
      <LabProvider>{story()}</LabProvider>
    </ThemeProvider>
  </Suspense>
));

function SuperDispatchDocsContainer(props) {
  return (
    <ThemeProvider injectFirst={false}>
      <LabProvider>
        <DocsContainer {...props} />
      </LabProvider>
    </ThemeProvider>
  );
}

addParameters({
  loki: { skip: true },

  docs: { container: SuperDispatchDocsContainer },

  playroom: {
    // Because Playroom is built inside Storybook on this example's deploy,
    // we must define the absolute path to it when NODE_ENV is production,
    // otherwise set undefined to use the default Playroom URL (localhost)
    url: process.env.NODE_ENV === 'production' ? '/playroom/' : undefined,
    reactElementToJSXStringOptions: { showFunctions: true },
  },
});
