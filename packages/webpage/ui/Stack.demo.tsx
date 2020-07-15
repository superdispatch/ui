import { Card, CardContent, Link, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Stack } from '@superdispatch/ui';
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

export default function StackDemo() {
  return (
    <Stack>
      <Alert severity="info" icon={false}>
        Heavily inspired by the{' '}
        <Link
          color="primary"
          href="https://seek-oss.github.io/braid-design-system/components/Stack"
        >
          Stack
        </Link>{' '}
        component from the{' '}
        <Link href="https://seek-oss.github.io/braid-design-system">
          BRAID Design System
        </Link>
        .
      </Alert>

      <DemoCard title="Basic">
        <Stack>
          {Array.from({ length: 3 }, (_, idx) => (
            <Placeholder key={idx} height={48} />
          ))}
        </Stack>
      </DemoCard>

      <DemoCard
        title={
          <>
            Responsive space, e.g: <code>{'{ xs: 1, sm: 2 }'}</code>
          </>
        }
      >
        <Stack space={{ xs: 1, sm: 2 }}>
          {Array.from({ length: 3 }, (_, idx) => (
            <Placeholder key={idx} height={48} />
          ))}
        </Stack>
      </DemoCard>

      <DemoCard title="Align to center">
        <Stack align="center">
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={64} />
          <Placeholder height={48} width={128} />
        </Stack>
      </DemoCard>

      <DemoCard
        title={
          <>
            Responsive alignment, e.g:{' '}
            <code>{"{ xs: 'center', sm: 'left' }"}</code>
          </>
        }
      >
        <Stack align={{ xs: 'center', sm: 'left' }}>
          <Placeholder height={48} width={48} />
          <Placeholder height={48} width={64} />
          <Placeholder height={48} width={128} />
        </Stack>
      </DemoCard>
    </Stack>
  );
}
