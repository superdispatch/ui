import { Home as HomeIcon } from '@material-ui/icons';
import { PropsLink } from '@superdispatch/ui-docs';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { Inline } from '../inline/Inline';

export default {
  title: 'Data Display/SvgIcon',
  parameters: {
    componentSubtitle: (
      <PropsLink url="https://material-ui.com/api/svg-icon/#props" />
    ),
  },
};

export const basic = makePlayroomStory(
  <Inline>
    <HomeIcon />
    <HomeIcon color="primary" />
    <HomeIcon color="action" />
    <HomeIcon color="disabled" />
  </Inline>,
);

export const customSize = makePlayroomStory(
  <Inline verticalAlign="bottom">
    <HomeIcon fontSize="small" />
    <HomeIcon />
    <HomeIcon fontSize="large" />
  </Inline>,
);
