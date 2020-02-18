import { Box, Card, CardContent, Slider, Typography } from '@material-ui/core';
import { GridStack, InlineGrid, OverflowText } from '@superdispatch/ui';
import { loremIpsum } from 'lorem-ipsum';
import React, { useState } from 'react';

const lorems = {
  sentence: loremIpsum({ count: 1, units: 'sentence' }),
  paragraph: loremIpsum({ count: 1, units: 'paragraph' }),
} as const;

export default function DescriptionListDemo() {
  const [width, setWidth] = useState(240);

  return (
    <Box padding={2}>
      <GridStack spacing={2}>
        <InlineGrid spacing={2} wrap="nowrap">
          <Box minWidth={200}>
            <Typography>Width</Typography>

            <Slider
              step={8}
              min={80}
              max={260}
              value={width}
              onChange={(_, value) => setWidth(value as number)}
            />
          </Box>
        </InlineGrid>

        <GridStack spacing={2}>
          <Card style={{ maxWidth: width }}>
            <CardContent>
              <GridStack spacing={1}>
                <>
                  <Typography variant="h6">Basic</Typography>

                  <OverflowText>{lorems.sentence}</OverflowText>
                </>

                <>
                  <Typography variant="h6">Custom tooltip</Typography>

                  <OverflowText TooltipProps={{ title: lorems.paragraph }}>
                    {lorems.sentence}
                  </OverflowText>
                </>
              </GridStack>
            </CardContent>
          </Card>
        </GridStack>
      </GridStack>
    </Box>
  );
}
