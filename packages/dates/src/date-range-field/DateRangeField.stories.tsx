import { InputAdornment } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { DateRangeField } from './DateRangeField.playroom';

export default {
  title: 'Dates/DateRangeField',
  component: DateRangeField,
} as Meta;

export const basic = () => <DateRangeField />;

export const advanced = () => (
  <DateRangeField
    label="Label"
    placeholder="Placeholder"
    helperText="Helper Text"
  />
);

export const errorState = () => (
  <DateRangeField
    label="Label"
    error={true}
    placeholder="Placeholder"
    helperText="Error Text"
  />
);

export const adornment = () => (
  <DateRangeField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">Start Adornment:</InputAdornment>
      ),
    }}
  />
);

export const fullWidth = () => <DateRangeField fullWidth={true} />;

export const disabled = () => <DateRangeField disabled={true} />;

export const enableClearable = () => <DateRangeField enableClearable={true} />;

export const disableCloseOnSelect = () => (
  <DateRangeField disableCloseOnSelect={true} />
);

export const customEmptyText = () => (
  <DateRangeField fallback="Never" enableClearable={true} />
);
