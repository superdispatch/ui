import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { PhoneText } from './PhoneText';

export default { title: 'Phones/PhoneText', component: PhoneText };

export const basic = makePlayroomStory(<PhoneText phone="+12015550123" />);
export const fallback = makePlayroomStory(
  <PhoneText phone="noop" fallback="Invalid Phone Number" />,
);
