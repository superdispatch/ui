import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { SuperThemeProvider } from '..';
import { Button, ButtonProps } from './Button';
import { Box, Grid } from '@material-ui/core';
import { startCase } from 'lodash';

storiesOf('UI', module)
  .addDecorator(story => <SuperThemeProvider>{story()}</SuperThemeProvider>)
  .add('Button', () => {
    const colors: Array<ButtonProps['color']> = ['blue', 'red', 'green', 'grey'];
    const sizes: Array<ButtonProps['size']> = ['small', 'medium', 'large'];
    const variants: Array<ButtonProps['variant']> = ['contained', 'outlined'];

    return (
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
                          {[false, true].map(disabled => (
                            <Grid key={String(disabled)} item={true} xs={6} sm={3}>
                              <Button
                                size={size}
                                color={color}
                                variant={variant}
                                disabled={disabled}
                              >
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
    );
  });
