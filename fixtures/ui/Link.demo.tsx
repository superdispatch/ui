import { Box, Grid, Link, Typography } from '@material-ui/core';
import React from 'react';

export default function LinkDemo() {
  return (
    <Box padding={2}>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <Typography>
            This is <Link href="#">link</Link> in text with another{' '}
            <Link component="button">button link</Link> contained inside of
            text.
          </Typography>
        </Grid>

        <Grid item={true} xs={12}>
          <Box maxWidth={64}>
            <Link href="#">This is multi-line link</Link>
          </Box>
        </Grid>

        <Grid item={true} xs={12}>
          <Box maxWidth={64}>
            <Link component="button">This is multi-line button link</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
