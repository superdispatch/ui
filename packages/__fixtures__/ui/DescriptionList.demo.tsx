import { Box, Card, CardContent, Slider, Typography } from '@material-ui/core';
import { CalendarToday, Notes, Room } from '@material-ui/icons';
import {
  DescriptionList,
  DescriptionListItem,
  GridStack,
  InlineGrid,
} from '@superdispatch/ui';
import { startCase } from 'lodash';
import React, { useState } from 'react';

const sizes = ['small', 'medium', 'large'] as const;

export default function DescriptionListDemo() {
  const [width, setWidth] = useState(240);

  return (
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

      <InlineGrid spacing={2}>
        {sizes.map(size => (
          <GridStack spacing={2} key={size}>
            <Typography>{startCase(size)}</Typography>

            <Card>
              <CardContent style={{ maxWidth: width }}>
                <DescriptionList size={size}>
                  <DescriptionListItem
                    icon={<CalendarToday />}
                    label="Posted on"
                    content="Feb 03, 2020"
                  />

                  <DescriptionListItem
                    icon={<Room />}
                    content="167 Zosh Rd, Dallas, PA 18612"
                  />

                  <DescriptionListItem icon={<Notes />} label="Notes" />
                </DescriptionList>
              </CardContent>
            </Card>
          </GridStack>
        ))}
      </InlineGrid>
    </GridStack>
  );
}
