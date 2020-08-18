import { Typography } from '@material-ui/core';
import { Meta } from '@storybook/react';
import React from 'react';

import { Button, Stack } from '..';
import { InfoCard } from './InfoCard';

export default { title: 'Surfaces/InfoCard', component: InfoCard } as Meta;

export const basic = () => (
  <InfoCard>
    <Stack space={2}>
      <Typography variant="h3">Title</Typography>
      <Typography>Content</Typography>

      <Button>Button</Button>
    </Stack>
  </InfoCard>
);

export const large = () => (
  <InfoCard size="large">
    <Stack space={2}>
      <Typography variant="h3">Title</Typography>
      <Typography>Content</Typography>

      <Button>Button</Button>
    </Stack>
  </InfoCard>
);
