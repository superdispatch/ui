import { Box } from '@material-ui/core';
import { PhoneField } from '@superdispatch/phones';
import React from 'react';

export default function PhoneFieldDemo() {
  return (
    <Box padding={2}>
      <PhoneField value="" />
    </Box>
  );
}
