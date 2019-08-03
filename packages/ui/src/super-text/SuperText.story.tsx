import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Typography } from '@material-ui/core';
import { SuperText } from './SuperText';
import { SuperThemeProvider } from '..';

storiesOf('ui', module)
  .addDecorator(story => <SuperThemeProvider>{story()}</SuperThemeProvider>)
  .add(
    'SuperText',
    () => (
      <Box padding={2} maxWidth={500} margin="0 auto">
        <SuperText variant="Header1" component="h2" gutterBottom={true}>
          Header1. Heading
        </SuperText>
        <SuperText variant="Header2" gutterBottom={true}>
          Header2. Heading
        </SuperText>
        <SuperText variant="Header3" gutterBottom={true}>
          Header3. Heading
        </SuperText>
        <SuperText variant="Header4" gutterBottom={true}>
          Header4. Heading
        </SuperText>
        <SuperText variant="Header5" gutterBottom={true}>
          Header5. Heading
        </SuperText>
        <SuperText variant="Header6" gutterBottom={true}>
          Header6. Heading
        </SuperText>
        <SuperText variant="Body" gutterBottom={true}>
          Body. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </SuperText>

        <SuperText variant="BodySemibold" gutterBottom={true}>
          BodySemibold. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </SuperText>
      </Box>
    ),
    {
      info: {
        propTablesExclude: [Box, Typography, SuperThemeProvider],
      },
    },
  );
