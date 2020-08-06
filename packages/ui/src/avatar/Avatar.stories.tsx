import { Avatar } from '@material-ui/core';
import { PropsLink } from '@superdispatch/ui-docs';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

export default {
  title: 'Data Display/Avatar',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/avatar/#props" />
    ),
  },
};

export const basic = makePlayroomStory(<Avatar />);
export const text = makePlayroomStory(<Avatar>A1</Avatar>);
export const image = makePlayroomStory(
  <Avatar src="https://source.unsplash.com/featured/?avatar" />,
);
