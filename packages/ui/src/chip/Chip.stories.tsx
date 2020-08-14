import { Chip } from '@material-ui/core';
import { PropsLink } from '@superdispatch/ui-docs';
import React from 'react';

import { Inline } from '..';

export default {
  title: 'Data Display/Chip',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/chip/#props" />
    ),
  },
};

export const examples = () => (
  <Inline>
    <Chip label="Basic" />
    <Chip label="Disabled" disabled={true} />
    <Chip label="Clickable" clickable={true} />
    <Chip label="Deletable" onDelete={() => alert('Delete!')} />
  </Inline>
);
