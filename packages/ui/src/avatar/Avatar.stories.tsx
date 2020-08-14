import { Avatar } from '@material-ui/core';
import { PropsLink } from '@superdispatch/ui-docs';
import React from 'react';

export default {
  title: 'Data Display/Avatar',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/avatar/#props" />
    ),
  },
};

export const basic = () => <Avatar />;
export const text = () => <Avatar>A1</Avatar>;
export const image = () => (
  <Avatar src="https://source.unsplash.com/featured/?face" />
);
