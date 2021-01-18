import 'fontsource-inter/400.css';
import 'fontsource-inter/500.css';
import 'fontsource-inter/600.css';
import 'fontsource-inter/700.css';

import { addDecorator, addParameters } from '@storybook/react';
import React, { Suspense } from 'react';
import { ThemeProvider } from '@superdispatch/ui';
import { withPlayroom } from 'storybook-addon-playroom';
import { DocsContainer } from '@storybook/addon-docs/blocks';

injectDisplayNames(require('@material-ui/lab'));
injectDisplayNames(require('@material-ui/core'));
injectDisplayNames(require('@material-ui/icons'), { suffix: 'Icon' });

function injectDisplayNames(module, { suffix = '' } = {}) {
  for (const [key, value] of Object.entries(module)) {
    if (
      key[0] === key[0].toUpperCase() &&
      (typeof value == 'object' || typeof value == 'function')
    ) {
      value.displayName = key + suffix;
    }
  }
}

addDecorator(withPlayroom);
addDecorator((story) => (
  <Suspense fallback="Loading story…">
    <ThemeProvider injectFirst={false}>{story()}</ThemeProvider>
  </Suspense>
));

function SuperDispatchDocsContainer(props) {
  return (
    <ThemeProvider injectFirst={false}>
      <DocsContainer {...props} />
    </ThemeProvider>
  );
}

addParameters({
  docs: { container: SuperDispatchDocsContainer },

  playroom: {
    // Because Playroom is built inside Storybook on this example's deploy,
    // we must define the absolute path to it when NODE_ENV is production,
    // otherwise set undefined to use the default Playroom URL (localhost)
    url: process.env.NODE_ENV === 'production' ? '/playroom/' : undefined,
    reactElementToJSXStringOptions: { showFunctions: true },
  },
});
