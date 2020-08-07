import { Typography, TypographyProps } from '@material-ui/core';
import { PropsLink } from '@superdispatch/ui-docs';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import { startCase } from 'lodash';
import React from 'react';

import { Stack } from '..';

export default {
  title: 'Data Display/Typography',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/typography/#props" />
    ),
  },
};

const variants: Array<TypographyProps['variant']> = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
];

export const Basic = makePlayroomStory(
  <Stack space={2}>
    <Stack space={1}>
      {variants.map((variant) => (
        <Typography key={variant} variant={variant}>
          {startCase(variant)}
        </Typography>
      ))}
    </Stack>
  </Stack>,
);

export const Secondary = makePlayroomStory(
  <Stack space={2}>
    <Stack space={1}>
      {variants.map((variant) => (
        <Typography key={variant} variant={variant} color="textSecondary">
          {startCase(variant)}
        </Typography>
      ))}
    </Stack>
  </Stack>,
);

export const Primary = makePlayroomStory(
  <Stack space={2}>
    <Stack space={1}>
      {variants.map((variant) => (
        <Typography key={variant} variant={variant} color="primary">
          {startCase(variant)}
        </Typography>
      ))}
    </Stack>
  </Stack>,
);

export const Error = makePlayroomStory(
  <Stack space={2}>
    <Stack space={1}>
      {variants.map((variant) => (
        <Typography key={variant} variant={variant} color="error">
          {startCase(variant)}
        </Typography>
      ))}
    </Stack>
  </Stack>,
);
