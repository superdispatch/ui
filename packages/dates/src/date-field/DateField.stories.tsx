import { InputAdornment } from '@material-ui/core';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { DateField } from './DateField.playroom';

export default { title: 'Dates/DateField', component: DateField };

export const basic = makePlayroomStory(<DateField />);

export const advanced = makePlayroomStory(
  <DateField
    label="Label"
    placeholder="Placeholder"
    helperText="Helper Text"
  />,
);

export const errorState = makePlayroomStory(
  <DateField
    label="Label"
    error={true}
    placeholder="Placeholder"
    helperText="Error Text"
  />,
);

export const adornment = makePlayroomStory(
  <DateField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Start Adornment:</InputAdornment>
      ),
    }}
  />,
);

export const fullWidth = makePlayroomStory(<DateField fullWidth={true} />);

export const disabled = makePlayroomStory(<DateField disabled={true} />);

export const enableClearable = makePlayroomStory(
  <DateField enableClearable={true} />,
);

export const disableCloseOnSelect = makePlayroomStory(
  <DateField disableCloseOnSelect={true} />,
);

export const customEmptyText = makePlayroomStory(
  <DateField emptyText="Never" enableClearable={true} />,
);
