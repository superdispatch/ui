import { AppBar, Box, Slider, Typography } from '@material-ui/core';
import {
  AdaptiveToolbar,
  GridStack,
  InlineGrid,
  useSnackbarStack,
} from '@superdispatch/ui';
import React, { useState } from 'react';

export function AdaptiveToolbarDemo() {
  const [width, setWidth] = useState(400);
  const { addSnackbar } = useSnackbarStack();

  return (
    <GridStack>
      <InlineGrid spacing={2} wrap="nowrap">
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
      </InlineGrid>

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
          ].map(label => ({
            label,
            key: label,
            onClick: () => addSnackbar(label),
          }))}
        />
      </AppBar>
    </GridStack>
  );
}
