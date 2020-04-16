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
  - [`useFormsContext`](useformscontext)
  - FormsContext
  - FormsProvider
- Adapters
  - FormikCheckboxField
  - FormikDateField
  - FormikPhoneField
  - FormikRadioGroupField
  - FormikTextField

##### useFormikEnhanced

```typescript
function useFormikEnhanced(
  config: FormikEnhancedConfig,
): FormikContextTypeEnhanced;
```

##### Usage

```typescript jsx
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
                <FormikTextField name"firstName" />
                <button type="submit">Update</button>
           </Form>
        </FormikProvider>
    );
}

```
