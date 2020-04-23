### `@superdispatch/forms`

[![npm](https://img.shields.io/npm/v/@superdispatch/forms)](https://www.npmjs.com/package/@superdispatch/forms)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/@superdispatch/forms.svg)](https://bundlephobia.com/result?p=@superdispatch/forms)

#### Installation

```bash
yarn add @superdispatch/forms @material-ui/core formik
```

#### Description

`@superdispatch/forms` is not form implementation from scratch. It enhances `formik` form library.

The package contains enhanced form and `formil` field adaptors via `material-ui` components.

### API

- Form
  - [`useFormikEnhanced`](#useformikenhanced)
  - [`FormsProvider`](#formsprovider)
- Adapters
  - [`FormikCheckboxField`](#formikcheckboxfield)
  - [`FormikDateField`](#formikdatefield)
  - [`FormikPhoneField`](#formikphonefield)
  - [`FormikRadioGroupField`](#formikradiogroupfield)
  - [`FormikTextField`](#formiktextfield)

#### useFormikEnhanced

Returns enhanced Formik.

##### Config

```ts
import { FormikConfig, FormikErrors, FormikValues } from 'formik';

interface FormikEnhancedConfig<TValues extends FormikValues, TResponse>
  extends Omit<FormikConfig<TValues>, 'onSubmit'> {
  /**
   * Resets form when input value changes
   */
  key?: unknown;
  /**
   * Extracts errors from the submission error
   */
  getFormErrors?: (error: unknown) => FormikErrors<TValues>;
  onSubmit: (values: TValues) => TResponse | PromiseLike<TResponse>;
  onSubmitSuccess?: (response: TResponse, values: TValues) => void;
  onSubmitFailure?: (error: Error, values: TValues) => void;
}
```

##### Usage

```tsx
import { useFormikEnhanced, FormikTextField } from '@superdispatch/forms';
import { FormikProvider, Form } from 'formik';

function UpdateProfileForm() {
  const formik = useFormikEnhanced({
    initialValues: { firstName: '' },
    onSubmit: () => udateProfile(),
    onSubmitSuccess: () => alert('Profile updated successfully'),
  });

  return (
    <FormikProvider value={formik}>
      <Form>
        <FormikTextField name="firstName" />
        <button type="submit">Update</button>
      </Form>
    </FormikProvider>
  );
}
```

#### FormsProvider

Set default props for `useFormikEnhanced`.

##### Props

```ts
import { PropsWithChildren } from 'react';
import { FormikErrors } from 'formik';

type FormsProviderProps = PropsWithChildren<{
  getFormErrors?: (error: unknown) => FormikErrors<unknown>;
}>;
```

##### Usage

```tsx
function displayFormErrors(error: Error) {
  return error.message;
}

function Root() {
  return (
    <FormsProvider getFormErrors={displayFormErrors}>
      <App />
    </FormsProvider>
  );
}
```

#### FormikCheckboxField

Formik field adapter for Material Checkbox.

##### Props

```tsx
import { CheckboxFieldProps } from '@superdispatch/ui';
import { FieldValidator } from 'formik';

interface FormikCheckboxFieldProps extends CheckboxFieldProps {
  name: string;
  validate?: FieldValidator;
}
```

##### Usage

```tsx
import { FormikCheckboxField } from '@superdispatch/forms';
import { Form } from 'formik';

function UpdateProfile() {
  return (
    <Form>
      <FormikCheckboxField
        name="agree"
        validate={(value) => (!value ? 'Field is required' : undefined)}
      />
    </Form>
  );
}
```

#### FormikDateField

Formik field adapter for `@superdispatch/dates`.

##### Props

```tsx
import { FieldValidator } from 'formik';
import { DateFieldProps } from '@superdispatch/dates';

interface FormikDateFieldProps extends Omit<DateFieldProps, 'error'> {
  name: string;
  validate?: FieldValidator;
}
```

##### Usage

```tsx
import { FormikDateField } from '@superdispatch/forms';
import { Form } from 'formik';

function UpdateProfile() {
  return (
    <Form>
      <FormikDateField
        name="dob"
        validate={(value) => (!value ? 'Field is required' : undefined)}
      />
    </Form>
  );
}
```

#### FormikPhoneField

Formik field adapter for `@superdispatch/phones`.

##### Props

```tsx
import { PhoneFieldProps } from '@superdispatch/dates';
import { FieldValidator } from 'formik';

interface FormikPhoneFieldProps
  extends Omit<PhoneFieldProps, 'error' | 'value'> {
  name: string;
  validate?: FieldValidator;
}
```

##### Usage

```tsx
import { FormikPhoneField } from '@superdispatch/forms';
import { Form } from 'formik';

function UpdateProfile() {
  return (
    <Form>
      <FormikPhoneField
        name="phone"
        validate={(value) => (!value ? 'Field is required' : undefined)}
      />
    </Form>
  );
}
```

#### FormikRadioGroupField

Formik field adapter for Material Radio Group.

##### Props

```tsx
import { FieldValidator } from 'formik';
import { RadioGroupFieldProps } from '@superdispatch/ui';

interface FormikRadioGroupFieldProps
  extends Omit<RadioGroupFieldProps, 'error' | 'value'> {
  name: string;
  validate?: FieldValidator;
}
```

##### Usage

```tsx
import { RadioField } from '@superdispatch/ui';
import { FormikRadioGroupField } from '@superdispatch/forms';
import { Form } from 'formik';

function UpdateProfile() {
  return (
    <Form>
      <FormikRadioGroupField
        name="gender"
        validate={(value) => (!value ? 'Field is required' : undefined)}
      >
        <RadioField label="Male" value="male" />
        <RadioField label="Female" value="female" />
      </FormikRadioGroupField>
    </Form>
  );
}
```

#### FormikTextField

Formik field adapter for Material TextField.

##### Props

```tsx
import { StandardTextFieldProps } from '@material-ui/core';
import { FieldValidator } from 'formik';
import { ChangeEvent, ReactNode } from 'react';

interface FormikTextFieldProps<T>
  extends Omit<StandardTextFieldProps, 'error'> {
  name: string;
  validate?: FieldValidator;
  formatError?: (error: string) => ReactNode;
  format?: (value: T) => string;
  parse?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => T;
}
```

##### Usage

```tsx
import { FormikTextField } from '@superdispatch/forms';
import { Form } from 'formik';

function UpdateProfile() {
  return (
    <Form>
      <FormikTextField
        name="first_name"
        validate={(value) => (!value ? 'Field is required' : undefined)}
      />
    </Form>
  );
}
```
