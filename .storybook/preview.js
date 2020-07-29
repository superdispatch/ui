import { addDecorator, addParameters } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@superdispatch/ui';
import { withKnobs } from '@storybook/addon-knobs';
import { withPlayroom } from 'storybook-addon-playroom';
import Box from '@material-ui/core/Box';

addParameters({
  playroom: {
    disabled: true,
    // Because Playroom is built inside Storybook on this example's deploy,
    // we must define the absolute path to it when NODE_ENV is production,
    // otherwise set undefined to use the default Playroom URL (localhost)
    url: process.env.NODE_ENV === 'production' ? '/playroom/' : undefined,
  },
});

addDecorator(withKnobs);
addDecorator(withPlayroom);
addDecorator((story) => (
  <ThemeProvider>
    <Box padding={2}>{story()}</Box>
  </ThemeProvider>
));

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
