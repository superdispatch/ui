import { Box, Link } from '@material-ui/core';
import {
  makePlayroomStory,
  PlayroomStoryWrapperProps,
} from '@superdispatch/ui-playroom/makePlayroomStory';
import { Placeholder } from '@superdispatch/ui-playroom/Placeholder';
import React from 'react';

import { Stack } from '..';
import { Column, Columns, ColumnWidth } from './Columns';

export default {
  title: 'Layout/Columns',
  component: Column,
  subcomponents: { Columns },
  parameters: {
    componentSubtitle: (
      <>
        Heavily inspired by the{' '}
        <Link href="https://seek-oss.github.io/braid-design-system/components/Column">
          Column
        </Link>{' '}
        and{' '}
        <Link href="https://seek-oss.github.io/braid-design-system/components/Columns">
          Columns
        </Link>{' '}
        components from the{' '}
        <Link href="https://seek-oss.github.io/braid-design-system">
          BRAID Design System
        </Link>
        .
      </>
    ),
  },
};

function Wrapper({ children }: PlayroomStoryWrapperProps) {
  return <Box maxWidth={320}>{children}</Box>;
}

export const noSpace = makePlayroomStory(
  <Columns>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

export const customSpace = makePlayroomStory(
  <Columns space={1}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

export const responsiveSpace = makePlayroomStory(
  <Columns space={{ xs: 2, sm: 1 }}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

export const alignment = makePlayroomStory(
  <Columns space={1} align="center">
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={64} text="Second" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

export const responsiveAlignment = makePlayroomStory(
  <Columns space={1} align={{ xs: 'top', sm: 'center' }}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={64} text="Second" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

export const reverse = makePlayroomStory(
  <Columns space={1} reverse={true}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

export const responsiveReverse = makePlayroomStory(
  <Columns space={1} reverse={{ xs: true, sm: false }}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

export const collapseBelowTablet = makePlayroomStory(
  <Columns space={1} collapseBelow="sm">
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

export const collapseBelowDesktop = makePlayroomStory(
  <Columns space={1} collapseBelow="md">
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

export const reverseAndCollapseBelowTablet = makePlayroomStory(
  <Columns space={1} collapseBelow="sm" reverse={{ xs: true, sm: false }}>
    <Column>
      <Placeholder height={48} text="First" />
    </Column>

    <Column>
      <Placeholder height={48} text="Second" />
    </Column>

    <Column>
      <Placeholder height={48} text="Third" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);

const AVAILABLE_WIDTHS: ColumnWidth[] = [
  'content',
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '3/4',
  '1/5',
  '2/5',
  '3/5',
  '4/5',
];

export const availableWidths = makePlayroomStory(
  <Stack space={1}>
    {AVAILABLE_WIDTHS.map((width) => (
      <Columns key={width} space={1}>
        <Column width={width}>
          <Placeholder
            height={48}
            width={width === 'content' ? 128 : 'auto'}
            text={width === 'content' ? 'Content' : width}
          />
        </Column>

        <Column>
          <Placeholder height={48} text="Fluid" />
        </Column>
      </Columns>
    ))}
  </Stack>,
);

export const responsiveWidths = makePlayroomStory(
  <Columns space={1}>
    <Column width={{ xs: '1/2', sm: '3/5' }}>
      <Placeholder
        height={112}
        code={JSON.stringify({ xs: '1/2', sm: '3/5' }, null, 2)}
      />
    </Column>

    <Column>
      <Placeholder height={112} text="Fluid" />
    </Column>
  </Columns>,
  { wrapper: Wrapper },
);
