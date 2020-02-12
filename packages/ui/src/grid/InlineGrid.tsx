import { Grid, GridProps } from '@material-ui/core';
import React, { Children, forwardRef } from 'react';

export type InlineGridProps = Pick<
  GridProps,
  'style' | 'className' | 'children' | 'spacing' | 'justify'
>;

export const InlineGrid = forwardRef<HTMLDivElement, InlineGridProps>(
  ({ children, justify = 'flex-start', ...props }, ref) => {
    const items = Children.toArray(children);

    return (
      <Grid {...props} ref={ref} justify={justify} container={true}>
        {items.map((item, idx) => (
          <Grid key={idx} item={true}>
            {item}
          </Grid>
        ))}
      </Grid>
    );
  },
);
