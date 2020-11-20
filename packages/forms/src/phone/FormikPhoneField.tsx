import { TextField } from '@material-ui/core';
import {
  PhoneField,
  PhoneFieldProps,
  PhoneService,
  usePhoneService,
} from '@superdispatch/phones';
import { useUID } from '@superdispatch/ui';
import { useField, useFormikContext } from 'formik';
import { forwardRef, ReactNode, Suspense } from 'react';

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

    function validate(
      value: undefined,
    ): string | void | Promise<string | void> {
      if (!validateProp) return;
      return validateProp(value, phoneService);
    }

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

export interface SuspendedFormikPhoneFieldProps extends FormikPhoneFieldProps {
  suspenseFallback?: ReactNode;
}

export const SuspendedFormikPhoneField = forwardRef<
  HTMLDivElement,
  SuspendedFormikPhoneFieldProps
>(
  (
    {
      label,
      fullWidth,
      helperText,
      suspenseFallback = (
        <TextField
          disabled={true}
          label={label}
          fullWidth={fullWidth}
          helperText={helperText}
          placeholder="Loading…"
        />
      ),
      ...props
    },
    ref,
  ) => (
    <Suspense fallback={suspenseFallback}>
      <FormikPhoneField
        {...props}
        ref={ref}
        label={label}
        fullWidth={fullWidth}
        helperText={helperText}
      />
    </Suspense>
  ),
);
