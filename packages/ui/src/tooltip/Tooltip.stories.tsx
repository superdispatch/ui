import { Box, Button, Tooltip } from '@material-ui/core';
import { PropsLink } from '@superdispatch/ui-docs';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
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

function Wrapper({ children }: PlayroomStoryWrapperProps) {
  return <Box>{children}</Box>;
}

export const basic = makePlayroomStory(
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
  </Inline>,
  { wrapper: Wrapper },
);
