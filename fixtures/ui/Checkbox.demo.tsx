import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  Switch,
  TextField,
} from '@material-ui/core';
import React from 'react';

export default function CheckboxDemo() {
  return (
    <Box padding={2}>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <FormControl>
            <FormLabel>Label Position</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel label="Right Label" control={<Checkbox />} />

              <FormControlLabel
                label="Left Label"
                labelPlacement="start"
                control={<Checkbox />}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <FormControl>
            <FormLabel>Readonly</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel
                checked={true}
                label="On"
                control={<Checkbox />}
              />

              <FormControlLabel
                checked={false}
                label="Off"
                control={<Checkbox />}
              />

              <FormControlLabel
                checked={true}
                label="Indeterminate"
                control={<Checkbox indeterminate={true} />}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <FormControl>
            <FormLabel>Disabled</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel
                label="On"
                checked={true}
                disabled={true}
                control={<Checkbox />}
              />

              <FormControlLabel
                label="Off"
                checked={false}
                disabled={true}
                control={<Checkbox />}
              />

              <FormControlLabel
                checked={true}
                disabled={true}
                label="Indeterminate"
                control={<Checkbox indeterminate={true} />}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <FormControl>
            <FormLabel>Vertical</FormLabel>
            <FormGroup>
              <FormControlLabel label="One" control={<Checkbox />} />
              <FormControlLabel label="Two" control={<Checkbox />} />
              <FormControlLabel label="Three" control={<Checkbox />} />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <FormControl>
            <FormLabel>Inline Form</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel label="Radio" control={<Radio />} />
              <FormControlLabel label="Checkbox" control={<Checkbox />} />
              <FormControlLabel label="Switch" control={<Switch />} />

              <TextField placeholder="Text Field" />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
