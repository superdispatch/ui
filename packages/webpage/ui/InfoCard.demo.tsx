import { Typography } from '@material-ui/core';
import { select } from '@storybook/addon-knobs';
import { Button, InfoCard, Stack } from '@superdispatch/ui';
import React from 'react';

export default function InfoCardDemo() {
  const size = select('Size', { Medium: 'medium', Large: 'large' }, 'medium');

  return (
    <InfoCard size={size}>
      <Stack space={2}>
        <Typography variant="h3">Title</Typography>
        <Typography>Content</Typography>

        <Button>Button</Button>
      </Stack>
    </InfoCard>
  );
}
