import { Link, Typography } from '@material-ui/core';
import { select } from '@storybook/addon-knobs';
import { Stack } from '@superdispatch/ui';
import React, { MouseEvent } from 'react';

function preventDefault(event: MouseEvent) {
  event.preventDefault();
}

export default function LinkDemo() {
  const color = select(
    'Color',
    {
      Primary: 'primary',
      Secondary: 'secondary',
      'Text Primary': 'textPrimary',
      'Text Secondary': 'textSecondary',
      Error: 'error',
    },
    'textPrimary',
  );

  return (
    <Stack space={2}>
      <Typography>
        This is{' '}
        <Link color={color} href="#" onClick={preventDefault}>
          link
        </Link>{' '}
        in text with another{' '}
        <Link color={color} component="button">
          button link
        </Link>
        .
      </Typography>

      <div style={{ maxWidth: 64 }}>
        <Link href="#" color={color} onClick={preventDefault}>
          This is multi-line link
        </Link>
      </div>

      <div style={{ maxWidth: 64 }}>
        <Link color={color} component="button">
          This is multi-line button link
        </Link>
      </div>
    </Stack>
  );
}
