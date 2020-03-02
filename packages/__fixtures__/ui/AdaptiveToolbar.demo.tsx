import { AppBar, Box, Slider, Typography } from '@material-ui/core';
import { AdaptiveToolbar, GridStack, InlineGrid } from '@superdispatch/ui';
import React, { useState } from 'react';

export function AdaptiveToolbarDemo() {
  const [width, setWidth] = useState(320);
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
            { key: 'Send Offer', label: 'Send Offer' },
            { key: 'Post o SLB', label: 'Post o SLB' },
            { key: 'Change Date Ranges', label: 'Change Date Ranges' },
            { key: 'Increase Price By', label: 'Increase Price By' },
            { key: 'Mark as Accepted', label: 'Mark as Accepted' },
            { key: 'Send Customer Invoice', label: 'Send Customer Invoice' },
            { key: 'Archive', label: 'Archive' },
            { key: 'Delete', label: 'Delete' },
          ]}
        />
      </AppBar>
    </GridStack>
  );
}
