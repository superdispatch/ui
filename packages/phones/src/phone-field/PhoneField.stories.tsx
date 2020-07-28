import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { PhoneField } from './PhoneField.playroom';

export default { title: 'Phones/PhoneField' };

export const Basic = makePlayroomStory(<PhoneField />);
export const Validation = makePlayroomStory(
  <PhoneField value={{ region: 'US', nationalNumber: '201555123' }} />,
);
