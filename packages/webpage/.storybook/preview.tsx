import { addDecorator } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@superdispatch/ui';
import { Box } from '@material-ui/core';

addDecorator((Story, ctx) => (
  <ThemeProvider>
    <Box padding={2}>{<Story {...ctx} />}</Box>
  </ThemeProvider>
));
