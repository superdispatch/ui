import { Chip } from '@material-ui/core';
import { PropsLink } from '@superdispatch/ui-docs';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

export default {
  title: 'Data Display/Chip',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/chip/#props" />
    ),
  },
};

export const Basic = makePlayroomStory(<Chip label="Chip" />);
export const Disabled = makePlayroomStory(
  <Chip label="Chip" disabled={true} />,
);
export const Clickable = makePlayroomStory(
  <Chip label="Chip" clickable={true} />,
);
export const Deletable = makePlayroomStory(
  <Chip label="Chip" onDelete={() => alert('Delete!')} />,
);
