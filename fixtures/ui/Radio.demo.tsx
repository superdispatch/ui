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

export default function RadioDemo() {
  return (
    <Box padding={2}>
      <Grid container={true} spacing={2}>
        <Grid item={true} xs={12}>
          <FormControl>
            <FormLabel>Label Position</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel label="Right Label" control={<Radio />} />

              <FormControlLabel
                label="Left Label"
                labelPlacement="start"
                control={<Radio />}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <FormControl>
            <FormLabel>Readonly</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel checked={true} label="On" control={<Radio />} />

              <FormControlLabel
                checked={false}
                label="Off"
                control={<Radio />}
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
                control={<Radio />}
              />

              <FormControlLabel
                label="Off"
                checked={false}
                disabled={true}
                control={<Radio />}
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <FormControl>
            <FormLabel>Vertical</FormLabel>
            <FormGroup>
              <FormControlLabel label="One" control={<Radio />} />
              <FormControlLabel label="Two" control={<Radio />} />
              <FormControlLabel label="Three" control={<Radio />} />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item={true} xs={12}>
          <FormControl>
            <FormLabel>Inline Form</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel label="Checkbox" control={<Checkbox />} />
              <FormControlLabel label="Switch" control={<Switch />} />
              <FormControlLabel label="Radio" control={<Radio />} />

              <TextField placeholder="Text Field" />
            </FormGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
