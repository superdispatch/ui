import { Card, CardContent, Typography } from '@material-ui/core';
import { number } from '@storybook/addon-knobs';
import { GridStack, OverflowText } from '@superdispatch/ui';
import { loremIpsum } from 'lorem-ipsum';
import React from 'react';

const lorems = {
  short: loremIpsum({ count: 3, units: 'word' }),
  long: loremIpsum({ count: 1, units: 'paragraph' }),
} as const;

export default function DescriptionListDemo() {
  const width = number('Width', 120, {
    range: true,
    step: 8,
    min: 80,
    max: 200,
  });

  return (
    <Card style={{ maxWidth: width }}>
      <CardContent>
        <GridStack spacing={1}>
          <>
            <Typography variant="h6">Basic</Typography>

            <OverflowText>{lorems.short}</OverflowText>
          </>

          <>
            <Typography variant="h6">Custom tooltip</Typography>

            <OverflowText TooltipProps={{ title: lorems.long }}>
              {lorems.short}
            </OverflowText>
          </>
        </GridStack>
      </CardContent>
    </Card>
  );
}
