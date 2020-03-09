import { Grid, GridSpacing, Typography } from '@material-ui/core';
import { boolean, number, select } from '@storybook/addon-knobs';
import { Color, GridStack, InlineGrid } from '@superdispatch/ui';
import React from 'react';

export default function GridsDemo() {
  const items = number('Items', 3, {
    min: 1,
    step: 1,
    max: 20,
    range: true,
  });
  const spacing = number('Spacing', 2, {
    min: 0,
    max: 10,
    step: 1,
    range: true,
  }) as GridSpacing;

  const dynamicSize = boolean('Dynamic Size', false);
  const alignItems = select(
    'Alignment',
    {
      'flex-start': 'flex-start',
      center: 'center',
      'flex-end': 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline',
    },
    'stretch',
  );
  const justifyContent = select(
    'Justification',
    {
      'flex-start': 'flex-start',
      center: 'center',
      'flex-end': 'flex-end',
      'space-between': 'space-between',
      'space-around': 'space-around',
      'space-evenly': 'space-evenly',
    },
    'flex-start',
  );
  const wrap = select(
    'Justification',
    {
      nowrap: 'nowrap',
      wrap: 'wrap',
      'wrap-reverse': 'wrap-reverse',
    },
    'wrap',
  );

  return (
    <Grid container={true} spacing={2}>
      <Grid item={true} xs={6}>
        <Grid container={true} spacing={2}>
          <Grid item={true} xs={12}>
            <Typography variant="h3" gutterBottom={true}>
              InlineGrid
            </Typography>
          </Grid>

          <Grid item={true} xs={12}>
            <div style={{ width: 256 }}>
              <InlineGrid
                wrap={wrap}
                spacing={spacing}
                justify={justifyContent}
                alignItems={alignItems}
                style={{ backgroundColor: Color.Silver500 }}
              >
                {Array.from({ length: items }, (_, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${Color.Blue500}`,
                      backgroundColor: Color.Blue200,
                      width: !dynamicSize ? 64 : (idx + 1) * 24,
                      height: !dynamicSize ? 64 : (idx + 1) * 24,
                    }}
                  >
                    {idx + 1}
                  </div>
                ))}
              </InlineGrid>
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item={true} xs={6}>
        <Grid container={true} spacing={2}>
          <Grid item={true}>
            <Typography variant="h3" gutterBottom={true}>
              GridStack
            </Typography>
          </Grid>

          <Grid item={true} xs={12}>
            <div style={{ width: 256, backgroundColor: Color.Silver500 }}>
              <GridStack spacing={spacing} alignItems={alignItems}>
                {Array.from({ length: items }, (_, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${Color.Blue500}`,
                      backgroundColor: Color.Blue200,
                      height: !dynamicSize ? 64 : (idx + 1) * 24,
                      minWidth: !dynamicSize ? 64 : (idx + 1) * 24,
                    }}
                  >
                    {idx + 1}
                  </div>
                ))}
              </GridStack>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
