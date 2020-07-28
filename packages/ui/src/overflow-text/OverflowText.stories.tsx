import { Box, Card, CardContent } from '@material-ui/core';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { OverflowText } from './OverflowText';

export default { title: 'Data Display/OverflowText' };

function Wrapper({ children }: PlayroomStoryWrapperProps) {
  return (
    <Box maxWidth={200}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
}

export const Basic = makePlayroomStory(
  <OverflowText>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </OverflowText>,
  { wrapper: Wrapper },
);

export const CustomTooltip = makePlayroomStory(
  <OverflowText
    TooltipProps={{
      title:
        'Sed felis libero, interdum sit amet congue et, pretium vel massa.',
    }}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </OverflowText>,
  { wrapper: Wrapper },
);
