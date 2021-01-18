import { Link, Typography } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { Box } from '@superdispatch/ui-lab';

import { Stack } from '../stack/Stack';

export default { title: 'Navigation/Link' } as Meta;

export const basic = () => (
  <Typography>
    This is a{' '}
    <Link href="#" target="_blank">
      link
    </Link>{' '}
    in text with a <Link component="button">button link</Link>.
  </Typography>
);

export const multiline = () => (
  <Box maxWidth="64px">
    <Link href="#" target="_blank">
      This is multi-line link
    </Link>
  </Box>
);

export const multilineButton = () => (
  <Box maxWidth="64px">
    <Link component="button">This is multi-line button link</Link>
  </Box>
);

export const colors = () => (
  <Stack>
    <Link href="#" target="_blank" color="primary">
      Primary
    </Link>
    <Link href="#" target="_blank" color="textPrimary">
      Text Primary
    </Link>
  </Stack>
);
