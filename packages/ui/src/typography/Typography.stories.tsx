import { Typography } from '@material-ui/core';
import { PropsLink } from '@superdispatch/ui-docs';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
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

export const basic = makePlayroomStory(
  <Stack>
    <Typography variant="h1">h1</Typography>
    <Typography variant="h2">h2</Typography>
    <Typography variant="h3">h3</Typography>
    <Typography variant="h4">h4</Typography>
    <Typography variant="h5">h5</Typography>
    <Typography variant="h6">h6</Typography>
    <Typography variant="subtitle1">subtitle1</Typography>
    <Typography variant="subtitle2">subtitle2</Typography>
    <Typography variant="body1">body1</Typography>
    <Typography variant="body2">body2</Typography>
  </Stack>,
);

export const secondary = makePlayroomStory(
  <Stack>
    <Typography variant="h1" color="textSecondary">
      h1
    </Typography>
    <Typography variant="h2" color="textSecondary">
      h2
    </Typography>
    <Typography variant="h3" color="textSecondary">
      h3
    </Typography>
    <Typography variant="h4" color="textSecondary">
      h4
    </Typography>
    <Typography variant="h5" color="textSecondary">
      h5
    </Typography>
    <Typography variant="h6" color="textSecondary">
      h6
    </Typography>
    <Typography variant="subtitle1" color="textSecondary">
      subtitle1
    </Typography>
    <Typography variant="subtitle2" color="textSecondary">
      subtitle2
    </Typography>
    <Typography variant="body1" color="textSecondary">
      body1
    </Typography>
    <Typography variant="body2" color="textSecondary">
      body2
    </Typography>
  </Stack>,
);

export const primary = makePlayroomStory(
  <Stack>
    <Typography variant="h1" color="textPrimary">
      h1
    </Typography>
    <Typography variant="h2" color="textPrimary">
      h2
    </Typography>
    <Typography variant="h3" color="textPrimary">
      h3
    </Typography>
    <Typography variant="h4" color="textPrimary">
      h4
    </Typography>
    <Typography variant="h5" color="textPrimary">
      h5
    </Typography>
    <Typography variant="h6" color="textPrimary">
      h6
    </Typography>
    <Typography variant="subtitle1" color="textPrimary">
      subtitle1
    </Typography>
    <Typography variant="subtitle2" color="textPrimary">
      subtitle2
    </Typography>
    <Typography variant="body1" color="textPrimary">
      body1
    </Typography>
    <Typography variant="body2" color="textPrimary">
      body2
    </Typography>
  </Stack>,
);

export const error = makePlayroomStory(
  <Stack>
    <Typography variant="h1" color="error">
      h1
    </Typography>
    <Typography variant="h2" color="error">
      h2
    </Typography>
    <Typography variant="h3" color="error">
      h3
    </Typography>
    <Typography variant="h4" color="error">
      h4
    </Typography>
    <Typography variant="h5" color="error">
      h5
    </Typography>
    <Typography variant="h6" color="error">
      h6
    </Typography>
    <Typography variant="subtitle1" color="error">
      subtitle1
    </Typography>
    <Typography variant="subtitle2" color="error">
      subtitle2
    </Typography>
    <Typography variant="body1" color="error">
      body1
    </Typography>
    <Typography variant="body2" color="error">
      body2
    </Typography>
  </Stack>,
);
