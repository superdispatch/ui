import { Box, Grid, TextField, Typography } from '@material-ui/core';
import { PhoneText } from '@superdispatch/phones';
import React, { useState } from 'react';

export default function PhoneTextDemo() {
  const [phone, setPhone] = useState('+1 (201) 555-0123');
  const [fallback, setFallback] = useState('Invalid Phone Number');

  return (
    <Box padding={2}>
      <Grid container={true} spacing={2}>
        <Grid item={true}>
          <TextField
            label="Raw"
            value={phone}
            onChange={event => setPhone(event.target.value)}
          />
        </Grid>

        <Grid item={true}>
          <TextField
            label="Fallback Text"
            value={fallback}
            onChange={event => setFallback(event.target.value)}
          />
        </Grid>

        <Grid item={true} xs={12}>
          <PhoneText
            phone={phone}
            fallback={<Typography color="error">{fallback}</Typography>}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
