import React from 'react';

import { PhoneLink } from './PhoneLink';

export default { title: 'Phones/PhoneLink', component: PhoneLink };

export const basic = () => <PhoneLink phone="+12015550123" />;
export const fallback = () => (
  <PhoneLink phone="noop" fallback="Invalid Phone Number" />
);
