import { Card, CardContent, InputAdornment } from '@material-ui/core';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { DateRangeField } from './DateRangeField.playroom';

export default {
  title: 'Dates/DateRangeField',
  parameters: {
    info: {
      propTables: [DateRangeField],
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

export const Basic = makePlayroomStory(<DateRangeField />, {
  wrapper: Wrapper,
});

export const Advanced = makePlayroomStory(
  <DateRangeField
    label="Label"
    placeholder="Placeholder"
    helperText="Helper Text"
  />,
  { wrapper: Wrapper },
);

export const ErrorState = makePlayroomStory(
  <DateRangeField
    label="Label"
    error={true}
    placeholder="Placeholder"
    helperText="Error Text"
  />,
  { wrapper: Wrapper },
);

export const Adorment = makePlayroomStory(
  <DateRangeField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Start Adorment:</InputAdornment>
      ),
    }}
  />,
  { wrapper: Wrapper },
);

export const FullWidth = makePlayroomStory(
  <DateRangeField fullWidth={true} />,
  {
    wrapper: Wrapper,
  },
);

export const Disabled = makePlayroomStory(<DateRangeField disabled={true} />, {
  wrapper: Wrapper,
});

export const EnableClearable = makePlayroomStory(
  <DateRangeField enableClearable={true} />,
  { wrapper: Wrapper },
);

export const DisableCloseOnSelect = makePlayroomStory(
  <DateRangeField disableCloseOnSelect={true} />,
  { wrapper: Wrapper },
);

export const CustomEmptyText = makePlayroomStory(
  <DateRangeField emptyText="Never" enableClearable={true} />,
  { wrapper: Wrapper },
);
