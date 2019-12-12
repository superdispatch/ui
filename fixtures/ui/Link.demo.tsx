import { Box, Grid, Link, LinkProps } from '@material-ui/core';
import { startCase } from 'lodash';
import React, { Fragment } from 'react';

const colors: Array<LinkProps['color']> = ['primary'];
const variants: Array<LinkProps['variant']> = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body1',
  'body2',
  'caption',
];

export default function LinkDemo() {
  return (
    <Box padding={2}>
      <Grid container={true} spacing={1} direction="column">
        {colors.map(color => (
          <Grid key={color} item={true}>
            <Grid container={true} spacing={1}>
              {variants.map(variant => {
                const text = (
                  <>
                    <code>{variant}</code> - {startCase(color || 'default')}
                  </>
                );

                return (
                  <Fragment key={variant}>
                    <Grid item={true} sm={6} xs={12}>
                      <Link
                        color={color}
                        variant={variant}
                        href="http://ui.superdispatch.org"
                        onClick={(
                          event: React.MouseEvent<HTMLAnchorElement>,
                        ) => {
                          const { href } = event.target as HTMLAnchorElement;

                          event.preventDefault();

                          // eslint-disable-next-line no-alert
                          if (confirm(`Navigate to ${href}?`)) {
                            window.open(href, '_blank');
                          }
                        }}
                      >
                        {text}
                      </Link>
                    </Grid>

                    <Grid item={true} sm={6} xs={12}>
                      <Link
                        color={color}
                        variant={variant}
                        component="button"
                        onClick={() => {
                          // eslint-disable-next-line no-alert
                          alert('Clicked on Button.');
                        }}
                      >
                        {text}
                      </Link>
                    </Grid>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
