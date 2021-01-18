import { IconButton, InputAdornment } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Meta } from '@storybook/react';
import { Button, Inline, Stack, useSnackbarStack } from '@superdispatch/ui';
import { Box } from '@superdispatch/ui-lab';
import { Form, FormikProvider } from 'formik';
import { useRef } from 'react';

import {
  FormikDateField,
  FormikTextField,
  SuspendedFormikPhoneField,
  useFormikEnhanced,
} from '.';

export default {
  title: 'Recipes/Forms',
  parameters: { playroom: { disable: true } },
} as Meta;

export const SignUp = () => {
  const { addSnackbar } = useSnackbarStack();
  const passwordRef = useRef<HTMLInputElement>(null);

  const formik = useFormikEnhanced<
    {
      username: string;
      password: string;
      $showPassword: boolean;
      dateOfBirth: undefined | string;
      phone: string;
    },
    Record<string, unknown>
  >({
    initialValues: {
      username: '',
      password: '',
      $showPassword: false,
      dateOfBirth: undefined,
      phone: '',
    },
    onSubmit(values) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (values.username !== 'john_doe') {
            reject(new Error('Invalid username (try "john_doe")'));
          } else if (values.password !== '123') {
            reject(new Error('Invalid password (try "123")'));
          } else {
            resolve(values);
          }
        }, 1000);
      });
    },
    onSubmitSuccess() {
      addSnackbar('Successfully signed up!', { variant: 'success' });
    },
    onSubmitFailure(error) {
      addSnackbar(error.message, { variant: 'error' });
    },
  });

  const {
    status,
    resetForm,
    isSubmitting,
    setFieldValue,
    values: { $showPassword },
  } = formik;

  if (status.type === 'submitted') {
    return (
      <Stack>
        <Alert severity="success">Welcome!</Alert>

        <pre>{JSON.stringify(status.payload, null, 2)}</pre>

        <Button
          variant="contained"
          onClick={() => {
            resetForm();
          }}
        >
          Reset
        </Button>
      </Stack>
    );
  }

  return (
    <FormikProvider value={formik}>
      <Form>
        <Box maxWidth="320px">
          <Stack>
            <FormikTextField
              name="username"
              fullWidth={true}
              label="Username"
              validate={(value) =>
                value ? undefined : 'Please enter a username'
              }
            />

            <FormikTextField
              name="password"
              fullWidth={true}
              label="Password"
              validate={(value) =>
                value ? undefined : 'Please enter password'
              }
              type={$showPassword ? 'text' : 'password'}
              onBlur={() => {
                if ($showPassword) {
                  setFieldValue('$showPassword', false);
                }
              }}
              inputRef={passwordRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        passwordRef.current?.focus();
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

            <FormikDateField
              fullWidth={true}
              name="dateOfBirth"
              label="Date of birth"
              validate={({ dateValue }) =>
                !dateValue.isValid
                  ? 'Please select your date of birth'
                  : dateValue.valueOf() > Date.now()
                  ? 'Invalid Date of birth'
                  : undefined
              }
            />

            <SuspendedFormikPhoneField
              name="phone"
              fullWidth={true}
              label="Phone Number"
              validate={(value, phoneService) =>
                phoneService.validate(value, { required: true })
              }
            />

            {status.type === 'rejected' && (
              <Alert severity="error">{status.payload.message}</Alert>
            )}

            <Inline>
              <Button
                type="submit"
                variant="contained"
                isLoading={isSubmitting}
              >
                Sign Up
              </Button>

              <Button
                onClick={() => {
                  resetForm();
                }}
                variant="outlined"
                disabled={isSubmitting}
              >
                Reset
              </Button>
            </Inline>
          </Stack>
        </Box>
      </Form>
    </FormikProvider>
  );
};
