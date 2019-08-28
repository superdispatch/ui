import { Box, Typography } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import React from 'react';

import { ThemeProvider } from '../theme/ThemeProvider';

const headings: Array<TypographyProps['variant']> = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const texts: Array<TypographyProps['variant']> = ['body1', 'body2', 'caption'];

export function TextDemo() {
  return (
    <ThemeProvider>
      <Box padding={2}>
        {headings.map(variant => (
          <Typography key={variant} variant={variant} gutterBottom={true}>
            <code>{variant}</code>. Heading
          </Typography>
        ))}

        {texts.map(variant => (
          <Typography key={variant} variant={variant} gutterBottom={true}>
            <code>{variant}</code>. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        ))}
      </Box>
    </ThemeProvider>
  );
}
