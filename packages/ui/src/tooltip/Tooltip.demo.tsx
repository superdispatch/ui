import { Box, Button, Fade, Tooltip, Zoom } from '@material-ui/core';
import React, { useCallback, useState } from 'react';

import { ThemeProvider } from '..';

export function TooltipDemo() {
  const [isClicked, setIsClicked] = useState(false);
  const reset = useCallback(() => setIsClicked(false), []);
  const toggle = useCallback(() => setIsClicked(x => !x), []);
  const title = isClicked ? 'Clicked' : 'Click';

  return (
    <ThemeProvider>
      <Box padding={2} key={title}>
        <Tooltip title={title} onClose={reset}>
          <Button onClick={toggle}>Grow</Button>
        </Tooltip>
        <Tooltip title={title} onClose={reset} TransitionComponent={Fade}>
          <Button onClick={toggle}>Fade</Button>
        </Tooltip>
        <Tooltip title={title} onClose={reset} TransitionComponent={Zoom}>
          <Button onClick={toggle}>Zoom</Button>
        </Tooltip>
      </Box>
    </ThemeProvider>
  );
}
