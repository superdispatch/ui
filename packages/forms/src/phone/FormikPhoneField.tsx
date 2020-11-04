import { TextField } from '@material-ui/core';
import {
  PhoneField,
  PhoneFieldProps,
  PhoneService,
  usePhoneService,
} from '@superdispatch/phones';
import { useUID } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React, { forwardRef, Suspense } from 'react';

interface FormikPhoneFieldProps
  extends Omit<PhoneFieldProps, 'error' | 'value'> {
  name: string;
  validate?: (
    value: unknown,
    service: PhoneService,
  ) => string | void | Promise<string | void>;
}

export const FormikPhoneField = forwardRef<
  HTMLDivElement,
  FormikPhoneFieldProps
>(
  (
    {
      name,

      id,
      onBlur,
      onChange,
      disabled,
      helperText,

      validate: validateProp,

      ...props
    },
    ref,
  ) => {
    const uid = useUID(id);
    const phoneService = usePhoneService();
    const { isSubmitting } = useFormikContext();
    const validate: FieldValidator = (value) => {
      if (!validateProp) {
        return undefined;
      }

      return validateProp(value, phoneService);
    };
    const [field, { error, touched }, { setValue, setTouched }] = useField<
      null | undefined | string
    >({ name, validate });
    const errorText = touched && error;

    return (
      <PhoneField
        {...props}
        id={uid}
        ref={ref}
        name={name}
        value={field.value}
        error={!!errorText}
        disabled={disabled || isSubmitting}
        helperText={errorText || helperText}
        onBlur={(value) => {
          onBlur?.(value);
          setTouched(true);
        }}
        onChange={(value) => {
          onChange?.(value);
          setValue(value);
        }}
      />
    );
  },
);

export const SuspendedFormikPhoneField = forwardRef<
  HTMLDivElement,
  FormikPhoneFieldProps
>(({ id, label, fullWidth, helperText, ...props }, ref) => {
  const uid = useUID(id);

  return (
    <Suspense
      fallback={
        <TextField
          id={uid}
          disabled={true}
          label={label}
          fullWidth={fullWidth}
          helperText={helperText}
          placeholder="Loading…"
        />
      }
    >
      <FormikPhoneField
        {...props}
        id={uid}
        ref={ref}
        label={label}
        fullWidth={fullWidth}
        helperText={helperText}
      />
    </Suspense>
  );
});
