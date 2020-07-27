import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@superdispatch/ui';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { withPlayroom } from 'storybook-addon-playroom';
import { withInfo } from '@storybook/addon-info';

import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addParameters({
  info: {
    disable: true,
    styles: {
      infoStory: { padding: '16px' },
      infoBody: { padding: '16px', color: undefined, fontFamily: undefined },
      jsxInfoContent: { margin: undefined, borderTop: undefined },
      source: {
        h1: { fontSize: '24px', margin: '16px 0 0', borderBottom: undefined },
      },
      propTableHead: { margin: '8px 0 0 0' },
    },
  },

  docs: {
    container: DocsContainer,
    page: DocsPage,
  },

  playroom: {
    disabled: true,
    // Because Playroom is built inside Storybook on this example's deploy,
    // we must define the absolute path to it when NODE_ENV is production,
    // otherwise set undefined to use the default Playroom URL (localhost)
    url: process.env.NODE_ENV === 'production' ? '/playroom/' : undefined,
  },
});

addDecorator(withInfo); // before any other decorators
addDecorator(withA11y);
addDecorator(withKnobs);
addDecorator(withPlayroom);
addDecorator((story) => <ThemeProvider>{story()}</ThemeProvider>);
