import { Box } from '@material-ui/core';
import { PhoneField, PhoneFieldValue } from '@superdispatch/phones';
import React, { useState } from 'react';

export default function PhoneFieldDemo() {
  const [value, setValue] = useState<PhoneFieldValue>({ region: 'US' });

  return (
    <Box padding={2}>
      <PhoneField value={value} onChange={setValue} />
    </Box>
  );
}
