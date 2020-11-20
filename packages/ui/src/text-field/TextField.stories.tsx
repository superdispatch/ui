import { InputAdornment, MenuItem, TextField } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { PropsLink } from '@superdispatch/ui-docs';

export default {
  title: 'Inputs/TextField',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/avatar/#props" />
    ),
  },
};

export const basic = () => <TextField label="Label" helperText="Helper Text" />;
export const error = () => (
  <TextField label="Label" helperText="Error Text" error={true} />
);

export const multiline = () => <TextField multiline={true} />;
export const fullWidth = () => <TextField fullWidth={true} />;
export const disabled = () => <TextField disabled={true} />;
export const startAdornment = () => (
  <TextField
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <AccountCircleIcon color="action" />
        </InputAdornment>
      ),
    }}
  />
);
export const endAdornment = () => (
  <TextField
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <AccountCircleIcon color="action" />
        </InputAdornment>
      ),
    }}
  />
);
export const select = () => (
  <TextField select={true}>
    <MenuItem value={1}>Option 1</MenuItem>
    <MenuItem value={2}>Option 2</MenuItem>
    <MenuItem value={3}>Option 3</MenuItem>
  </TextField>
);
