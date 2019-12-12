import { Box, FormControlLabel, Switch } from '@material-ui/core';
import React, { useState } from 'react';

export default function SwitchDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <Box padding={2}>
      <FormControlLabel
        label="Controlled"
        control={
          <Switch checked={checked} onChange={(_, next) => setChecked(next)} />
        }
      />

      <FormControlLabel label="Checked" control={<Switch checked={true} />} />

      <FormControlLabel
        label="Unchecked"
        control={<Switch checked={false} />}
      />

      <FormControlLabel
        label="Disabled Checked"
        control={<Switch disabled={true} checked={true} />}
      />

      <FormControlLabel
        label="Disabled Unchecked"
        control={<Switch disabled={true} checked={false} />}
      />
    </Box>
  );
}
