import { Meta } from '@storybook/react';
import { Box } from '@superdispatch/ui-lab';
import { OverflowText } from './OverflowText';

export default {
  title: 'Data Display/OverflowText',
  component: OverflowText,
  decorators: [
    (Story) => (
      <Box maxWidth="200px">
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const basic = () => (
  <OverflowText>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </OverflowText>
);

export const customTooltip = () => (
  <OverflowText
    TooltipProps={{
      title:
        'Sed felis libero, interdum sit amet congue et, pretium vel massa.',
    }}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </OverflowText>
);
