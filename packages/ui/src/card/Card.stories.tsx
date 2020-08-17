import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { PropsLink } from '@superdispatch/ui-docs';
import React from 'react';

export default {
  title: 'Surfaces/Card',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/card/#props" />
    ),
  },
} as Meta;

export const basic = () => (
  <Box maxWidth={280}>
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom={true}>
          Word of the Day
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom={true}>
          be•nev•o•lent
        </Typography>

        <Typography color="textSecondary" gutterBottom={true}>
          adjective
        </Typography>

        <Typography component="p" gutterBottom={true}>
          well meaning and kindly.
          <br />
          ”a benevolent smile”
        </Typography>
      </CardContent>
    </Card>
  </Box>
);
