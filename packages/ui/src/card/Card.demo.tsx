import { Box, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';

export function CardDemo() {
  return (
    <Box padding={2} marginX="auto" maxWidth="280px">
      <Card>
        <CardContent>
          <Typography color="textSecondary" variant="body2" gutterBottom={true}>
            Word of the Day
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom={true}>
            be•nev•o•lent
          </Typography>

          <Typography color="textSecondary" variant="body2" gutterBottom={true}>
            adjective
          </Typography>

          <Typography variant="body2" component="p" gutterBottom={true}>
            well meaning and kindly.
            <br />
            ”a benevolent smile”
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
