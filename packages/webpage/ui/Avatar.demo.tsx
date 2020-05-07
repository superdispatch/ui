import { Avatar } from '@material-ui/core';
import { Inline } from '@superdispatch/ui';
import React from 'react';

export default function AvatarDemo() {
  return (
    <Inline space={1}>
      <Avatar>MM</Avatar>
      <Avatar src="https://source.unsplash.com/featured/?avatar" />
    </Inline>
  );
}
