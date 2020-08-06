import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { PhoneField } from './PhoneField.playroom';

export default { title: 'Phones/PhoneField', component: PhoneField };

export const basic = makePlayroomStory(<PhoneField />);
export const validation = makePlayroomStory(
  <PhoneField value={{ region: 'US', nationalNumber: '201555123' }} />,
);
