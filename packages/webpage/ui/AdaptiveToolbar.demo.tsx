import { AppBar, Box, Slider, Typography } from '@material-ui/core';
import {
  AdaptiveToolbar,
  Inline,
  Stack,
  useSnackbarStack,
} from '@superdispatch/ui';
import React, { useState } from 'react';

export default function AdaptiveToolbarDemo() {
  const [width, setWidth] = useState(400);
  const { addSnackbar } = useSnackbarStack();

  return (
    <Stack space={1}>
      <Inline space={2}>
        <Box minWidth={200}>
          <Typography>Width ({width}px)</Typography>

          <Slider
            step={10}
            min={320}
            max={1200}
            value={width}
            onChange={(_, value) => setWidth(value as number)}
          />
        </Box>
      </Inline>

      <AppBar style={{ maxWidth: width }}>
        <AdaptiveToolbar
          items={[
            'Send Offer',
            'Post to SLB',
            'Change Date Ranges',
            'Increase Price By',
            'Mark as Accepted',
            'Send Customer Invoice',
            'Archive',
            'Delete',
          ].map((label) => ({
            label,
            key: label,
            onClick: () => addSnackbar(label),
          }))}
        />
      </AppBar>
    </Stack>
  );
}
