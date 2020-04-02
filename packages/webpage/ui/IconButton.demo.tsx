import { IconButton } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { Check } from '@material-ui/icons';
import { select } from '@storybook/addon-knobs';
import { InlineGrid } from '@superdispatch/ui';
import React from 'react';

const sizes: Array<IconButtonProps['size']> = ['small', 'medium'];

export default function IconButtonDemo() {
  const state = select(
    'State',
    { Stale: 'stale', Disabled: 'disabled' },
    'stale',
  );

  const color = select(
    'Color',
    { Default: 'default', Primary: 'primary', Inherit: 'inherit' },
    'default',
  );

  return (
    <InlineGrid spacing={2}>
      {sizes.map((size) => (
        <IconButton
          key={size}
          size={size}
          color={color}
          disabled={state === 'disabled'}
        >
          <Check />
        </IconButton>
      ))}
    </InlineGrid>
  );
}
