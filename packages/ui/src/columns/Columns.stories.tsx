import { Box, Card, CardContent, Link } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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
  parameters: {
    info: {
      propTables: [Column, Columns],
      text: (
        <Alert severity="info" icon={false}>
          Heavily inspired by the{' '}
          <Link
            color="primary"
            href="https://seek-oss.github.io/braid-design-system/components/Column"
          >
            Column
          </Link>{' '}
          and{' '}
          <Link
            color="primary"
            href="https://seek-oss.github.io/braid-design-system/components/Columns"
          >
            Columns
          </Link>{' '}
          components from the{' '}
          <Link href="https://seek-oss.github.io/braid-design-system">
            BRAID Design System
          </Link>
          .
        </Alert>
      ),
    },
  },
};

function Wrapper({ children }: PlayroomStoryWrapperProps) {
  return (
    <Box maxWidth={320}>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
}

export const NoSpace = makePlayroomStory(
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

export const CustomSpace = makePlayroomStory(
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

export const ResponsiveSpace = makePlayroomStory(
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

export const Alignment = makePlayroomStory(
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

export const ResponsiveAlignment = makePlayroomStory(
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

export const Reverse = makePlayroomStory(
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

export const ResponsiveReverse = makePlayroomStory(
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

export const CollapseBelowTablet = makePlayroomStory(
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

export const CollapseBelowDesktop = makePlayroomStory(
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

export const ReverseAndCollapseBelowTablet = makePlayroomStory(
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

function AvailableWidthsWrapper({ children }: PlayroomStoryWrapperProps) {
  return (
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export const AvailableWidths = makePlayroomStory(
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
  { wrapper: AvailableWidthsWrapper },
);

export const ResponsiveWidths = makePlayroomStory(
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
