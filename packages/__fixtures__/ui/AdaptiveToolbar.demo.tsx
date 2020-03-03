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
            {
              key: 'send_offer',
              label: 'Send Offer',
              onClick: () => {
                addSnackbar('Send Offer');
              },
            },
            {
              key: 'post_to_slb',
              label: 'Post to SLB',
              onClick: () => {
                addSnackbar('Post to SLB');
              },
            },
            {
              key: 'change_date_ranges',
              label: 'Change Date Ranges',
              onClick: () => {
                addSnackbar('Change Date Ranges');
              },
            },
            {
              key: 'increase_price_by',
              label: 'Increase Price By',
              onClick: () => {
                addSnackbar('Increase Price By');
              },
            },
            {
              key: 'mark_as_accepted',
              label: 'Mark as Accepted',
              onClick: () => {
                addSnackbar('Mark as Accepted');
              },
            },
            {
              key: 'send_customer_invoice',
              label: 'Send Customer Invoice',
              onClick: () => {
                addSnackbar('Send Customer Invoice');
              },
            },
            {
              key: 'archive',
              label: 'Archive',
              onClick: () => {
                addSnackbar('Archive');
              },
            },
            {
              key: 'delete',
              label: 'Delete',
              onClick: () => {
                addSnackbar('Delete');
              },
            },
          ]}
        />
      </AppBar>
    </GridStack>
  );
}
