import { Button, PopperPlacementType, Tooltip } from '@material-ui/core';
import { Stack } from '@superdispatch/ui';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import { startCase } from 'lodash';
import React from 'react';

export default { title: 'Data Display/Tooltip' };

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

export const Examples = makePlayroomStory(
  <Stack space={2} align="center">
    {placements.map((placement) => (
      <Tooltip title="Tooltip" key={placement} placement={placement}>
        <Button>{startCase(placement)}</Button>
      </Tooltip>
    ))}
  </Stack>,
);
