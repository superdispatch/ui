import { Meta } from '@storybook/react';
import { FileDropZone, toBytes } from './FileDropZone';

export default { title: 'Lab/FileDropZone', component: FileDropZone } as Meta;

export const basic = () => (
  <FileDropZone
    onDropAccepted={(files) => {
      alert(`Accepted files: ${files.map((file) => file.name).join(', ')}`);
    }}
  />
);

export const accept = () => (
  <FileDropZone
    accept={['.jpeg', '.jpg', '.png', '.gif']}
    hintText="or Drag & Drop .jpeg .jpg .png .gif files"
    onDropAccepted={(files) => {
      alert(`Accepted files: ${files.map((file) => file.name).join(', ')}`);
    }}
  />
);

export const maxSize = () => (
  <FileDropZone
    maxSize={toBytes(20, 'mb')}
    hintText="or Drag & Drop files less than 20 MB"
    onDropAccepted={(files) => {
      alert(`Accepted files: ${files.map((file) => file.name).join(', ')}`);
    }}
  />
);
