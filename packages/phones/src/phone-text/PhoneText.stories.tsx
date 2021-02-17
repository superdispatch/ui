import { Meta } from '@storybook/react';
import { PhoneText } from './PhoneText';

export default { title: 'Phones/PhoneText', component: PhoneText } as Meta;

export const basic = () => <PhoneText phone="+12015550123" />;
export const fallback = () => (
  <PhoneText phone="noop" fallback="Invalid Phone Number" />
);
