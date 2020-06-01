import { Button, PopperPlacementType, Tooltip } from '@material-ui/core';
import { boolean, text } from '@storybook/addon-knobs';
import { Inline } from '@superdispatch/ui';
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
    <Inline space={2} horizontalAlign="center">
      {placements.map((placement) => (
        <Tooltip
          title={title}
          placement={placement}
          open={isOpen || undefined}
          key={`${title}-${placement}-${String(isOpen)}`}
        >
          <Button>{startCase(placement)}</Button>
        </Tooltip>
      ))}
    </Inline>
  );
}
