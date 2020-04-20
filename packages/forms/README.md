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

##### useFormikEnhanced

```ts
function useFormikEnhanced(
  config: FormikEnhancedConfig,
): FormikContextTypeEnhanced;
```

##### Usage

```tsx
import { useFormikEnhanced, FormikTextField } from '@superdispatch/forms';
import { FormikProvider, Form } from 'formik';

function UpdateProfileForm() {
  const form = useFormikEnhanced({
    initialValues: { firstName: '' },
    onSubmit: () => udateProfile(),
    onSubmitSuccess: () => alert('Profile updated successfully'),
  });

  return (
    <FormikProvider value={form}>
      <Form>
        <FormikTextField name="firstName" />
        <button type="submit">Update</button>
      </Form>
    </FormikProvider>
  );
}
```

##### FormsProvider

Set default props for `useFormikEnhanced`.

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

##### FormikCheckboxField

Formik field adapter for Material Checkbox.

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

##### FormikDateField

Formik field adapter for `@superdispatch/dates`.

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

##### FormikPhoneField

Formik field adapter for `@superdispatch/phones`.

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

##### FormikRadioGroupField

Formik field adapter for Material Radio Group.

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

##### FormikTextField

Formik field adapter for Material TextField.

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
