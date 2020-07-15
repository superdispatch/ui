import { Card, CardContent, Link, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Inline, Stack } from '@superdispatch/ui';
import React, { ReactNode } from 'react';

import { Placeholder } from '../internal/Placeholder';

interface DemoCardProps {
  title: ReactNode;
  children: ReactNode;
}

function DemoCard({ title, children }: DemoCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack space={2}>
          <Typography variant="h3">{title}</Typography>
          <div style={{ maxWidth: '224px' }}>{children}</div>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function InlineDemo() {
  return (
    <Stack>
      <Alert severity="info" icon={false}>
        Heavily inspired by the{' '}
        <Link
          color="primary"
          href="https://seek-oss.github.io/braid-design-system/components/Inline"
        >
          Inline
        </Link>{' '}
        component from the{' '}
        <Link href="https://seek-oss.github.io/braid-design-system">
          BRAID Design System
        </Link>
        .
      </Alert>

      <DemoCard title="Basic">
        <Inline>
          {Array.from({ length: 10 }, (_, idx) => (
            <Placeholder key={idx} width={48} height={48} />
          ))}
        </Inline>
      </DemoCard>

      <DemoCard
        title={
          <>
            Responsive space, e.g: <code>{'{ xs: 1, sm: 2 }'}</code>
          </>
        }
      >
        <Inline space={{ xs: 1, sm: 2 }}>
          {Array.from({ length: 10 }, (_, idx) => (
            <Placeholder key={idx} width={48} height={48} />
          ))}
        </Inline>
      </DemoCard>

      <DemoCard title="Align horizontally to center">
        <Inline horizontalAlign="center">
          {Array.from({ length: 10 }, (_, idx) => (
            <Placeholder key={idx} width={48} height={48} />
          ))}
        </Inline>
      </DemoCard>

      <DemoCard
        title={
          <>
            Responsive horizontal alignment, e.g:{' '}
            <code>{"{ xs: 'center', sm: 'left' }"}</code>
          </>
        }
      >
        <Inline horizontalAlign={{ xs: 'center', sm: 'left' }}>
          {Array.from({ length: 10 }, (_, idx) => (
            <Placeholder key={idx} width={48} height={48} />
          ))}
        </Inline>
      </DemoCard>

      <DemoCard title="Align vertically to center">
        <Inline verticalAlign="center">
          <Placeholder width={48} height={48} />
          <Placeholder width={48} height={64} />
          <Placeholder width={48} height={24} />
        </Inline>
      </DemoCard>

      <DemoCard title="Align vertically to bottom">
        <Inline verticalAlign="bottom">
          <Placeholder width={48} height={48} />
          <Placeholder width={48} height={64} />
          <Placeholder width={48} height={24} />
        </Inline>
      </DemoCard>

      <DemoCard
        title={
          <>
            Responsive vertical alignment, e.g:{' '}
            <code>{"{ xs: 'center', sm: 'top' }"}</code>
          </>
        }
      >
        <Inline verticalAlign={{ xs: 'center', sm: 'top' }}>
          <Placeholder width={48} height={48} />
          <Placeholder width={48} height={64} />
          <Placeholder width={48} height={24} />
        </Inline>
      </DemoCard>
    </Stack>
  );
}
