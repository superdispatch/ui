import { Card, CardContent, Typography } from '@material-ui/core';
import { CalendarToday, Notes, Room } from '@material-ui/icons';
import { number } from '@storybook/addon-knobs';
import {
  DescriptionList,
  DescriptionListItem,
  Inline,
  Stack,
} from '@superdispatch/ui';
import { startCase } from 'lodash';
import React from 'react';

const sizes = ['small', 'medium', 'large'] as const;

export default function DescriptionListDemo() {
  const width = number('Width', 240, {
    range: true,
    step: 8,
    min: 80,
    max: 260,
  });

  return (
    <Inline space={2}>
      {sizes.map((size) => (
        <Stack space={2} key={size}>
          <Typography variant="h6">{startCase(size)}</Typography>

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
        </Stack>
      ))}
    </Inline>
  );
}
