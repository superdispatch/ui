import { Meta } from '@storybook/react';
import { Box } from './Box';

export default { title: 'Lab/Box', component: Box } as Meta;

export const basic = () => (
  <Box
    display="inline-block"
    borderWidth="small"
    borderTopRightRadius="small"
    borderBottomRightRadius="small"
    borderColor={['Blue200', 'Green200', 'Purple200']}
    borderLeftWidth="large"
    borderLeftColor={['Blue300', 'Green300', 'Purple300']}
    padding={['large', 'medium', 'small']}
    backgroundColor={['Blue50', 'Green50', 'Purple50']}
  >
    Hey
  </Box>
);
