import React from 'react';
import { storiesOf } from '@storybook/react';
import { SuperButton } from './SuperButton';
import { SuperThemeProvider } from '..';
import { Box } from '@material-ui/core';

storiesOf('ui', module)
  .addDecorator(story => <SuperThemeProvider>{story()}</SuperThemeProvider>)
  .add('SuperButton', () => (
    <Box padding={2}>
      <Box margin={1}>
        <SuperButton>Default</SuperButton> <SuperButton disabled={true}>Default</SuperButton>
      </Box>

      <Box margin={1}>
        <SuperButton color="primary">Primary</SuperButton>{' '}
        <SuperButton color="primary" disabled={true}>
          Primary
        </SuperButton>
      </Box>
    </Box>
  ));
