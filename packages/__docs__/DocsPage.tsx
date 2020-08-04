import { Box, Card, CardContent, Typography } from '@material-ui/core';
import {
  defaultTitleSlot,
  DocsContext,
  DocsContextProps,
  getComponent,
  getComponentProps,
  getDescriptionProps,
  getSourceProps,
  Story,
} from '@storybook/addon-docs/dist/blocks';
import {
  getComponentName,
  getDocsStories,
} from '@storybook/addon-docs/dist/blocks/utils';
import {
  Description,
  PropsTableProps,
  Source,
  SourceProps,
} from '@storybook/components';
import { Column, Columns, Stack } from '@superdispatch/ui';
import React, { ComponentType, ReactNode, useContext, useMemo } from 'react';

import { DocsPropsTable } from './DocsPropsTable';

interface DocsParameters {
  componentSubtitle?: ReactNode;
  subcomponents?: Record<string, ComponentType>;
}

function parseParameters(ctx: DocsContextProps): DocsParameters {
  const parameters = ctx.parameters as undefined | Record<string, unknown>;

  return parameters || {};
}

function parseTitle(ctx: DocsContextProps): ReactNode {
  return defaultTitleSlot(ctx);
}

function parseSubtitle(ctx: DocsContextProps): ReactNode {
  return parseParameters(ctx).componentSubtitle;
}

function parseDescription(ctx: DocsContextProps): string {
  return getDescriptionProps({}, ctx).markdown;
}

function parseComponents(ctx: DocsContextProps): Map<string, PropsTableProps> {
  const tabs = new Map<string, PropsTableProps>();
  const propsProps = { of: '.' };
  const main = getComponent(propsProps, ctx) as undefined | ComponentType;

  if (main) {
    tabs.set(getComponentName(main), getComponentProps(main, propsProps, ctx));

    const { subcomponents } = parseParameters(ctx);

    if (subcomponents) {
      for (const [label, component] of Object.entries(subcomponents)) {
        tabs.set(label, getComponentProps(component, propsProps, ctx));
      }
    }
  }

  return tabs;
}

function parseStories(
  ctx: DocsContextProps,
): Array<[string | undefined, string | undefined, SourceProps]> {
  return getDocsStories(ctx).map((story) => [
    story.id,
    story.name,
    getSourceProps({ id: story.id as string }, ctx),
  ]);
}

export function DocsPage() {
  const ctx = useContext(DocsContext);
  const [title, subtitle, description, components, stories] = useMemo(
    () => [
      parseTitle(ctx),
      parseSubtitle(ctx),
      parseDescription(ctx),
      parseComponents(ctx),
      parseStories(ctx),
    ],
    [ctx],
  );

  return (
    <Box padding={2}>
      <Stack space={2}>
        {!!title && (
          <Columns align="bottom" space={1}>
            <Column width="content">
              <Typography variant="h2">{title}</Typography>
            </Column>

            {!!subtitle && (
              <Column width="content">
                <Typography variant="h4" color="textSecondary">
                  {subtitle}
                </Typography>
              </Column>
            )}
          </Columns>
        )}

        {!!description && (
          <Card>
            <CardContent>
              <Description markdown={description} />
            </CardContent>
          </Card>
        )}

        {stories.map(([id, name, source]) => (
          <Card key={id}>
            <CardContent>
              <Stack>
                <Typography variant="h3">{name}</Typography>

                <Story id={id} />

                <Source {...source} dark={true} />
              </Stack>
            </CardContent>
          </Card>
        ))}

        {!!components.size && (
          <Card>
            <DocsPropsTable components={components} />
          </Card>
        )}
      </Stack>
    </Box>
  );
}
