import { Meta } from '@storybook/react';
import React from 'react';

import { AdaptiveToolbar } from './AdaptiveToolbar';

export default {
  title: 'Surfaces/AdaptiveToolbar',
  component: AdaptiveToolbar,
} as Meta;

export const basic = () => (
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
    ].map((label) => ({ label, key: label }))}
  />
);
