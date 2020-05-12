import { Add, AttachFile } from '@material-ui/icons';
import { boolean } from '@storybook/addon-knobs';
import { CardButton, CardButtonProps, Stack } from '@superdispatch/ui';
import React from 'react';

const sizes: Array<CardButtonProps['size']> = ['small', 'medium', 'large'];

export default function CardButtonDemo() {
  const hasStartIcon = boolean('Has Start Icon', true);
  const hasEndIcon = boolean('Has End Icon', false);
  const hasHint = boolean('Has Hint', true);
  const hasError = boolean('Has Error', false);

  return (
    <Stack space={2}>
      {sizes.map((size) => (
        <CardButton
          key={size}
          size={size}
          hint={hasHint && 'or Drag & Drop files here'}
          error={hasError && 'Invalid file extension'}
          startIcon={hasStartIcon && <Add />}
          endIcon={hasEndIcon && <AttachFile />}
        >
          Add Attachments
        </CardButton>
      ))}
    </Stack>
  );
}
