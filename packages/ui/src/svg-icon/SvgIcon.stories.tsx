import { SvgIconProps } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { makePlayroomStory } from '@superdispatch/ui-playroom/makePlayroomStory';
import React from 'react';

import { Inline, Stack } from '..';

export default { title: 'Data Display/SvgIcon' };

const colors: Array<SvgIconProps['color']> = [
  'inherit',
  'primary',
  'action',
  'disabled',
  'error',
];

const fontSizes: Array<SvgIconProps['fontSize']> = [
  'small',
  'default',
  'large',
];

export const Examples = makePlayroomStory(
  <Stack space={2}>
    {colors.map((color) => (
      <Inline key={color} space={2}>
        {fontSizes.map((fontSize) => (
          <Check key={fontSize} color={color} fontSize={fontSize} />
        ))}
      </Inline>
    ))}
  </Stack>,
);
