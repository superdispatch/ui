import React, { Fragment } from 'react';
import { ButtonProps, Button } from '@superdispatch/ui/src/button/Button';
import { ThemeProvider } from '@superdispatch/ui/src';
import { Box, Grid } from '@material-ui/core';
import { startCase } from 'lodash';

const colors: Array<ButtonProps['color']> = ['blue', 'red', 'green'];
const sizes: Array<ButtonProps['size']> = ['small', 'medium', 'large'];
const variants: Array<ButtonProps['variant']> = ['contained', 'outlined'];
const samples: Array<Partial<ButtonProps>> = [{}, { isLoading: true }, { disabled: true }];

export default {
  Demo() {
    return (
      <ThemeProvider>
        <Box padding={2}>
          <Grid container={true} spacing={1} direction="column">
            {colors.map(color => (
              <Fragment key={color}>
                {sizes.map(size => {
                  const text = `${startCase(color)} ${startCase(size)}`;

                  return (
                    <Grid key={size} item={true}>
                      <Grid container={true} spacing={1}>
                        {variants.map(variant => (
                          <Fragment key={variant}>
                            {samples.map((props, idx) => (
                              <Grid key={idx} item={true} sm={4} xs={12}>
                                <Button {...props} size={size} color={color} variant={variant}>
                                  {text}
                                </Button>
                              </Grid>
                            ))}
                          </Fragment>
                        ))}
                      </Grid>
                    </Grid>
                  );
                })}
              </Fragment>
            ))}
          </Grid>
        </Box>
      </ThemeProvider>
    );
  },
};
