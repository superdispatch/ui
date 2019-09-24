import { Tooltip as MaterialTooltip } from '@material-ui/core';
import { TooltipProps } from '@material-ui/core/Tooltip';
import React, { forwardRef } from 'react';

import { TooltipClassNames } from './TooltipStyles';

export const Tooltip = forwardRef(({ title, PopperProps, ...props }: TooltipProps) => {
  const [arrowRef, setArrowRef] = React.useState<HTMLSpanElement | null>(null);

  return (
    <MaterialTooltip
      {...props}
      PopperProps={{
        ...PopperProps,
        modifiers: {
          ...(PopperProps && PopperProps.modifiers),
          arrow: { element: arrowRef, enabled: arrowRef != null },
        },
      }}
      title={
        <>
          {title}
          <span className={TooltipClassNames.Arrow} ref={setArrowRef} />
        </>
      }
    />
  );
});

Tooltip.displayName = 'Tooltip';
