import { Box, Card, CardContent, Typography } from '@material-ui/core';
import {
  defaultTitleSlot,
  DocsContext,
  DocsContextProps,
  getComponent,
  getComponentProps,
  getDescriptionProps,
  Story,
} from '@storybook/addon-docs/dist/blocks';
import { StoryData } from '@storybook/addon-docs/dist/blocks/shared';
import {
  getComponentName,
  getDocsStories,
} from '@storybook/addon-docs/dist/blocks/utils';
import { Description, PropsTableProps } from '@storybook/components';
import { Column, Columns, Stack } from '@superdispatch/ui';
import React, { ComponentType, ReactNode, useContext, useMemo } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as syntaxStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { DocsPropsTable } from './DocsPropsTable';

interface DocsParameters {
  componentSubtitle?: ReactNode;
  subcomponents?: Record<string, ComponentType>;
}

function parseParameters(ctx: DocsContextProps): DocsParameters {
  return (ctx.parameters || {}) as DocsParameters;
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

  const getProps = (component: ComponentType) =>
    getComponentProps(component, propsProps, ctx);

  if (main) {
    tabs.set(getComponentName(main), getProps(main));

    const { subcomponents } = parseParameters(ctx);

    if (subcomponents) {
      for (const [label, component] of Object.entries(subcomponents)) {
        tabs.set(label, getProps(component));
      }
    }
  }

  return tabs;
}

interface StoryParameters {
  playroom?: { code?: string };
}

function parseStoryParameters(story: StoryData): StoryParameters {
  return (story.parameters || {}) as StoryParameters;
}

function parseStories(
  ctx: DocsContextProps,
): Array<[string | undefined, string | undefined, string | undefined]> {
  return getDocsStories(ctx).map((story) => [
    story.id,
    story.name,
    parseStoryParameters(story).playroom?.code,
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
      <Stack space={3}>
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

        <Stack space={2}>
          {!!description && (
            <Card>
              <CardContent>
                <Description markdown={description} />
              </CardContent>
            </Card>
          )}

          {stories.map(([id, name, code]) => (
            <Card key={id}>
              <CardContent>
                <Stack>
                  <Typography variant="h3">{name}</Typography>

                  <Story id={id} />

                  {!!code && (
                    <SyntaxHighlighter
                      language="jsx"
                      style={syntaxStyle as unknown}
                      customStyle={{ borderRadius: '4px' }}
                    >
                      {code}
                    </SyntaxHighlighter>
                  )}
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
      </Stack>
    </Box>
  );
}
