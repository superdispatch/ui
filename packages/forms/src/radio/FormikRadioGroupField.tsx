import { RadioGroupField, RadioGroupFieldProps } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React, { forwardRef, ForwardRefExoticComponent } from 'react';

export interface FormikRadioGroupFieldProps
  extends Omit<RadioGroupFieldProps, 'error' | 'value'> {
  name: string;
  validate?: FieldValidator;
}

export const FormikRadioGroupField: ForwardRefExoticComponent<FormikRadioGroupFieldProps> = forwardRef(
  (
    {
      name,
      validate,

      onBlur,
      onChange,
      disabled,
      helperText,
      ...props
    },
    ref,
  ) => {
    const { isSubmitting } = useFormikContext();
    const [field, { error, touched }] = useField({
      name,
      validate,
    });
    const errorText = touched && error;

    return (
      <RadioGroupField
        {...props}
        {...field}
        ref={ref}
        onBlur={(event) => {
          onBlur?.(event);
          field.onBlur(event);
        }}
        onChange={(event, value) => {
          onChange?.(event, value);
          field.onChange(event);
        }}
        error={!!errorText}
        helperText={errorText || helperText}
        disabled={disabled || isSubmitting}
      />
    );
  },
);
