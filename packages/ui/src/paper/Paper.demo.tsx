import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';

export default function PaperDemo() {
  return (
    <Box padding={2}>
      <Paper>
        <Box padding={2}>
          <Typography variant="h2">This is a sheet of paper.</Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
