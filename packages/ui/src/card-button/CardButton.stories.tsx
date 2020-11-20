import {
  Add as AddIcon,
  AttachFile as AttachFileIcon,
} from '@material-ui/icons';
import { Meta } from '@storybook/react';

import { CardButton } from './CardButton';

export default { title: 'Inputs/CardButton', component: CardButton } as Meta;

export const basic = () => (
  <CardButton hint="or Drag & Drop files here" startIcon={<AddIcon />}>
    Add Attachments
  </CardButton>
);

export const endIcon = () => (
  <CardButton hint="or Drag & Drop files here" endIcon={<AttachFileIcon />}>
    Add Attachments
  </CardButton>
);

export const error = () => (
  <CardButton error="Invalid file extension">Add Attachments</CardButton>
);

export const small = () => (
  <CardButton size="small" hint="or Drag & Drop files here">
    Add Attachments
  </CardButton>
);

export const large = () => (
  <CardButton size="large" hint="or Drag & Drop files here">
    Add Attachments
  </CardButton>
);
