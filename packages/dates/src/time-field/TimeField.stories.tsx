import { Card, CardContent, InputAdornment } from '@material-ui/core';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { TimeField } from './TimeField.playroom';

export default {
  title: 'Dates/TimeField',
  parameters: {
    info: {
      propTables: [TimeField],
    },
  },
};

function Wrapper({ children }: PlayroomStoryWrapperProps) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export const Basic = makePlayroomStory(<TimeField />, { wrapper: Wrapper });

export const Advanced = makePlayroomStory(
  <TimeField
    label="Label"
    placeholder="Placeholder"
    helperText="Helper Text"
  />,
  { wrapper: Wrapper },
);

export const ErrorState = makePlayroomStory(
  <TimeField
    label="Label"
    error={true}
    placeholder="Placeholder"
    helperText="Error Text"
  />,
  { wrapper: Wrapper },
);

export const Adornment = makePlayroomStory(
  <TimeField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Start Adornment:</InputAdornment>
      ),
    }}
  />,
  { wrapper: Wrapper },
);

export const Disabled = makePlayroomStory(<TimeField disabled={true} />, {
  wrapper: Wrapper,
});
