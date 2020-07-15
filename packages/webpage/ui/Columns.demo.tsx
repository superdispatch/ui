import { Card, CardContent, Link, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Column, Columns, ColumnWidth, Stack } from '@superdispatch/ui';
import { MaxWidthProperty } from 'csstype';
import React, { ReactNode } from 'react';

import { Placeholder } from '../internal/Placeholder';

const widths: ColumnWidth[] = [
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

interface DemoCardProps {
  title: ReactNode;
  children: ReactNode;
  maxWidth?: MaxWidthProperty<string>;
}

function DemoCard({ title, children, maxWidth = '224px' }: DemoCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack space={2}>
          <Typography variant="h3">{title}</Typography>
          <div style={{ maxWidth }}>{children}</div>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function ColumnsDemo() {
  return (
    <Stack>
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

      <DemoCard title="No space">
        <Columns>
          <Column>
            <Placeholder height={48} />
          </Column>

          <Column>
            <Placeholder height={48} />
          </Column>
        </Columns>
      </DemoCard>

      <DemoCard
        title={
          <>
            Custom space, e.g: <code>2</code>
          </>
        }
      >
        <Columns space={2}>
          <Column>
            <Placeholder height={48} />
          </Column>

          <Column>
            <Placeholder height={48} />
          </Column>
        </Columns>
      </DemoCard>

      <DemoCard
        title={
          <>
            Responsive space, e.g: <code>{'{ xs: 1, sm: 2 }'}</code>
          </>
        }
      >
        <Columns space={{ xs: 1, sm: 2 }}>
          <Column>
            <Placeholder height={48} />
          </Column>

          <Column>
            <Placeholder height={48} />
          </Column>
        </Columns>
      </DemoCard>

      <DemoCard title="Vertically align to center">
        <Columns space={1} align="center">
          <Column>
            <Placeholder height={48} />
          </Column>

          <Column>
            <Placeholder height={64} />
          </Column>
        </Columns>
      </DemoCard>

      <DemoCard title="Vertically align to bottom">
        <Columns space={1} align="bottom">
          <Column>
            <Placeholder height={48} />
          </Column>

          <Column>
            <Placeholder height={64} />
          </Column>
        </Columns>
      </DemoCard>

      <DemoCard
        title={
          <>
            Responsive alignment, e.g:{' '}
            <code>{"{ xs: 'top', sm: 'center' }"}</code>
          </>
        }
      >
        <Columns space={1} align={{ xs: 'top', sm: 'center' }}>
          <Column>
            <Placeholder height={48} />
          </Column>

          <Column>
            <Placeholder height={64} />
          </Column>
        </Columns>
      </DemoCard>

      <DemoCard title="Available widths" maxWidth="auto">
        <Stack space={1}>
          {widths.map((width) => (
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
        </Stack>
      </DemoCard>

      <DemoCard title="Responsive width" maxWidth="auto">
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
        </Columns>
      </DemoCard>
    </Stack>
  );
}
