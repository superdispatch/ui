import { Card, CardContent, InputAdornment } from '@material-ui/core';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { DateField } from './DateField.playroom';

export default {
  title: 'Dates/DateField',
  parameters: {
    info: {
      propTables: [DateField],
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

export const Basic = makePlayroomStory(<DateField />, { wrapper: Wrapper });

export const Advanced = makePlayroomStory(
  <DateField
    label="Label"
    placeholder="Placeholder"
    helperText="Helper Text"
  />,
  { wrapper: Wrapper },
);

export const ErrorState = makePlayroomStory(
  <DateField
    label="Label"
    error={true}
    placeholder="Placeholder"
    helperText="Error Text"
  />,
  { wrapper: Wrapper },
);

export const Adornment = makePlayroomStory(
  <DateField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Start Adornment:</InputAdornment>
      ),
    }}
  />,
  { wrapper: Wrapper },
);

export const FullWidth = makePlayroomStory(<DateField fullWidth={true} />, {
  wrapper: Wrapper,
});

export const Disabled = makePlayroomStory(<DateField disabled={true} />, {
  wrapper: Wrapper,
});

export const EnableClearable = makePlayroomStory(
  <DateField enableClearable={true} />,
  { wrapper: Wrapper },
);

export const DisableCloseOnSelect = makePlayroomStory(
  <DateField disableCloseOnSelect={true} />,
  { wrapper: Wrapper },
);

export const CustomEmptyText = makePlayroomStory(
  <DateField emptyText="Never" enableClearable={true} />,
  { wrapper: Wrapper },
);
