import { IconButton, IconButtonProps } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { select } from '@storybook/addon-knobs';
import { Inline } from '@superdispatch/ui';
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
    <Inline space={2}>
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
    </Inline>
  );
}
