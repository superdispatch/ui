import { Box, Card, CardContent, Slider, Typography } from '@material-ui/core';
import { GridStack, InlineGrid, OverflowText } from '@superdispatch/ui';
import { loremIpsum } from 'lorem-ipsum';
import React, { useState } from 'react';

const lorems = {
  short: loremIpsum({ count: 3, units: 'word' }),
  long: loremIpsum({ count: 1, units: 'paragraph' }),
} as const;

export default function DescriptionListDemo() {
  const [width, setWidth] = useState(120);

  return (
    <Box padding={2}>
      <GridStack spacing={2}>
        <InlineGrid spacing={2} wrap="nowrap">
          <Box minWidth={200}>
            <Typography>Width ({width}px)</Typography>

            <Slider
              step={8}
              min={80}
              max={200}
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
        </GridStack>
      </GridStack>
    </Box>
  );
}
