import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { PhoneText } from './PhoneText';

export default { title: 'Phones/PhoneText' };

export const Basic = makePlayroomStory(<PhoneText phone="+12015550123" />);
export const Fallback = makePlayroomStory(
  <PhoneText phone="noop" fallback="Invalid Phone Number" />,
);
