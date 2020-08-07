import { InputAdornment } from '@material-ui/core';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { DateRangeField } from './DateRangeField.playroom';

export default { title: 'Dates/DateRangeField', component: DateRangeField };

export const basic = makePlayroomStory(<DateRangeField />);

export const advanced = makePlayroomStory(
  <DateRangeField
    label="Label"
    placeholder="Placeholder"
    helperText="Helper Text"
  />,
);

export const errorState = makePlayroomStory(
  <DateRangeField
    label="Label"
    error={true}
    placeholder="Placeholder"
    helperText="Error Text"
  />,
);

export const adornment = makePlayroomStory(
  <DateRangeField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Start Adornment:</InputAdornment>
      ),
    }}
  />,
);

export const fullWidth = makePlayroomStory(<DateRangeField fullWidth={true} />);

export const disabled = makePlayroomStory(<DateRangeField disabled={true} />);

export const enableClearable = makePlayroomStory(
  <DateRangeField enableClearable={true} />,
);

export const disableCloseOnSelect = makePlayroomStory(
  <DateRangeField disableCloseOnSelect={true} />,
);

export const customEmptyText = makePlayroomStory(
  <DateRangeField emptyText="Never" enableClearable={true} />,
);
