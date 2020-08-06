import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { PhoneLink } from './PhoneLink';

export default { title: 'Phones/PhoneLink', component: PhoneLink };

export const basic = makePlayroomStory(<PhoneLink phone="+12015550123" />);
export const fallback = makePlayroomStory(
  <PhoneLink phone="noop" fallback="Invalid Phone Number" />,
);
