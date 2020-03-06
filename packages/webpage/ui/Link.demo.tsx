import { Box, Link, Typography } from '@material-ui/core';
import { GridStack } from '@superdispatch/ui';
import React from 'react';

export default function LinkDemo() {
  return (
    <GridStack spacing={2}>
      <Typography>
        This is <Link href="#">link</Link> in text with another{' '}
        <Link component="button">button link</Link>.
      </Typography>

      <Box maxWidth={64}>
        <Link href="#">This is multi-line link</Link>
      </Box>

      <Box maxWidth={64}>
        <Link component="button">This is multi-line button link</Link>
      </Box>
    </GridStack>
  );
}
