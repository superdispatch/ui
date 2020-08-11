import { Avatar, AvatarProps } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { PropsLink } from '@superdispatch/ui-docs';
import React from 'react';

const images = [
  'https://source.unsplash.com/256x256/?dog',
  'https://source.unsplash.com/256x256/?cat',
  'https://source.unsplash.com/256x256/?face',
  'https://source.unsplash.com/256x256/?nature',
];

export default {
  title: 'Data Display/Avatar',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/avatar/#props" />
    ),
  },

  decorators: [
    (Story) => (
      <>
        <Story />

        {images.map((src) => (
          <img hidden={true} key={src} alt={src} src={src} />
        ))}
      </>
    ),
  ],

  argTypes: {
    children: {
      table: { type: { summary: 'ReactNode' } },
      control: { type: 'text' },
    },

    src: {
      table: { type: { summary: 'string' } },
      control: {
        type: 'select',
        options: [undefined, ...images],
      },
    },
  },
} as Meta;

export const basic = (props: AvatarProps) => <Avatar {...props} />;

basic.args = { children: 'A1' };
