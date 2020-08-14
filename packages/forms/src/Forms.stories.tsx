import { Box, IconButton, InputAdornment } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import { Button, Stack } from '@superdispatch/ui';
import { Form } from 'formik';
import React from 'react';

import { FormikEnhanced, FormikTextField } from '.';

export default { title: 'Recipes/Forms' };

export const login = () => (
  <Box maxWidth={240}>
    <FormikEnhanced
      initialValues={{ username: '', password: '', $showPassword: false }}
      getFormErrors={(error) => ({ username: error.message })}
      onSubmit={({ username, password }) =>
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (username === 'john' && password === 'doe') {
              alert('Successfully logged in');
              resolve();
            } else {
              reject(new Error('Invalid username or password'));
            }
          }, 1000);
        })
      }
      validate={({ username, password }) => {
        if (!username) {
          return { username: 'Username is required' };
        }

        if (!password) {
          return { password: 'Password is required' };
        }

        return {};
      }}
    >
      {({ isSubmitting, setFieldValue, values: { $showPassword } }) => (
        <Form>
          <Stack>
            <FormikTextField
              name="username"
              fullWidth={true}
              label="Username or Email"
              helperText="Try `john`"
            />
            <FormikTextField
              name="password"
              fullWidth={true}
              label="Password"
              helperText="Try `doe`"
              type={$showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setFieldValue('$showPassword', !$showPassword);
                      }}
                    >
                      {$showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" isLoading={isSubmitting}>
              Login
            </Button>
          </Stack>
        </Form>
      )}
    </FormikEnhanced>
  </Box>
);
