import { Avatar } from '@material-ui/core';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

export default { title: 'Data Display/Avatar' };

export const Basic = makePlayroomStory(<Avatar />);
export const Text = makePlayroomStory(<Avatar>A1</Avatar>);
export const Image = makePlayroomStory(
  <Avatar src="https://source.unsplash.com/featured/?avatar" />,
);
