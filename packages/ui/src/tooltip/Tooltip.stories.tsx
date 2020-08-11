import { Button, Tooltip } from '@material-ui/core';
import { PropsLink } from '@superdispatch/ui-docs';
import React from 'react';

import { Inline } from '../inline/Inline';

export default {
  title: 'Data Display/Tooltip',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/tooltip/#props" />
    ),
  },
};

export const basic = () => (
  <Inline>
    <Tooltip title="Default">
      <Button>Default</Button>
    </Tooltip>

    <Tooltip title="Left" placement="left">
      <Button>Left</Button>
    </Tooltip>

    <Tooltip title="Top" placement="top">
      <Button>Top</Button>
    </Tooltip>

    <Tooltip title="Right" placement="right">
      <Button>Right</Button>
    </Tooltip>
  </Inline>
);
