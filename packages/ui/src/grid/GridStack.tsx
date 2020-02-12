import { Grid, GridProps } from '@material-ui/core';
import React, { Children, forwardRef } from 'react';

export type GridStackProps = Pick<
  GridProps,
  'style' | 'className' | 'children' | 'spacing' | 'alignItems'
>;

export const GridStack = forwardRef<HTMLDivElement, GridStackProps>(
  ({ children, alignItems = 'stretch', ...props }, ref) => {
    const items = Children.toArray(children);

    return (
      <Grid
        {...props}
        ref={ref}
        container={true}
        direction="column"
        alignItems={alignItems}
      >
        {items.map((item, idx) => (
          <Grid key={idx} item={true} zeroMinWidth={true}>
            {item}
          </Grid>
        ))}
      </Grid>
    );
  },
);
