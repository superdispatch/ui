import { Grid, GridProps } from '@material-ui/core';
import {
  Children,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

export interface GridStackProps
  extends RefAttributes<HTMLDivElement>,
    Pick<
      GridProps,
      'style' | 'className' | 'children' | 'spacing' | 'alignItems'
    > {}

/**
 * @deprecated in favor of `Stack`.
 */
export const GridStack: ForwardRefExoticComponent<GridStackProps> = forwardRef(
  ({ children, alignItems = 'stretch' as const, ...props }, ref) => {
    const items = Children.toArray(children);

    return (
      <Grid
        {...props}
        ref={ref}
        container={true}
        wrap="nowrap"
        direction="column"
        alignItems={alignItems}
      >
        {items.map((item, idx) => (
          <Grid
            key={idx}
            item={true}
            zeroMinWidth={true}
            xs={alignItems === 'stretch' ? 12 : undefined}
          >
            {item}
          </Grid>
        ))}
      </Grid>
    );
  },
);
