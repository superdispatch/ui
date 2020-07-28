import { Chip } from '@material-ui/core';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

export default { title: 'Data Display/Chip' };

export const Basic = makePlayroomStory(<Chip label="Chip" />);
export const Disabled = makePlayroomStory(
  <Chip label="Chip" disabled={true} />,
);
export const Clickable = makePlayroomStory(
  <Chip label="Chip" clickable={true} />,
);
export const Deletable = makePlayroomStory(
  <Chip
    label="Chip"
    onDelete={() => {
      // eslint-disable-next-line no-alert
      alert('Delete!');
    }}
  />,
);
