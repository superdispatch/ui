import { Tab, Tabs } from '@material-ui/core';
import { Meta } from '@storybook/react';
import { UseState } from '@superdispatch/ui-playroom/UseState';
import React from 'react';

export default { title: 'Navigation/Tabs' } as Meta;

export const basic = () => (
  <UseState
    initialState={1}
    render={(state, setState) => (
      <Tabs value={state} onChange={(_, next) => setState(next)}>
        <Tab value={1} label="Tab 1" />
        <Tab value={2} label="Tab 2" />
        <Tab value={3} label="Tab 3" />
      </Tabs>
    )}
  />
);

export const scrollButtons = () => (
  <UseState
    initialState={1}
    render={(state, setState) => (
      <Tabs
        value={state}
        scrollButtons="on"
        onChange={(_, next) => setState(next)}
      >
        <Tab value={1} label="Tab 1" />
        <Tab value={2} label="Tab 2" />
        <Tab value={3} label="Tab 3" />
      </Tabs>
    )}
  />
);
