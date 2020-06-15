import { CheckboxField, CheckboxFieldProps, useUID } from '@superdispatch/ui';
import { FieldValidator, useField, useFormikContext } from 'formik';
import React from 'react';

export interface FormikCheckboxFieldProps extends CheckboxFieldProps {
  name: string;
  validate?: FieldValidator;
  format?: (
    value: unknown,
    checked: boolean | undefined,
  ) => boolean | undefined;
  parse?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => unknown;
}

export function FormikCheckboxField({
  id,
  name,
  parse,
  validate,
  format = (x) => !!x,

  onBlur,
  onChange,
  disabled,
  helperText,
  ...props
}: FormikCheckboxFieldProps) {
  const uid = useUID();
  const { isSubmitting } = useFormikContext();
  const [field, { error, touched }, { setValue }] = useField<unknown>({
    name,
    validate,
    type: 'checkbox',
  });
  const errorText = touched && error;

  return (
    <CheckboxField
      {...props}
      {...field}
      id={id || uid}
      error={!!errorText}
      checked={format(field.value, field.checked)}
      disabled={disabled || isSubmitting}
      helperText={errorText || helperText}
      onBlur={(event) => {
        onBlur?.(event);
        field.onBlur(event);
      }}
      onChange={(event, checked) => {
        onChange?.(event, checked);
        if (parse) {
          setValue(parse(event, checked));
        } else {
          field.onChange(event);
        }
      }}
    />
  );
}
