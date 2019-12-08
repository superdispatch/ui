import { Box } from '@material-ui/core';
import { PhoneField, PhoneNumber } from '@superdispatch/phones';
import React, { useState } from 'react';

export default function PhoneFieldDemo() {
  const [value, setValue] = useState<PhoneNumber>({ region: 'US' });

  return (
    <Box padding={2}>
      <PhoneField value={value} onChange={setValue} />
    </Box>
  );
}
