import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@superdispatch/ui';
import { withKnobs } from '@storybook/addon-knobs';
import { withPlayroom } from 'storybook-addon-playroom';

addDecorator(withKnobs);
addDecorator(withPlayroom);
addDecorator((story) => (
  <ThemeProvider injectFirst={false}>{story()}</ThemeProvider>
));

addParameters({
  docs: {
    // page: DocsPage,
    // container: DocsContainer,
  },

  playroom: {
    // Because Playroom is built inside Storybook on this example's deploy,
    // we must define the absolute path to it when NODE_ENV is production,
    // otherwise set undefined to use the default Playroom URL (localhost)
    url: process.env.NODE_ENV === 'production' ? '/playroom/' : undefined,
    reactElementToJSXStringOptions: { showFunctions: true },
  },
});
