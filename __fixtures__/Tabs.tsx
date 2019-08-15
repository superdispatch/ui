import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { ThemeProvider } from '../packages/ui/src';

export default {
  Demo() {
    const [value, setValue] = React.useState(0);

    return (
      <ThemeProvider>
        <Tabs scrollButtons="auto" value={value} onChange={(_, nextValue) => setValue(nextValue)}>
          <Tab label="Available (235)" />
          <Tab label="Requested (1)" />
          <Tab label="Booked (1)" />
          <Tab label="Suggested" />
          <Tab label="Saved" />
        </Tabs>
      </ThemeProvider>
    );
  },
};
