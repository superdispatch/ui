import { Box } from '@material-ui/core';
import { Meta } from '@storybook/react';
import React from 'react';

import { OverflowText } from './OverflowText';

export default {
  title: 'Data Display/OverflowText',
  component: OverflowText,
  decorators: [
    (Story) => (
      <Box maxWidth={200}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Basic = () => (
  <OverflowText>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </OverflowText>
);

export const CustomTooltip = () => (
  <OverflowText
    TooltipProps={{
      title:
        'Sed felis libero, interdum sit amet congue et, pretium vel massa.',
    }}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </OverflowText>
);
