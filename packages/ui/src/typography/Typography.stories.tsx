import {
  Card,
  CardContent,
  Typography,
  TypographyProps,
} from '@material-ui/core';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import { startCase } from 'lodash';
import React from 'react';

import { Stack } from '..';

export default { title: 'Data Display/Typography' };

function Wrapper({ children }: PlayroomStoryWrapperProps) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

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
  { wrapper: Wrapper },
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
  { wrapper: Wrapper },
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
  { wrapper: Wrapper },
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
  { wrapper: Wrapper },
);
