import { Card, CardHeader, Tab, Tabs } from '@material-ui/core';
import { Stack } from '@superdispatch/ui';
import React from 'react';

export default function TabsDemo() {
  const [value, setValue] = React.useState(0);
  const options = [
    'Available (235)',
    'Requested (7)',
    'Booked (5)',
    'Suggested (375)',
    'Saved (800)',
  ];

  return (
    <Stack space={2}>
      <Card>
        <CardHeader title="With Scroll Buttons" />

        <Tabs
          value={value}
          scrollButtons="on"
          onChange={(_, nextValue) => setValue(nextValue)}
        >
          {options.map((x) => (
            <Tab key={x} label={x} />
          ))}
        </Tabs>
      </Card>

      <Card>
        <CardHeader title="Without Scroll Buttons" />

        <Tabs
          value={value}
          scrollButtons="off"
          onChange={(_, nextValue) => setValue(nextValue)}
        >
          {options.map((x) => (
            <Tab key={x} label={x} />
          ))}
        </Tabs>
      </Card>
    </Stack>
  );
}
