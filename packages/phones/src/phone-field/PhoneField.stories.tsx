import React from 'react';

import { PhoneField } from './PhoneField.playroom';

export default { title: 'Phones/PhoneField', component: PhoneField };

export const basic = () => <PhoneField />;
export const validation = () => (
  <PhoneField value={{ region: 'US', nationalNumber: '201555123' }} />
);
