import { Button, Tooltip } from '@material-ui/core';
import { PopperPlacementType } from '@material-ui/core/Popper';
import { boolean, text } from '@storybook/addon-knobs';
import { InlineGrid } from '@superdispatch/ui';
import { startCase } from 'lodash';
import React from 'react';

const placements: PopperPlacementType[] = [
  'bottom',
  'bottom-end',
  'bottom-start',
  'left',
  'left-end',
  'left-start',
  'right',
  'right-end',
  'right-start',
  'top',
  'top-end',
  'top-start',
];

export default function TooltipDemo() {
  const isOpen = boolean('Open', false);
  const title = text('Title', 'Tooltip');

  return (
    <InlineGrid spacing={2} justify="center">
      {placements.map(placement => (
        <Tooltip
          title={title}
          placement={placement}
          open={isOpen || undefined}
          key={`${title}-${isOpen}-${placement}`}
        >
          <Button>{startCase(placement)}</Button>
        </Tooltip>
      ))}
    </InlineGrid>
  );
}
