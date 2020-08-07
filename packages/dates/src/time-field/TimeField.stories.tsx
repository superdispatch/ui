import { InputAdornment } from '@material-ui/core';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { TimeField } from './TimeField.playroom';

export default { title: 'Dates/TimeField', component: TimeField };

export const basic = makePlayroomStory(<TimeField />);

export const advanced = makePlayroomStory(
  <TimeField
    label="Label"
    placeholder="Placeholder"
    helperText="Helper Text"
  />,
);

export const errorState = makePlayroomStory(
  <TimeField
    label="Label"
    error={true}
    placeholder="Placeholder"
    helperText="Error Text"
  />,
);

export const adornment = makePlayroomStory(
  <TimeField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Start Adornment:</InputAdornment>
      ),
    }}
  />,
);

export const disabled = makePlayroomStory(<TimeField disabled={true} />);
